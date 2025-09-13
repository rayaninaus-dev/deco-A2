import React from "react";
import { QRCodeCanvas } from "qrcode.react";

interface AppQRCodeProps {
  url: string;
  size?: number;
  showUrl?: boolean;
  title?: string;
  description?: string;
}

const AppQRCode: React.FC<AppQRCodeProps> = ({ 
  url, 
  size = 200, 
  showUrl = true, 
  title,
  description 
}) => {
  return (
    <div className="flex flex-col items-center gap-4">
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 text-center">{title}</h3>
      )}
      
      <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
        <QRCodeCanvas 
          value={url} 
          size={size}
          level="M"
          includeMargin={true}
          imageSettings={{
            src: "",
            height: 24,
            width: 24,
            excavate: true,
          }}
        />
      </div>
      
      {description && (
        <p className="text-sm text-gray-600 text-center max-w-sm">{description}</p>
      )}
      
      {showUrl && (
        <p className="text-xs text-gray-500 break-all text-center max-w-xs font-mono bg-gray-50 px-2 py-1 rounded">
          {url}
        </p>
      )}
    </div>
  );
};

export default AppQRCode;
