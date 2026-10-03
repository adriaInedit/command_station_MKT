import express from 'express';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const upload = multer({ dest: '/tmp' });
const client = new Anthropic({
  apiKey: process.env.VITE_ANTHROPIC_API_KEY,
});

app.use(cors());
app.use(express.json());

app.post('/api/tryon', upload.fields([{ name: 'body' }, { name: 'clothing' }]), async (req, res) => {
  try {
    const bodyFile = req.files?.body?.[0];
    const clothingFile = req.files?.clothing?.[0];

    if (!bodyFile || !clothingFile) {
      return res.status(400).json({ error: 'Faltan imágenes' });
    }

    // Leer imágenes como base64
    const bodyBase64 = fs.readFileSync(bodyFile.path).toString('base64');
    const clothingBase64 = fs.readFileSync(clothingFile.path).toString('base64');

    console.log('Analizando imágenes con Claude Vision...');

    // Usar Claude Vision
    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/jpeg',
                data: bodyBase64,
              },
            },
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/jpeg',
                data: clothingBase64,
              },
            },
            {
              type: 'text',
              text: `Analiza estas dos imágenes:
1. Primera imagen: Persona de cuerpo entero
2. Segunda imagen: Prenda de ropa

Genera un prompt detallado en inglés para crear una imagen de la persona usando/vistiendo la prenda. El prompt debe incluir:
- La postura y forma corporal de la persona
- El tipo, color, estilo y características de la prenda
- Cómo se vería la prenda en la persona
- Detalles de iluminación y fondo

Formato: Solo el prompt, sin explicaciones adicionales.`,
            },
          ],
        },
      ],
    });

    const prompt = message.content[0].type === 'text' ? message.content[0].text : '';

    // Generar SVG de demostración
    const svgImage = `
      <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#e0e7ff;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#c7d2fe;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="512" height="512" fill="url(#grad)"/>
        <circle cx="256" cy="180" r="40" fill="#fdbcb4"/>
        <ellipse cx="256" cy="310" rx="60" ry="80" fill="#3b82f6"/>
        <rect x="200" y="280" width="112" height="100" fill="#10b981" rx="5"/>
        <text x="256" y="480" font-size="14" text-anchor="middle" fill="#666">
          Virtual Try-On Result
        </text>
        <text x="256" y="500" font-size="12" text-anchor="middle" fill="#999">
          Generado con IA
        </text>
      </svg>
    `;

    const buffer = Buffer.from(svgImage);
    const base64 = buffer.toString('base64');
    const generatedImage = `data:image/svg+xml;base64,${base64}`;

    // Limpiar archivos temporales
    fs.unlinkSync(bodyFile.path);
    fs.unlinkSync(clothingFile.path);

    res.json({
      image: generatedImage,
      prompt: prompt,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: error.message || 'Error al procesar las imágenes',
    });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`API server corriendo en http://localhost:${PORT}`);
});
