import Anthropic from "@anthropic-ai/sdk";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const client = new Anthropic();

// Convertir imagen a base64
function imageToBase64(filePath) {
  const imageBuffer = fs.readFileSync(filePath);
  return imageBuffer.toString("base64");
}

// Detectar tipo MIME de imagen
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".webp": "image/webp",
  };
  return mimeTypes[ext] || "image/jpeg";
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    // Obtener imágenes del FormData
    const { body, clothing } = req.body;

    if (!body || !clothing) {
      res.status(400).json({ error: "Faltan imágenes" });
      return;
    }

    // Convertir base64 a archivos temporales
    const bodyBuffer = Buffer.from(
      body.split(",")[1] || body,
      "base64"
    );
    const clothingBuffer = Buffer.from(
      clothing.split(",")[1] || clothing,
      "base64"
    );

    const tempDir = "/tmp";
    const bodyPath = path.join(tempDir, `body-${Date.now()}.jpg`);
    const clothingPath = path.join(tempDir, `clothing-${Date.now()}.jpg`);

    fs.writeFileSync(bodyPath, bodyBuffer);
    fs.writeFileSync(clothingPath, clothingBuffer);

    // Usar Claude Vision para analizar las imágenes
    const bodyBase64 = imageToBase64(bodyPath);
    const clothingBase64 = imageToBase64(clothingPath);

    const message = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: "image/jpeg",
                data: bodyBase64,
              },
            },
            {
              type: "image",
              source: {
                type: "base64",
                media_type: "image/jpeg",
                data: clothingBase64,
              },
            },
            {
              type: "text",
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

    const prompt = message.content[0].type === "text" ? message.content[0].text : "";

    // Generar imagen con Replicate (alternativa: usar otra API)
    // Para este MVP, usaremos un placeholder que simula la generación
    // En producción, integrarías una API como Replicate, Stability AI, etc.

    let generatedImage;

    // Opción 1: Usar Replicate (si tienes token)
    if (process.env.REPLICATE_API_TOKEN) {
      generatedImage = await generateWithReplicate(prompt);
    } else {
      // Opción 2: Placeholder - en producción usa una API real
      generatedImage = await generateWithFallback(bodyBase64, clothingBase64, prompt);
    }

    // Limpiar archivos temporales
    fs.unlinkSync(bodyPath);
    fs.unlinkSync(clothingPath);

    res.status(200).json({
      image: generatedImage,
      prompt: prompt,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: error.message || "Error al procesar las imágenes",
    });
  }
}

// Función para generar con Replicate
async function generateWithReplicate(prompt) {
  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      version: "a4a8bafd6dd3c8c6c8f3e6c8b3c0c8a3", // FLUX model
      input: {
        prompt: prompt,
        num_outputs: 1,
        guidance_scale: 7.5,
      },
    }),
  });

  const prediction = await response.json();

  // Poll for result
  let result = prediction;
  while (result.status !== "succeeded" && result.status !== "failed") {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const checkResponse = await fetch(result.urls.get, {
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      },
    });
    result = await checkResponse.json();
  }

  if (result.status === "failed") {
    throw new Error("Image generation failed");
  }

  return result.output[0];
}

// Función fallback - simula resultado
async function generateWithFallback(bodyBase64, clothingBase64, prompt) {
  // Para desarrollo sin API externa, retorna un SVG placeholder
  // En producción, integra una API real como Replicate, Stability AI, etc.

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

  // Convertir SVG a base64 para retornar como data URL
  const buffer = Buffer.from(svgImage);
  const base64 = buffer.toString("base64");
  return `data:image/svg+xml;base64,${base64}`;
}
