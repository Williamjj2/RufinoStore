"use client";
import React, { useState } from "react";
import { 
  FaWhatsapp, 
  FaTwitter, 
  FaInstagram, 
  FaLink,
  FaQrcode 
} from "react-icons/fa";
import { motion } from "framer-motion";
import { QRCodeModal } from "./QRCodeModal";

interface ShareButtonsProps {
  url: string;
  title: string;
  description: string;
  username: string;
  className?: string;
}

export function ShareButtons({ 
  url, 
  title, 
  description, 
  username,
  className = "" 
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  // Add UTM parameters for tracking
  const getTrackingUrl = (source: string) => {
    const trackingUrl = new URL(url);
    trackingUrl.searchParams.set('utm_source', source);
    trackingUrl.searchParams.set('utm_medium', 'social');
    trackingUrl.searchParams.set('utm_campaign', 'store_share');
    trackingUrl.searchParams.set('utm_content', username);
    return trackingUrl.toString();
  };

  const handleWhatsAppShare = () => {
    const trackingUrl = getTrackingUrl('whatsapp');
    const message = `🔥 ${title}\n\n${description}\n\n🛒 Confira: ${trackingUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleTwitterShare = () => {
    const trackingUrl = getTrackingUrl('twitter');
    const tweet = `🔥 ${title}\n\n${description}\n\n🛒 ${trackingUrl}\n\n#LojaDigital #ProdutosDigitais`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`;
    window.open(twitterUrl, '_blank');
  };

  const handleInstagramShare = () => {
    // Instagram doesn't support direct sharing with text, so we'll copy the link
    // and open Instagram with a deeplink to stories
    handleCopyLink();
    
    // Try to open Instagram app (mobile)
    if (navigator.userAgent.match(/Mobile/)) {
      window.open('instagram://story-camera', '_blank');
    } else {
      // Desktop: open Instagram web
      window.open('https://www.instagram.com/', '_blank');
    }
  };

  const handleCopyLink = async () => {
    try {
      const trackingUrl = getTrackingUrl('direct');
      await navigator.clipboard.writeText(trackingUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = getTrackingUrl('direct');
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareButtons = [
    {
      icon: FaWhatsapp,
      label: "WhatsApp",
      color: "bg-green-500 hover:bg-green-600",
      action: handleWhatsAppShare
    },
    {
      icon: FaTwitter,
      label: "Twitter",
      color: "bg-blue-500 hover:bg-blue-600", 
      action: handleTwitterShare
    },
    {
      icon: FaInstagram,
      label: "Instagram",
      color: "bg-pink-500 hover:bg-pink-600",
      action: handleInstagramShare
    },
    {
      icon: FaQrcode,
      label: "QR Code",
      color: "bg-purple-500 hover:bg-purple-600",
      action: () => setShowQR(true)
    },
    {
      icon: FaLink,
      label: copied ? "Copiado!" : "Copiar Link",
      color: copied 
        ? "bg-green-500 hover:bg-green-600" 
        : "bg-gray-500 hover:bg-gray-600",
      action: handleCopyLink
    }
  ];

  return (
    <>
      <div className={`flex items-center gap-3 ${className}`}>
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Compartilhar:
        </span>
        
        <div className="flex items-center gap-2">
          {shareButtons.map((button, index) => (
            <motion.button
              key={button.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={button.action}
              className={`
                ${button.color} 
                text-white p-2 rounded-full 
                transition-all duration-200 
                shadow-lg hover:shadow-xl
                flex items-center justify-center
                min-w-[40px] h-10
              `}
              title={button.label}
            >
              <button.icon className="w-4 h-4" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* QR Code Modal */}
      <QRCodeModal
        isOpen={showQR}
        onClose={() => setShowQR(false)}
        url={getTrackingUrl('qrcode')}
        title={title}
        username={username}
      />
    </>
  );
} 