import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Plugin que maneja /api/tryon dentro de Vite (un solo proceso, sin CORS).
// Usa Gemini "Nano Banana" (gemini-2.5-flash-image) para GENERAR una imagen
// de la persona vistiendo la prenda.
function geminiApiPlugin(env) {
  return {
    name: 'gemini-api',
    configureServer(server) {
      server.middlewares.use('/api/tryon', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end(JSON.stringify({ error: { message: 'Method not allowed' } }))
          return
        }

        let body = ''
        req.on('data', (chunk) => (body += chunk))
        req.on('end', async () => {
          try {
            const { bodyImage, clothingImage } = JSON.parse(body)
            const apiKey = env.VITE_GEMINI_API_KEY

            if (!apiKey) {
              res.statusCode = 500
              res.end(JSON.stringify({ error: { message: 'VITE_GEMINI_API_KEY no configurada en .env.local' } }))
              return
            }

            const model = 'gemini-2.5-flash-image'
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`

            const geminiRes = await fetch(url, {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({
                contents: [
                  {
                    parts: [
                      {
                        text:
                          'Eres un asistente de moda para probador virtual. La PRIMERA imagen es una persona de cuerpo entero. La SEGUNDA imagen es una prenda de ropa. Genera una imagen fotorrealista de esa MISMA persona (conservando su cara, tono de piel, cuerpo y pose) vistiendo la prenda de la segunda imagen. Mantén el fondo natural y una iluminación realista.',
                      },
                      { inline_data: { mime_type: 'image/jpeg', data: bodyImage } },
                      { inline_data: { mime_type: 'image/jpeg', data: clothingImage } },
                    ],
                  },
                ],
              }),
            })

            const text = await geminiRes.text()
            if (!geminiRes.ok) {
              res.statusCode = geminiRes.status
              res.setHeader('content-type', 'application/json')
              try {
                JSON.parse(text)
                res.end(text)
              } catch {
                res.end(JSON.stringify({ error: { message: text || `Error ${geminiRes.status}` } }))
              }
              return
            }

            const data = JSON.parse(text)
            const parts = data?.candidates?.[0]?.content?.parts || []
            const imagePart = parts.find((p) => p.inline_data || p.inlineData)
            const textPart = parts.find((p) => p.text)

            if (!imagePart) {
              res.statusCode = 502
              res.end(JSON.stringify({ error: { message: 'Gemini no devolvió imagen. ' + (textPart?.text || '') } }))
              return
            }

            const inline = imagePart.inline_data || imagePart.inlineData
            res.statusCode = 200
            res.setHeader('content-type', 'application/json')
            res.end(
              JSON.stringify({
                image: `data:${inline.mime_type || inline.mimeType || 'image/png'};base64,${inline.data}`,
                description: textPart?.text || '',
              })
            )
          } catch (err) {
            res.statusCode = 500
            res.end(JSON.stringify({ error: { message: err.message } }))
          }
        })
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), geminiApiPlugin(env)],
    server: {
      port: 5199,
      strictPort: true,
    },
  }
})
