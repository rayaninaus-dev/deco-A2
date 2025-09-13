import { v4 as uuidv4 } from "uuid";
import type { Submission, EventLog } from "../types";

const SUBMISSIONS_KEY = "submissions";
const EVENTS_KEY = "events";

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function getSubmissions(): Submission[] {
  return safeParse<Submission[]>(localStorage.getItem(SUBMISSIONS_KEY), []);
}

export function setSubmissions(list: Submission[]): void {
  localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(list));
}

export function addSubmission(sub: Submission): void {
  const list = getSubmissions();
  list.unshift(sub);
  setSubmissions(list);
}

export function updateSubmissionStatus(id: string, status: Submission["status"]): void {
  const list = getSubmissions().map((s) => (s.id === id ? { ...s, status } : s));
  setSubmissions(list);
}

export function getEvents(): EventLog[] {
  return safeParse<EventLog[]>(localStorage.getItem(EVENTS_KEY), []);
}

export function logEvent(type: EventLog["type"], payload?: Record<string, any>): void {
  const entry: EventLog = {
    id: uuidv4(),
    timestamp: Date.now(),
    type,
    payload,
  };
  const events = getEvents();
  events.push(entry);
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
}

export function clearData(): void {
  localStorage.removeItem(SUBMISSIONS_KEY);
  localStorage.removeItem(EVENTS_KEY);
}

export function downloadJSON(filename: string, data: unknown): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function csvEscape(value: any): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (/[",\n]/.test(str)) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

export function submissionsToCSV(rows: Submission[]): string {
  const headers = [
    "id",
    "timestamp",
    "mode",
    "student_initiated",
    "issueType",
    "urgency",
    "responsePref",
    "consentLevel",
    "crisisFlag",
    "message",
    "status",
  ];
  const lines = [headers.join(",")];
  for (const s of rows) {
    const record = [
      s.id,
      s.timestamp,
      s.mode,
      s.mode === "anonymous" ? true : false,
      s.issueType,
      s.urgency,
      s.responsePref,
      s.consentLevel,
      s.crisisFlag,
      s.message ?? "",
      s.status,
    ].map(csvEscape);
    lines.push(record.join(","));
  }
  return lines.join("\n");
}

export function downloadCSV(filename: string, csv: string): void {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function seedDemoData(): void {
  // create three example submissions covering each consent level
  const now = Date.now();
  const examples: Submission[] = [
    {
      id: uuidv4(),
      timestamp: now - 1000 * 60 * 45,
      mode: "anonymous",
      issueType: "Emotions/feelings",
      urgency: "high",
      responsePref: "message",
      consentLevel: "immediate",
      crisisFlag: true,
      message: "Feeling overwhelmed before exams.",
      status: "new",
    },
    {
      id: uuidv4(),
      timestamp: now - 1000 * 60 * 20,
      mode: "anonymous",
      issueType: "Academic",
      urgency: "medium",
      responsePref: "appointment",
      consentLevel: "crisis_only",
      crisisFlag: false,
      message: "Struggling with assignments and focus.",
      status: "new",
    },
    {
      id: uuidv4(),
      timestamp: now - 1000 * 60 * 5,
      mode: "anonymous",
      issueType: "Family/peers",
      urgency: "low",
      responsePref: "resources",
      consentLevel: "none",
      crisisFlag: false,
      message: "Conflict with a friend.",
      status: "new",
    },
  ];
  const current = getSubmissions();
  setSubmissions([...examples, ...current]);
  for (const e of examples) {
    logEvent("submitted", { id: e.id, seeded: true });
  }
}

