# Virtual Try-On App

Aplicación web que permite visualizar cómo se vería una prenda de ropa en ti usando inteligencia artificial.

## ✨ Características

- ✅ Subir foto de cuerpo entero
- ✅ Cargar múltiples prendas para probar
- ✅ Análisis con Claude Vision API
- ✅ Generación de imágenes con IA
- ✅ Interfaz moderna y responsiva
- ✅ Preview en tiempo real

## 🚀 Arquitectura

```
Frontend (React + Vite)
    ↓
Vercel Function (api/tryon.js)
    ↓
Claude Vision API (análisis de imágenes)
    ↓
Generador de Imágenes (Replicate o fallback)
```

## 📋 Requisitos Previos

- Node.js 18+
- npm o yarn
- API Key de Anthropic (Claude)
- (Opcional) Token de Replicate para generación de imágenes

## 🛠️ Instalación Local

### 1. Clonar y configurar

```bash
git clone <repo-url>
cd virtual-tryon-app
npm install
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env.local
```

Edita `.env.local` y añade:

```
VITE_ANTHROPIC_API_KEY=tu_clave_aqui
REPLICATE_API_TOKEN=tu_token_aqui (opcional)
```

Obtén tu API Key en: https://console.anthropic.com/

### 3. Ejecutar en desarrollo

```bash
npm run dev
```

La app estará disponible en `http://localhost:5173`

## 🌐 Deployment en Vercel

### 1. Preparar para Vercel

```bash
npm run build
```

### 2. Conectar con Vercel

```bash
npm install -g vercel
vercel
```

### 3. Configurar variables de entorno en Vercel

En el dashboard de Vercel, añade:

```
ANTHROPIC_API_KEY=tu_clave
REPLICATE_API_TOKEN=tu_token (opcional)
```

### 4. Deploy

```bash
vercel --prod
```

## 📂 Estructura del Proyecto

```
.
├── app.jsx                 # Componente principal React
├── api/
│   └── tryon.js           # Endpoint serverless (Vercel)
├── vite.config.js         # Configuración Vite
├── tailwind.config.js     # Configuración Tailwind CSS
├── package.json           # Dependencias
├── .env.example           # Variables de entorno
└── README.md              # Este archivo
```

## 🔧 Cómo Funciona

### 1. Usuario Carga Imágenes

- Foto de cuerpo entero (PNG/JPG)
- Imágenes de prendas a probar (múltiples)

### 2. Análisis con Claude Vision

El backend analiza:
- La postura y forma corporal
- El tipo, color y estilo de la prenda
- Cómo se vería la prenda en la persona

### 3. Generación de Imagen

Se genera un prompt descriptivo y se usa para crear la imagen del try-on:

**Opción A: Replicate API** (Recomendado)
- Usa modelos FLUX/Stable Diffusion
- Mejor calidad
- Requiere token de Replicate

**Opción B: Fallback**
- SVG placeholder
- Funciona sin API externa
- Ideal para desarrollo

## 💰 Costos

- **Claude Vision API**: ~$0.003 por imagen
- **Replicate (FLUX)**: ~$0.04 por imagen
- **Vercel**: Gratis (hasta cierto límite)

## 🔒 Seguridad

- Las imágenes se procesan en servidor
- No se almacenan imágenes en BD
- API Keys en variables de entorno
- CORS configurado

## 🚧 Mejoras Futuras

- [ ] Soporte para más tipos de prendas (accesorios, zapatos)
- [ ] Guardado de looks favoritos
- [ ] Historial de pruebas
- [ ] Compartir resultados en redes sociales
- [ ] Búsqueda de prendas similares
- [ ] Integración con catálogos de tiendas
- [ ] Modo oscuro
- [ ] Soporte para múltiples idiomas

## 🐛 Troubleshooting

### Error: "ANTHROPIC_API_KEY not found"

```bash
# Verifica .env.local
echo $VITE_ANTHROPIC_API_KEY

# Si está vacío, añadelo nuevamente
```

### Error al generar imágenes

Si Replicate falla:
1. Verifica el token
2. Comprueba el límite de créditos
3. Usa el fallback (SVG)

### Las imágenes no cargan

1. Verifica CORS en el backend
2. Comprueba el tamaño de las imágenes (<10MB)
3. Asegúrate que sean formatos válidos (JPG, PNG)

## 📞 Soporte

Para issues o preguntas, contacta a: adriavalles@inedit.com

## 📄 Licencia

MIT License

---

Hecho con ❤️ usando React, Claude AI y Vercel
