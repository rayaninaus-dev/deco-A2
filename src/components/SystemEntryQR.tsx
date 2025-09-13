import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useLanguage } from "../context/LanguageContext";

interface SystemEntryQRProps {
  size?: number;
  showInstructions?: boolean;
}

const SystemEntryQR: React.FC<SystemEntryQRProps> = ({ 
  size = 300, 
  showInstructions = true 
}) => {
  const { t } = useLanguage();
  
  // 获取当前域名，如果是本地开发则使用localhost
  const getBaseUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.origin;
    }
    return "http://localhost:5173"; // 默认开发服务器地址
  };

  const entryUrl = getBaseUrl();

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t("qrCode.title")}</h2>
        <p className="text-gray-600 mb-4">{t("qrCode.description")}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200">
        <QRCodeCanvas 
          value={entryUrl} 
          size={size}
          level="M"
          includeMargin={true}
        />
      </div>

      {showInstructions && (
        <div className="text-center space-y-3 max-w-md">
          <h3 className="text-lg font-semibold text-gray-800">{t("qrCode.instructions")}</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>1. {t("qrCode.step1")}</p>
            <p>2. {t("qrCode.step2")}</p>
            <p>3. {t("qrCode.step3")}</p>
          </div>
        </div>
      )}

      <div className="text-center">
        <p className="text-xs text-gray-500 font-mono bg-gray-50 px-3 py-2 rounded">
          {entryUrl}
        </p>
        <p className="text-xs text-gray-400 mt-1">{t("qrCode.systemUrl")}</p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => {
            navigator.clipboard.writeText(entryUrl);
            alert(t("qrCode.linkCopied"));
          }}
          className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {t("qrCode.copyLink")}
        </button>
        <button
          onClick={() => {
            const canvas = document.querySelector<HTMLCanvasElement>("canvas");
            if (!canvas) return;
            const link = document.createElement("a");
            link.download = "system-entry-qr.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
          }}
          className="px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded-lg border hover:bg-gray-200 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {t("qrCode.downloadQR")}
        </button>
      </div>
    </div>
  );
};

export default SystemEntryQR;
