#!/usr/bin/env python3
"""Lee un export de LinkedIn (.xlsx) o Meta Business Suite (.csv) y produce
documentos normalizados para la colección "metrics" de la Command Station.
Solo librería estándar (zipfile + xml + csv): no requiere instalar nada.
Uso: python3 import_metrics.py <archivo.xlsx|archivo.csv> > salida.json
"""
import sys, os, re, csv, json, time, zipfile, unicodedata
from xml.etree import ElementTree as ET

M = '{http://schemas.openxmlformats.org/spreadsheetml/2006/main}'
R_NS = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'


def col_letters(ref):
    return re.match(r'[A-Z]+', ref).group()


def col_num(letters):
    n = 0
    for ch in letters:
        n = n * 26 + (ord(ch) - ord('A') + 1)
    return n


def letters_for(n):
    s = ''
    while n > 0:
        n, rem = divmod(n - 1, 26)
        s = chr(65 + rem) + s
    return s


def read_xlsx_first_sheet(path):
    with zipfile.ZipFile(path) as z:
        shared = []
        if 'xl/sharedStrings.xml' in z.namelist():
            root = ET.fromstring(z.read('xl/sharedStrings.xml'))
            for si in root.findall(f'{M}si'):
                shared.append(''.join(t.text or '' for t in si.iter(f'{M}t')))
        wb = ET.fromstring(z.read('xl/workbook.xml'))
        rels_root = ET.fromstring(z.read('xl/_rels/workbook.xml.rels'))
        sheet_el = wb.find(f'{M}sheets/{M}sheet')
        rid = sheet_el.get(f'{{{R_NS}}}id')
        target = next(rel.get('Target') for rel in rels_root if rel.get('Id') == rid)
        sheet_path = target if target.startswith('xl/') else 'xl/' + target
        sroot = ET.fromstring(z.read(sheet_path))
        rows = []
        for row_el in sroot.find(f'{M}sheetData'):
            cells = {}
            for c in row_el.findall(f'{M}c'):
                col = col_letters(c.get('r'))
                t = c.get('t')
                v_el = c.find(f'{M}v')
                is_el = c.find(f'{M}is')
                if t == 's' and v_el is not None:
                    val = shared[int(v_el.text)]
                elif t == 'inlineStr' and is_el is not None:
                    val = ''.join(x.text or '' for x in is_el.iter(f'{M}t'))
                elif v_el is not None:
                    val = v_el.text
                else:
                    val = ''
                cells[col] = val
            rows.append(cells)
        if not rows:
            return []
        max_col = max((col_num(c) for r in rows for c in r.keys()), default=0)
        header_row = rows[0]
        headers = [(letters_for(i), (header_row.get(letters_for(i)) or '').strip()) for i in range(1, max_col + 1)]
        out = []
        for r in rows[1:]:
            if not any((r.get(letters) or '').strip() for letters, _ in headers):
                continue
            out.append({name: r.get(letters, '') for letters, name in headers if name})
        return out


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


def map_row_linkedin(headers_norm):
    return {
        'permalink': find_col(headers_norm, 'post url', 'url', 'enlace', 'link'),
        'date': find_col(headers_norm, 'created date', 'fecha de creacion', 'fecha de publicacion', 'date', 'fecha', exclude=('edit', 'edicion')),
        'time': find_col(headers_norm, 'created time', 'hora de creacion', 'time', 'hora', exclude=('edit', 'edicion')),
        'type': find_col(headers_norm, 'post type', 'content type', 'tipo de publicacion', 'tipo de contenido', 'tipo'),
        'caption': find_col(headers_norm, 'post title', 'title', 'text', 'texto', 'titulo', 'commentary', 'contenido'),
        'reach': find_col(headers_norm, 'impression', 'impresion'),
        'clicks': find_col(headers_norm, 'click', 'clic'),
        'reactions': find_col(headers_norm, 'reaction', 'like', 'reaccion', 'me gusta'),
        'comments': find_col(headers_norm, 'comment', 'comentario'),
        'shares': find_col(headers_norm, 'share', 'repost', 'compart', 'republic'),
        'id': find_col(headers_norm, 'post id', 'id de la publicacion'),
    }


