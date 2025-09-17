import React from "react";
import { useNavigate } from "react-router-dom";
import { useSubmission } from "../context/SubmissionContext";
import { useLanguage } from "../context/LanguageContext";
import { logEvent } from "../utils/storage";

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { setMode, reset } = useSubmission();
  const { t } = useLanguage();

  const startAnonymous = () => {
    reset();
    setMode("anonymous");
    logEvent("start_anonymous");
    navigate("/intake");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* 主要内容区域 */}
      <div className="container mx-auto px-4 py-12">
        {/* 标题区域 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {t("landing.title")}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t("landing.subtitle")}
          </p>
        </div>

        {/* 核心功能卡片 */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* 主要行动按钮 */}
            <div className="p-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <h2 className="text-2xl font-semibold mb-4">{t("landing.start")}</h2>
              <p className="text-blue-100 mb-6">{t("landing.anonymous")} · {t("landing.secure")} · {t("landing.professional")}</p>
              <button 
                className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                onClick={startAnonymous}
              >
                {t("landing.start")}
              </button>
            </div>

            {/* 特色功能 */}
            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{t("landing.anonymous")}</h3>
                  <p className="text-sm text-gray-600">{t("landing.anonymousDesc")}</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{t("landing.secure")}</h3>
                  <p className="text-sm text-gray-600">{t("landing.secureDesc")}</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{t("landing.professional")}</h3>
                  <p className="text-sm text-gray-600">{t("landing.professionalDesc")}</p>
                </div>
              </div>

              {/* 二维码功能 */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">{t("landing.shareSystem")}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button 
                    className="flex items-center justify-center gap-3 px-6 py-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-gray-700 font-medium"
                    onClick={() => navigate("/qrcode")}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                    {t("landing.systemQRCode")}
                  </button>
                  <button 
                    className="flex items-center justify-center gap-3 px-6 py-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-gray-700 font-medium"
                    onClick={() => navigate("/share")}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    {t("landing.customQRCode")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SDG 提醒 */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex items-start gap-3 px-6 py-4 bg-green-50 border border-green-200 rounded-xl shadow-sm">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m2 8a9 9 0 110-18 9 9 0 010 18z" />
            </svg>
            <div className="text-left">
              <p className="text-sm font-semibold text-green-800">{t("landing.sdgReminder")}</p>
              <p className="mt-1 text-sm text-green-700">{t("landing.sdgFocus")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
