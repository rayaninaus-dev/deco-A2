import React from "react";
import { useLanguage } from "../context/LanguageContext";
import SystemEntryQR from "../components/SystemEntryQR";

const QRCodeEntry: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full">
        <SystemEntryQR size={320} showInstructions={true} />
        
        {/* 额外的使用说明 */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">{t("qrCode.guideTitle")}</h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p><strong>{t("qrCode.useCases")}</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>{t("qrCode.campusPoster")}</li>
              <li>{t("qrCode.flyers")}</li>
              <li>{t("qrCode.socialMedia")}</li>
              <li>{t("qrCode.offlineEvents")}</li>
            </ul>
            <p className="mt-3"><strong>{t("qrCode.advantages")}</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>{t("qrCode.oneClickAccess")}</li>
              <li>{t("qrCode.smartphoneSupport")}</li>
              <li>{t("qrCode.autoRedirect")}</li>
              <li>{t("qrCode.easySharing")}</li>
            </ul>
          </div>
        </div>

        {/* 返回按钮 */}
        <div className="mt-6 text-center">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 text-sm bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            {t("app.back")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeEntry;