def map_row_facebook(headers_norm):
    return {
        'permalink': find_col(headers_norm, 'permalink', 'post url', 'url', 'enlace', 'link'),
        'date': find_col(headers_norm, 'publish time', 'publish date', 'fecha de publicacion', 'created', 'date', 'fecha'),
        'time': find_col(headers_norm, 'time', 'hora'),
        'type': find_col(headers_norm, 'post type', 'tipo de publicacion', 'tipo'),
        'caption': find_col(headers_norm, 'description', 'caption', 'title', 'descripcion', 'titulo', 'texto'),
        'reach': find_col(headers_norm, 'reach', 'alcance'),
        'clicks': find_col(headers_norm, 'click', 'clic'),
        'reactions': find_col(headers_norm, 'reaction', 'like', 'reaccion', 'me gusta'),
        'comments': find_col(headers_norm, 'comment', 'comentario'),
        'shares': find_col(headers_norm, 'share', 'compartid'),
        'id': find_col(headers_norm, 'post id', 'id de la publicacion', 'id'),
    }


def to_number(v):
    if v is None:
        return 0
    s = str(v).strip().replace(',', '')
    if s == '':
        return 0
    try:
        return float(s) if '.' in s else int(s)
    except ValueError:
        return 0


def excel_serial_to_date(n):
    import datetime
    base = datetime.date(1899, 12, 30)
    return (base + datetime.timedelta(days=int(n))).isoformat()


DATE_RE = re.compile(r'(\d{4})-(\d{2})-(\d{2})')
DATE_RE_SLASH = re.compile(r'(\d{1,2})/(\d{1,2})/(\d{4})')


def parse_date_time(raw):
    raw = (raw or '').strip()
    if not raw:
        return None, None
    if re.fullmatch(r'\d{4,6}(\.\d+)?', raw):
        serial = float(raw)
        date = excel_serial_to_date(int(serial))
        frac = serial - int(serial)
        if frac > 0:
            total_min = round(frac * 24 * 60)
            return date, f'{total_min // 60:02d}:{total_min % 60:02d}'
        return date, None
    m = DATE_RE.search(raw)
    if m:
        date = f'{m.group(1)}-{m.group(2)}-{m.group(3)}'
    else:
        m2 = DATE_RE_SLASH.search(raw)
        if m2:
            a, b, y = int(m2.group(1)), int(m2.group(2)), m2.group(3)
            # dd/mm vs mm/dd: si uno de los dos números no puede ser mes (>12), ese es el día.
            # Si ambos son <=12 es ambiguo: asumimos DD/MM/YYYY (convención EU/ES) por defecto
            # — si el export resulta ser de origen US, avisa en el informe para revisar a mano.
            if a > 12:
                day, month = a, b
            elif b > 12:
                day, month = b, a
            else:
                day, month = a, b
            date = f'{y}-{month:02d}-{day:02d}'
        else:
            date = None
    tm = re.search(r'(\d{1,2}):(\d{2})', raw)
    time_s = f'{int(tm.group(1)):02d}:{tm.group(2)}' if tm else None
    return date, time_s


def guess_media_id(permalink, explicit_id):
    if explicit_id and str(explicit_id).strip():
        return str(explicit_id).strip()
    if not permalink:
        return None
    nums = re.findall(r'\d{6,}', permalink)
    return nums[-1] if nums else None


def sanitize_id(s):
    s = re.sub(r'https?://', '', s or '')
    s = re.sub(r'[^A-Za-z0-9_-]+', '-', s).strip('-')
    return s[:150] if s else 'sin-id'


