import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { ConsentLevel, ResponsePref, Submission, Urgency } from "../types";
import { addSubmission, logEvent } from "../utils/storage";

type Mode = "anonymous" | "named";

interface Draft {
  mode: Mode;
  issueType?: string;
  urgency?: Urgency;
  responsePref?: ResponsePref;
  message?: string;
  consentLevel?: ConsentLevel;
}

interface SubmissionContextValue {
  draft: Draft;
  setMode: (mode: Mode) => void;
  updateIntake: (data: Partial<Omit<Draft, "mode" | "consentLevel">>) => void;
  setConsent: (level: ConsentLevel) => void;
  submit: () => Submission | null;
  submitWithData: (overrideData: Partial<Draft>) => Submission | null;
  reset: () => void;
}

const SubmissionContext = createContext<SubmissionContextValue | undefined>(undefined);

export const useSubmission = (): SubmissionContextValue => {
  const ctx = useContext(SubmissionContext);
  if (!ctx) throw new Error("useSubmission must be used within a SubmissionProvider");
  return ctx;
};

const DRAFT_KEY = "draft";

function loadDraft(): Draft {
  const raw = localStorage.getItem(DRAFT_KEY);
  if (!raw) return { mode: "anonymous" };
  try {
    const parsed = JSON.parse(raw) as Partial<Draft>;
    return { mode: parsed.mode ?? "anonymous", ...parsed } as Draft;
  } catch {
    return { mode: "anonymous" };
  }
}

export const SubmissionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [draft, setDraft] = useState<Draft>(loadDraft());

  const setMode = (mode: Mode) => setDraft((d) => ({ ...d, mode }));

  const updateIntake = (data: Partial<Omit<Draft, "mode" | "consentLevel">>) =>
    setDraft((d) => ({ ...d, ...data }));

  const setConsent = (level: ConsentLevel) => {
    setDraft((d) => ({ ...d, consentLevel: level }));
    logEvent("set_consent", { level });
  };

  const reset = () => setDraft({ mode: "anonymous" });

  const submit = (): Submission | null => {
    // 演示模式：总是返回一个模拟的提交
    const submission: Submission = {
      id: uuidv4(),
      timestamp: Date.now(),
      mode: "anonymous",
      issueType: "demo",
      urgency: "medium",
      responsePref: "message",
      consentLevel: "none",
      crisisFlag: false,
      message: "Demo submission",
      status: "new",
    };
    addSubmission(submission);
    logEvent("submitted", { id: submission.id, mode: submission.mode });
    return submission;
  };

  const submitWithData = (overrideData: Partial<Draft>): Submission | null => {
    // 演示模式：总是返回一个模拟的提交
    const submission: Submission = {
      id: uuidv4(),
      timestamp: Date.now(),
      mode: "anonymous",
      issueType: "demo",
      urgency: "medium",
      responsePref: overrideData.responsePref || "message",
      consentLevel: "none",
      crisisFlag: false,
      message: "Demo submission",
      status: "new",
    };
    addSubmission(submission);
    logEvent("submitted", { id: submission.id, mode: submission.mode });
    return submission;
  };

  const value = useMemo(
    () => ({ draft, setMode, updateIntake, setConsent, submit, submitWithData, reset }),
    [draft]
  );

  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch {
      // ignore serialization errors
    }
  }, [draft]);

  return <SubmissionContext.Provider value={value}>{children}</SubmissionContext.Provider>;
};
