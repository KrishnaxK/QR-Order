import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Share2 } from 'lucide-react';
import type { Product } from '../types/product';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Classic Burger',
    description: 'Juicy beef patty with fresh vegetables',
    price: 8.99,
    category: 'Burgers',
    inStock: true,
    stockCount: 50,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: '2',
    name: 'Street Tacos',
    description: 'Authentic Mexican street tacos',
    price: 6.99,
    category: 'Mexican',
    inStock: true,
    stockCount: 30,
    image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&q=80&w=300',
  },
];

export function QRCodesPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const shopId = '123'; // This would come from your auth context

  const generateQRValue = (type: 'shop' | 'product', id: string) => {
    const baseUrl = window.location.origin;
    return type === 'shop'
      ? `${baseUrl}/shop/${id}`
      : `${baseUrl}/product/${id}`;
  };

  const downloadQR = (qrValue: string, name: string) => {
    const canvas = document.createElement('canvas');
    const svg = document.querySelector('svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `${name}-qr.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">QR Codes</h1>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {/* Shop QR Code */}
          <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium text-gray-900">Shop QR Code</h3>
              <p className="mt-1 text-sm text-gray-500">
                Customers can scan this to see your entire menu
              </p>
            </div>
            <div className="px-4 py-5 sm:p-6 flex justify-center">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <QRCodeSVG
                  value={generateQRValue('shop', shopId)}
                  size={200}
                  level="H"
                  includeMargin
                />
              </div>
            </div>
            <div className="px-4 py-4 sm:px-6 flex justify-center space-x-4">
              <button
                onClick={() => downloadQR(generateQRValue('shop', shopId), 'shop')}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </button>
            </div>
          </div>

          {/* Product QR Codes */}
          <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium text-gray-900">Product QR Codes</h3>
              <p className="mt-1 text-sm text-gray-500">
                Select a product to generate its QR code
              </p>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                onChange={(e) => {
                  const product = mockProducts.find((p) => p.id === e.target.value);
                  setSelectedProduct(product || null);
                }}
                defaultValue=""
              >
                <option value="" disabled>
                  Select a product
                </option>
                {mockProducts.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>

              {selectedProduct && (
                <div className="mt-6 flex flex-col items-center">
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <QRCodeSVG
                      value={generateQRValue('product', selectedProduct.id)}
                      size={200}
                      level="H"
                      includeMargin
                    />
                  </div>
                  <div className="mt-4 flex space-x-4">
                    <button
                      onClick={() =>
                        downloadQR(
                          generateQRValue('product', selectedProduct.id),
                          selectedProduct.name
                        )
                      }
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </button>
                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}