PRODUCT_KEYWORDS = [
    ('neostampa', 'neostampa'),
    ('neotextil', 'neotextil'),
    ('neocatalog', 'neocatalog'),
    ('neomatch', 'neomatch'),
]


def detect_product(caption):
    low = (caption or '').lower()
    for needle, product in PRODUCT_KEYWORDS:
        if needle in low:
            return product
    return 'inedit'


ES_HINTS = ['ñ', '¿', '¡', ' el ', ' la ', ' de ', ' para ', ' con ', ' qué ', ' cómo ', ' más ']


def detect_lang(caption):
    low = f' {(caption or "").lower()} '
    es_score = sum(1 for h in ES_HINTS if h in low)
    return 'es' if es_score >= 2 else 'en'


def build_docs(rows, mapping, platform, fetched_at):
    docs = []
    skipped = 0
    for row in rows:
        def get(key):
            col = mapping.get(key)
            return row.get(col, '') if col else ''

        permalink = get('permalink').strip() or None
        date_raw = get('date')
        date, time_from_date = parse_date_time(date_raw)
        time_col_is_separate = mapping.get('time') and mapping.get('time') != mapping.get('date')
        time_raw = get('time') if time_col_is_separate else ''
        time_val = (time_raw.strip() or None) if time_raw else time_from_date

        reach = to_number(get('reach'))
        reactions = to_number(get('reactions'))
        comments = to_number(get('comments'))
        shares = to_number(get('shares'))
        clicks = to_number(get('clicks'))

        if not date and reach == 0 and reactions == 0 and comments == 0 and shares == 0 and clicks == 0:
            skipped += 1
            continue
        if not date:
            skipped += 1
            continue

        caption = get('caption').strip()
        engagement = reactions + comments + shares + clicks
        er = (engagement / reach) if reach else 0
        media_id = guess_media_id(permalink, get('id'))
        doc_id_src = media_id or permalink or f'{platform}-{len(docs)}'
        doc_id = f'{"li" if platform == "linkedin" else "fb"}-{sanitize_id(doc_id_src)}'

        docs.append({
            'doc_id': doc_id,
            'data': {
                'platform': platform,
                'media_id': media_id or doc_id_src,
                'date': date,
                'time': time_val,
                'type': get('type').strip() or None,
                'caption': caption,
                'permalink': permalink,
                'reach': reach,
                'engagement': engagement,
                'clicks': clicks,
                'shares': shares,
                'er': er,
                'product': detect_product(caption),
                'lang': detect_lang(caption),
                'fetchedAt': fetched_at,
            }
        })
    return docs, skipped


def main():
    path = sys.argv[1]
    ext = os.path.splitext(path)[1].lower()
    fetched_at = int(time.time() * 1000)
    if ext in ('.xlsx', '.xls'):
        platform = 'linkedin'
        rows = read_xlsx_first_sheet(path)
    elif ext == '.csv':
        platform = 'facebook'
        rows = read_csv_rows(path)
    else:
        print(json.dumps({'error': f'extension no reconocida: {ext}'}))
        return
    if not rows:
        print(json.dumps({'error': 'archivo vacio o sin filas de datos', 'platform': platform}))
        return
    headers_norm = [(norm_header(h), h) for h in rows[0].keys()]
    mapping = map_row_linkedin(headers_norm) if platform == 'linkedin' else map_row_facebook(headers_norm)
    required_missing = [k for k in ('date', 'reach') if not mapping.get(k)]
    if required_missing:
        print(json.dumps({'error': f'columnas no reconocidas: {required_missing}', 'platform': platform, 'headers': list(rows[0].keys())}))
        return
    docs, skipped = build_docs(rows, mapping, platform, fetched_at)
    print(json.dumps({'platform': platform, 'docs': docs, 'skipped_rows': skipped, 'total_rows': len(rows)}, ensure_ascii=False))


if __name__ == '__main__':
    main()
