import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSubmission } from "../context/SubmissionContext";
import { useLanguage } from "../context/LanguageContext";
import type { ConsentLevel } from "../types";

const getPreviewText = (level: ConsentLevel, t: (key: string) => string): string => {
  switch (level) {
    case "immediate":
      return t("consent.preview.immediate");
    case "crisis_only":
      return t("consent.preview.crisisOnly");
    case "none":
      return t("consent.preview.none");
    default:
      return "";
  }
};

const Consent: React.FC = () => {
  const navigate = useNavigate();
  const { draft, setConsent } = useSubmission();
  const { t } = useLanguage();
  const [level, setLevel] = useState<ConsentLevel>(draft.consentLevel ?? "none");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setConsent(level);
  }, [level, setConsent]);

  const onContinue = () => {
    // 对于演示程序，直接继续
    setError(null);
    navigate("/confirm");
  };

  return (
    <section className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{t("consent.title")}</h1>
        <p className="text-gray-600">{t("consent.subtitle")}</p>
      </div>
      
      <div className="card space-y-6">
        <fieldset>
          <legend className="block mb-4 text-lg font-medium text-gray-700">{t("consent.legend")}</legend>
          <div className="space-y-3">
            <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input type="radio" name="consent" value="none" checked={level === "none"} onChange={() => setLevel("none")} className="mt-1 text-blue-600" />
              <div>
                <span className="font-medium text-gray-800">{t("consent.none")}</span>
                <p className="text-sm text-gray-600 mt-1">{t("consent.noneDesc")}</p>
              </div>
            </label>
            <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input type="radio" name="consent" value="crisis_only" checked={level === "crisis_only"} onChange={() => setLevel("crisis_only")} className="mt-1 text-blue-600" />
              <div>
                <span className="font-medium text-gray-800">{t("consent.crisisOnly")}</span>
                <p className="text-sm text-gray-600 mt-1">{t("consent.crisisOnlyDesc")}</p>
              </div>
            </label>
            <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input type="radio" name="consent" value="immediate" checked={level === "immediate"} onChange={() => setLevel("immediate")} className="mt-1 text-blue-600" />
              <div>
                <span className="font-medium text-gray-800">{t("consent.immediate")}</span>
                <p className="text-sm text-gray-600 mt-1">{t("consent.immediateDesc")}</p>
              </div>
            </label>
          </div>
          {error && <p className="text-sm text-red-600 mt-2" role="alert">{error}</p>}
        </fieldset>

        <div className="border border-blue-200 rounded-lg p-4 bg-blue-50" aria-live="polite">
          <h2 className="text-lg font-semibold mb-2 text-blue-800">{t("consent.preview")}</h2>
          <p className="text-blue-700">{getPreviewText(level, t)}</p>
        </div>

        <div className="flex items-center justify-between">
          <button className="btn btn-secondary" onClick={() => navigate("/intake")}>{t("app.back")}</button>
          <button className="btn btn-primary px-6" onClick={onContinue}>{t("app.continue")}</button>
        </div>
      </div>
    </section>
  );
};

export default Consent;
