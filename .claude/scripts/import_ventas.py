#!/usr/bin/env python3
"""Lee un export de oportunidades de Salesforce (.csv). Produce un registro por
cada oportunidad (cualquier fase, no solo cerrada-ganada) con su fase real y un
grupo (ganada/abierta/perdida) para filtrar dinámicamente, y además agregados
diarios y trimestrales solo de las cerradas-ganadas (para el Libro de Ventas).
Solo librería estándar. Uso: python3 import_ventas.py <archivo.csv> > salida.json
"""
import sys, os, re, csv, json, unicodedata
from datetime import date

def norm_header(h):
    h = unicodedata.normalize('NFKD', h or '').encode('ascii', 'ignore').decode('ascii')
    return h.lower().strip()

def find_col(headers_norm, *needles, exclude=()):
    for h, orig in headers_norm:
        if any(ex in h for ex in exclude):
            continue
        if any(n in h for n in needles):
            return orig
    return None

def read_csv_rows(path):
    with open(path, 'rb') as fb:
        raw = fb.read()
    text = raw.decode('utf-8-sig', errors='replace')
    sample = text[:4096]
    try:
        dialect = csv.Sniffer().sniff(sample, delimiters=',;\t')
    except csv.Error:
        dialect = csv.excel
    reader = csv.DictReader(text.splitlines(), dialect=dialect)
    return [row for row in reader if any((v or '').strip() for v in row.values())]

def map_cols(headers_norm):
    return {
        'amount': find_col(headers_norm, 'amount', 'importe', 'monto'),
        'close_date': find_col(headers_norm, 'close date', 'fecha de cierre', 'fecha cierre'),
        'stage': find_col(headers_norm, 'stage', 'fase', 'etapa'),
        'name': find_col(headers_norm, 'opportunity name', 'nombre de la oportunidad', 'nombre'),
        'account': find_col(headers_norm, 'account name', 'account', 'cuenta'),
        'owner': find_col(headers_norm, 'owner', 'propietario'),
        'country': find_col(headers_norm, 'country', 'pais', 'país'),
        'id': find_col(headers_norm, 'opportunity id', 'id de la oportunidad', 'id'),
    }

def sanitize_id(s):
    s = re.sub(r'[^A-Za-z0-9_-]+', '-', s or '').strip('-')
    return (s[:150] if s else 'sin-id')

def parse_amount(raw):
    s = (raw or '').strip()
    if not s:
        return None
    s = re.sub(r'[^\d,.\-]', '', s)
    if not s:
        return None
    if ',' in s and '.' in s:
        if s.rfind(',') > s.rfind('.'):
            s = s.replace('.', '').replace(',', '.')
        else:
            s = s.replace(',', '')
    elif ',' in s:
        if re.search(r',\d{1,2}$', s):
            s = s.replace(',', '.')
        else:
            s = s.replace(',', '')
    try:
        return float(s)
    except ValueError:
        return None

DATE_ISO = re.compile(r'^(\d{4})-(\d{2})-(\d{2})$')
DATE_SLASH = re.compile(r'^(\d{1,2})/(\d{1,2})/(\d{4})$')

def parse_date(raw):
    s = (raw or '').strip()
    m = DATE_ISO.match(s)
    if m:
        return s
    m = DATE_SLASH.match(s)
    if m:
        a, b, y = int(m.group(1)), int(m.group(2)), m.group(3)
        if a > 12:
            day, month = a, b
        elif b > 12:
            day, month = b, a
        else:
            day, month = a, b  # ambiguo: asumimos DD/MM/YYYY (convención EU/ES)
        return f'{y}-{month:02d}-{day:02d}'
    return None

def quarter_of(d_iso):
    y, m, _ = d_iso.split('-')
    q = (int(m) - 1) // 3 + 1
    return f'{y}-Q{q}'

def stage_group(stage):
    s = unicodedata.normalize('NFKD', stage or '').encode('ascii', 'ignore').decode('ascii').lower()
    if 'won' in s or 'ganad' in s:
        return 'ganada'
    if 'lost' in s or 'perdid' in s:
        return 'perdida'
    return 'abierta'

def main():
    path = sys.argv[1]
    rows = read_csv_rows(path)
    if not rows:
        print(json.dumps({'error': 'archivo vacio o sin filas de datos'}))
        return
    headers_norm = [(norm_header(h), h) for h in rows[0].keys()]
    cols = map_cols(headers_norm)
    missing = [k for k in ('amount', 'close_date', 'stage') if not cols.get(k)]
    if missing:
        print(json.dumps({'error': f'columnas no reconocidas: {missing}', 'headers': list(rows[0].keys())}))
        return

    deals = []
    skipped_bad_row = 0
    for row in rows:
        def get(key):
            c = cols.get(key)
            return row.get(c, '') if c else ''
        stage = get('stage').strip()
        d = parse_date(get('close_date'))
        amount = parse_amount(get('amount'))
        if not d or amount is None:
            skipped_bad_row += 1
            continue
        name = get('name').strip() or None
        account = get('account').strip() or None
        owner = get('owner').strip() or None
        sf_id = get('id').strip() or None
        doc_id = 'sf-' + sanitize_id(sf_id or f'{account}-{name}-{d}-{amount}')
        deals.append({
            'doc_id': doc_id,
            'id': sf_id,
            'name': name,
            'opportunity': name,
            'account': account,
            'owner': owner,
            'country': get('country').strip() or None,
            'date': d,
            'quarter': quarter_of(d),
            'amount': round(amount, 2),
            'stage': stage or None,
            'stageGroup': stage_group(stage),
        })

    won = [d for d in deals if d['stageGroup'] == 'ganada']
    daily = {}
    for deal in won:
        rec = daily.setdefault(deal['date'], {'date': deal['date'], 'amount': 0.0, 'dealCount': 0})
        rec['amount'] += deal['amount']
        rec['dealCount'] += 1
    daily_sorted = sorted(daily.values(), key=lambda r: r['date'])
    running = 0.0
    running_by_quarter = {}
    for rec in daily_sorted:
        running += rec['amount']
        rec['runningTotalAllTime'] = round(running, 2)
        q = quarter_of(rec['date'])
        running_by_quarter[q] = running_by_quarter.get(q, 0.0) + rec['amount']
        rec['quarter'] = q
        rec['runningTotalQTD'] = round(running_by_quarter[q], 2)
        rec['amount'] = round(rec['amount'], 2)

    quarterly = {}
    for deal in won:
        rec = quarterly.setdefault(deal['quarter'], {'quarter': deal['quarter'], 'amount': 0.0, 'dealCount': 0})
        rec['amount'] += deal['amount']
        rec['dealCount'] += 1
    for rec in quarterly.values():
        rec['amount'] = round(rec['amount'], 2)
    quarterly_sorted = sorted(quarterly.values(), key=lambda r: r['quarter'])

    by_group = {}
    for d in deals:
        by_group[d['stageGroup']] = by_group.get(d['stageGroup'], 0) + 1

    print(json.dumps({
        'deals': len(deals),
        'won': len(won),
        'by_stage_group': by_group,
        'skipped_bad_row': skipped_bad_row,
        'total_rows': len(rows),
        'daily': daily_sorted,
        'quarterly': quarterly_sorted,
        'deal_records': deals,
    }, ensure_ascii=False))

if __name__ == '__main__':
    main()
