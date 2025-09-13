import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";

const AppContent: React.FC = () => {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "zh" ? "en" : "zh");
  };

  // 更新HTML语言属性
  React.useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [language]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-base md:text-lg font-semibold text-gray-900 truncate">
              {t("app.title")}
            </Link>
            <div className="flex items-center gap-2 md:gap-4">
              <nav className="hidden md:flex text-sm text-gray-600 space-x-4">
                <Link to="/" className={location.pathname === "/" ? "text-gray-900" : "hover:text-gray-900"}>
                  {t("app.home")}
                </Link>
                <Link to="/dashboard" className={location.pathname.startsWith("/dashboard") ? "text-gray-900" : "hover:text-gray-900"}>
                  {t("app.dashboard")}
                </Link>
              </nav>
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1 px-2 md:px-3 py-1 text-xs md:text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 touch-target"
                title={t("language.switch")}
              >
                <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                <span className="hidden sm:inline">{language === "zh" ? "EN" : "中"}</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-4 md:py-8">
        <Outlet />
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;

