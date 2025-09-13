export type Urgency = "low" | "medium" | "high";
export type ConsentLevel = "immediate" | "crisis_only" | "none";
export type ResponsePref = "message" | "appointment" | "resources";

export interface Submission {
  id: string;                 // uuid
  timestamp: number;          // Date.now()
  mode: "anonymous" | "named";
  displayName?: string;       // only if named path is added later
  issueType: string;          // e.g., "emotions/feelings", "academic", "family"
  urgency: Urgency;
  responsePref: ResponsePref;
  consentLevel: ConsentLevel;
  crisisFlag: boolean;        // derived from triage or high-urgency
  message?: string;           // optional free text
  status: "new" | "flagged" | "responded";
}

export interface EventLog {
  id: string;
  timestamp: number;
  type:
    | "start_anonymous"
    | "set_consent"
    | "submitted"
    | "flag_case"
    | "respond_case";
  payload?: Record<string, any>;
}

