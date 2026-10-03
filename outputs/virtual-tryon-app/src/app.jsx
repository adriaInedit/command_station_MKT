import React, { useState } from 'react';
import { Upload, Loader2, AlertCircle } from 'lucide-react';

export default function VirtualTryOn() {
  const [bodyImage, setBodyImage] = useState(null);
  const [bodyPreview, setBodyPreview] = useState(null);
  const [clothingImages, setClothingImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);

  const handleBodyImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBodyImage(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setBodyPreview(event.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClothingUpload = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setClothingImages((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            file,
            preview: event.target?.result,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeClothing = (id) => {
    setClothingImages((prev) => prev.filter((item) => item.id !== id));
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleTryOn = async () => {
    if (!bodyImage || clothingImages.length === 0) {
      setError('Por favor sube tu foto de cuerpo entero y al menos una prenda');
      return;
    }

    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const bodyBase64 = await fileToBase64(bodyImage);

      for (const clothing of clothingImages) {
        const clothingBase64 = await fileToBase64(clothing.file);

        console.log('Generando imagen con Gemini...');

        const response = await fetch('/api/tryon', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bodyImage: bodyBase64,
            clothingImage: clothingBase64,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error?.message || `Error: ${response.status}`
          );
        }

        const data = await response.json();

        if (!data.image) {
          throw new Error('No se recibió imagen del servidor');
        }

        console.log('Imagen generada correctamente');

        setResults((prev) => [
          ...prev,
          {
            clothingId: clothing.id,
            result: data.image,
            description: data.description || '',
          },
        ]);
      }
    } catch (err) {
      console.error('Error completo:', err);
      setError(err.message || 'Error al procesar las imágenes');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Virtual Try-On</h1>
          <p className="text-gray-600">
            Sube tu foto y prueba prendas de ropa con IA
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="text-red-600" size={20} />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Body Image Upload */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Tu Foto</h2>

              {bodyPreview ? (
                <div className="space-y-4">
                  <img
                    src={bodyPreview}
                    alt="Body"
                    className="w-full h-80 object-cover rounded-lg"
                  />
                  <label className="block">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBodyImageUpload}
                      className="hidden"
                    />
                    <span className="block w-full py-2 px-4 bg-blue-500 text-white rounded-lg text-center cursor-pointer hover:bg-blue-600 transition">
                      Cambiar foto
                    </span>
                  </label>
                </div>
              ) : (
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBodyImageUpload}
                    className="hidden"
                  />
                  <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition">
                    <Upload className="mx-auto text-blue-500 mb-2" size={32} />
                    <p className="text-gray-700 font-medium">Foto de cuerpo entero</p>
                    <p className="text-gray-500 text-sm">Haz clic para subir</p>
                  </div>
                </label>
              )}
            </div>
          </div>

          {/* Clothing Selection */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 h-full">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Prendas a Probar</h2>

              {/* Upload Area */}
              <label className="block mb-6">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleClothingUpload}
                  className="hidden"
                />
                <div className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center cursor-pointer hover:border-green-500 transition">
                  <Upload className="mx-auto text-green-500 mb-2" size={32} />
                  <p className="text-gray-700 font-medium">Carga prendas</p>
                  <p className="text-gray-500 text-sm">Puedes seleccionar varias imágenes</p>
                </div>
              </label>

              {/* Clothing Grid */}
              {clothingImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {clothingImages.map((item) => (
                    <div key={item.id} className="relative group">
                      <img
                        src={item.preview}
                        alt="Clothing"
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeClothing(item.id)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Try On Button */}
              <button
                onClick={handleTryOn}
                disabled={loading || !bodyImage || clothingImages.length === 0}
                className="w-full mt-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Procesando...
                  </>
                ) : (
                  'Probar Prendas'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Resultados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((item) => (
                <div key={item.clothingId} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img
                    src={item.result}
                    alt="Try on result"
                    className="w-full h-auto object-contain bg-gray-100"
                  />
                  {item.description && (
                    <div className="p-4 bg-gray-50">
                      <p className="text-sm text-gray-700">{item.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
