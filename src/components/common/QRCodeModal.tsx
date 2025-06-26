"use client";
import React, { useRef } from "react";
import QRCode from "react-qr-code";
import { motion, AnimatePresence } from "framer-motion";
import { FaDownload, FaTimes } from "react-icons/fa";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
  username: string;
}

export function QRCodeModal({ isOpen, onClose, url, title, username }: QRCodeModalProps) {
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQRCode = () => {
    if (!qrRef.current) return;

    // Create canvas to convert SVG to image
    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url_obj = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Add white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw QR code
      ctx.drawImage(img, 0, 0);
      
      // Add title text
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(title, canvas.width / 2, canvas.height - 20);
      
      // Download
      const link = document.createElement('a');
      link.download = `qrcode-${username}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      URL.revokeObjectURL(url_obj);
    };
    img.src = url_obj;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl w-[400px] max-w-[90vw]">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  QR Code da Loja
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              {/* QR Code Container */}
              <div className="flex flex-col items-center space-y-4">
                <div 
                  ref={qrRef}
                  className="bg-white p-4 rounded-lg shadow-inner"
                >
                  <QRCode
                    value={url}
                    size={200}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    viewBox={`0 0 200 200`}
                  />
                </div>

                <div className="text-center">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    @{username}
                  </p>
                </div>

                {/* URL Display */}
                <div className="w-full">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                    <p className="text-xs text-gray-600 dark:text-gray-400 break-all">
                      {url}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 w-full">
                  <button
                    onClick={downloadQRCode}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    <FaDownload className="w-4 h-4" />
                    Download
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Copiar Link
                  </button>
                </div>

                {/* Instructions */}
                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Escaneie o QR code para visitar a loja
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 