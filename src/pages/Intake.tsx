import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSubmission } from "../context/SubmissionContext";
import { useLanguage } from "../context/LanguageContext";
import type { Urgency } from "../types";

const Intake: React.FC = () => {
  const navigate = useNavigate();
  const { draft, updateIntake } = useSubmission();
  const { t } = useLanguage();

  const [message, setMessage] = useState(draft.message ?? "");
  const [urgency, setUrgency] = useState<Urgency | "">(draft.urgency ?? "");
  const [issueType, setIssueType] = useState(draft.issueType ?? "");

  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const validate = () => {
    const e: { [k: string]: string } = {};
    // 对于演示程序，所有字段都是可选的
    setErrors(e);
    return true;
  };

  const onNext = () => {
    if (!validate()) return;
    updateIntake({ urgency: urgency as Urgency, message, issueType });
    navigate("/consent");
  };

  return (
    <section className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{t("intake.title")}</h1>
        <p className="text-gray-600">{t("intake.subtitle")}</p>
      </div>
      
      <div className="card space-y-6">
        <div>
          <label htmlFor="msg" className="block mb-2 text-lg font-medium text-gray-700">
            {t("intake.messageLabel")}
          </label>
          <textarea 
            id="msg" 
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            rows={5} 
            placeholder={t("intake.messagePlaceholder")}
            value={message} 
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)} 
          />
        </div>

        <fieldset>
          <legend className="block mb-3 text-lg font-medium text-gray-700">{t("intake.issueTypeLabel")}</legend>
          <div className="space-y-3" role="radiogroup" aria-label={t("intake.issueTypeLabel")}>
            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input type="radio" name="issueType" value="emotions" checked={issueType === "emotions"} onChange={() => setIssueType("emotions")} className="text-blue-600" />
              <div>
                <span className="font-medium text-gray-800">{t("intake.issueType.emotions")}</span>
                <p className="text-sm text-gray-600">{t("intake.issueType.emotionsDesc")}</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input type="radio" name="issueType" value="academic" checked={issueType === "academic"} onChange={() => setIssueType("academic")} className="text-blue-600" />
              <div>
                <span className="font-medium text-gray-800">{t("intake.issueType.academic")}</span>
                <p className="text-sm text-gray-600">{t("intake.issueType.academicDesc")}</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input type="radio" name="issueType" value="family" checked={issueType === "family"} onChange={() => setIssueType("family")} className="text-blue-600" />
              <div>
                <span className="font-medium text-gray-800">{t("intake.issueType.family")}</span>
                <p className="text-sm text-gray-600">{t("intake.issueType.familyDesc")}</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input type="radio" name="issueType" value="relationships" checked={issueType === "relationships"} onChange={() => setIssueType("relationships")} className="text-blue-600" />
              <div>
                <span className="font-medium text-gray-800">{t("intake.issueType.relationships")}</span>
                <p className="text-sm text-gray-600">{t("intake.issueType.relationshipsDesc")}</p>
              </div>
            </label>
          </div>
          {errors.issueType && <p className="text-sm text-red-600 mt-2" role="alert">{errors.issueType}</p>}
        </fieldset>

        <fieldset>
          <legend className="block mb-3 text-lg font-medium text-gray-700">{t("intake.urgencyLabel")}</legend>
          <div className="space-y-3" role="radiogroup" aria-label={t("intake.urgencyLabel")}>
            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input type="radio" name="urgency" value="low" checked={urgency === "low"} onChange={() => setUrgency("low")} className="text-blue-600" />
              <div>
                <span className="font-medium text-gray-800">{t("intake.urgency.low")}</span>
                <p className="text-sm text-gray-600">{t("intake.urgency.lowDesc")}</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input type="radio" name="urgency" value="medium" checked={urgency === "medium"} onChange={() => setUrgency("medium")} className="text-blue-600" />
              <div>
                <span className="font-medium text-gray-800">{t("intake.urgency.medium")}</span>
                <p className="text-sm text-gray-600">{t("intake.urgency.mediumDesc")}</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input type="radio" name="urgency" value="high" checked={urgency === "high"} onChange={() => setUrgency("high")} className="text-blue-600" />
              <div>
                <span className="font-medium text-red-600">{t("intake.urgency.high")}</span>
                <p className="text-sm text-gray-600">{t("intake.urgency.highDesc")}</p>
              </div>
            </label>
          </div>
          {errors.urgency && <p className="text-sm text-red-600 mt-2" role="alert">{errors.urgency}</p>}
        </fieldset>

        <div className="flex justify-end">
          <button className="btn btn-primary px-8 py-3 text-lg" onClick={onNext}>
            {t("app.continue")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Intake;