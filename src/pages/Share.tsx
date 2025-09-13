import React from "react";
import { useLanguage } from "../context/LanguageContext";
import AppQRCode from "../components/AppQRCode";

const Share: React.FC = () => {
  const { t } = useLanguage();
  const [targetPath, setTargetPath] = React.useState<string>("/");

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const url = `${origin}${targetPath}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert(t("app.success"));
    } catch {
      alert(t("app.error"));
    }
  };

  const downloadPng = () => {
    const canvas = document.querySelector<HTMLCanvasElement>("canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "app-qr.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h1 className="text-xl font-semibold text-gray-900 mb-2">{t("share.title")}</h1>
      <p className="text-sm text-gray-600 mb-6">{t("share.description")}</p>

      <div className="flex items-center gap-2 mb-6">
        <label className="text-sm font-medium text-gray-700">{t("share.target")}:</label>
        <select
          value={targetPath}
          onChange={(e) => setTargetPath(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="/">{t("share.home")}</option>
          <option value="/intake">{t("share.intake")}</option>
          <option value="/confirm">{t("share.confirm")}</option>
          <option value="/appointment">{t("share.appointment")}</option>
          <option value="/resources">{t("share.resources")}</option>
        </select>
      </div>

      <div className="flex flex-col items-center gap-6">
        <AppQRCode 
          url={url} 
          size={280}
          title={t("share.title")}
          description={t("share.scanDescription")}
          showUrl={true}
        />
        <div className="flex gap-3">
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            {t("share.copyLink")}
          </button>
          <button
            onClick={downloadPng}
            className="px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded-lg border hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {t("share.downloadPNG")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Share;

