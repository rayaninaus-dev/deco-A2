import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSubmission } from "../context/SubmissionContext";
import { useLanguage } from "../context/LanguageContext";

const Confirm: React.FC = () => {
  const { submit, submitWithData, reset, updateIntake } = useSubmission();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [liveMsg, setLiveMsg] = useState<string>("");
  const [selectedHelpType, setSelectedHelpType] = useState<string | null>(null);

  const onSubmit = () => {
    const s = submit();
    if (s) {
      setSubmittedId(s.id);
      setLiveMsg(t("confirm.submitted"));
      // 演示模式：不重置状态，允许重复使用
    }
  };

  const handleHelpTypeSelect = (helpType: string) => {
    setSelectedHelpType(helpType);
    // 清除之前的提交状态，允许重新选择
    setSubmittedId(null);
    setLiveMsg("");
  };

  const handleSubmitWithHelpType = () => {
    if (!selectedHelpType) return;
    
    // 设置responsePref
    const responsePrefMap: { [key: string]: "message" | "appointment" | "resources" } = {
      "chat": "message",
      "appointment": "appointment", 
      "resources": "resources"
    };
    
    // 演示模式：直接跳转，不收集数据，不重置状态
    setLiveMsg(t("confirm.submitted"));
    
    // 根据选择的帮助类型导航到对应页面
    switch (selectedHelpType) {
      case "chat":
        navigate("/chat");
        break;
      case "appointment":
        navigate("/appointment");
        break;
      case "resources":
        navigate("/resources");
        break;
      default:
        break;
    }
  };

  return (
    <section className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{t("confirm.title")}</h1>
        <p className="text-gray-600">{t("confirm.subtitle")}</p>
      </div>
      
      <div className="card space-y-6">
        {liveMsg && (
          <div aria-live="polite" className="text-green-700 bg-green-50 border border-green-200 rounded-lg p-4 text-center" role="status">
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {liveMsg}
            </div>
          </div>
        )}

        <div className="space-y-4">
          <p className="text-gray-700 text-center">{t("confirm.helpOptions")}</p>
          {submittedId && (
            <p className="text-sm text-blue-600 text-center">
              {t("confirm.demoNote")}
            </p>
          )}
          
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <button 
              className={`btn btn-secondary p-4 md:p-6 text-center space-y-2 hover:bg-blue-50 hover:border-blue-300 touch-target ${
                selectedHelpType === "chat" ? "ring-2 ring-blue-500 bg-blue-50" : ""
              }`}
              onClick={() => handleHelpTypeSelect("chat")}
            >
                <svg className="w-8 h-8 mx-auto text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <div>
                  <div className="font-medium">{t("confirm.chat")}</div>
                  <div className="text-sm text-gray-600">{t("confirm.chatDesc")}</div>
                </div>
              </button>
              
            <button 
              className={`btn btn-secondary p-4 md:p-6 text-center space-y-2 hover:bg-green-50 hover:border-green-300 touch-target ${
                selectedHelpType === "appointment" ? "ring-2 ring-green-500 bg-green-50" : ""
              }`}
              onClick={() => handleHelpTypeSelect("appointment")}
            >
                <svg className="w-8 h-8 mx-auto text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div>
                  <div className="font-medium">{t("confirm.appointment")}</div>
                  <div className="text-sm text-gray-600">{t("confirm.appointmentDesc")}</div>
                </div>
              </button>
              
            <button 
              className={`btn btn-secondary p-4 md:p-6 text-center space-y-2 hover:bg-purple-50 hover:border-purple-300 touch-target ${
                selectedHelpType === "resources" ? "ring-2 ring-purple-500 bg-purple-50" : ""
              }`}
              onClick={() => handleHelpTypeSelect("resources")}
            >
                <svg className="w-8 h-8 mx-auto text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <div>
                  <div className="font-medium">{t("confirm.resources")}</div>
                  <div className="text-sm text-gray-600">{t("confirm.resourcesDesc")}</div>
                </div>
              </button>
            </div>
          </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <button 
            className="btn btn-secondary" 
            onClick={() => window.history.back()} 
            disabled={!!submittedId}
          >
            {t("app.back")}
          </button>
          
          {!submittedId ? (
            <button 
              className="btn btn-primary px-6" 
              onClick={selectedHelpType ? handleSubmitWithHelpType : onSubmit}
              disabled={!selectedHelpType}
            >
              {selectedHelpType ? t("confirm.submitRequest") : t("confirm.selectHelpType")}
            </button>
          ) : (
            <Link className="btn btn-primary px-6" to="/dashboard">
              {t("confirm.viewStatus")}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Confirm;
