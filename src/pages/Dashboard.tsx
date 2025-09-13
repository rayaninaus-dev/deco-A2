import React, { useEffect, useMemo, useState } from "react";
import type { ConsentLevel, Submission, Urgency } from "../types";
import { useLanguage } from "../context/LanguageContext";
import { clearData, downloadCSV, downloadJSON, getSubmissions, logEvent, seedDemoData, submissionsToCSV, updateSubmissionStatus } from "../utils/storage";
import { formatTime, shortId } from "../utils/format";

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [urgencyFilter, setUrgencyFilter] = useState<"all" | Urgency>("all");
  const [consentFilter, setConsentFilter] = useState<"all" | ConsentLevel>("all");
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<"newest" | "oldest" | "urgency">("newest");
  const [liveMsg, setLiveMsg] = useState<string>("");

  const refresh = () => setSubmissions(getSubmissions());

  useEffect(() => {
    refresh();
  }, []);

  const filtered = useMemo(() => {
    const txt = search.trim().toLowerCase();
    const priority = { high: 3, medium: 2, low: 1 } as const;
    let rows = submissions.filter((s) => {
      const okUrg = urgencyFilter === "all" || s.urgency === urgencyFilter;
      const okCon = consentFilter === "all" || s.consentLevel === consentFilter;
      const q = [s.issueType, s.message ?? "", s.id, s.consentLevel, s.status].join(" ").toLowerCase();
      const okSearch = !txt || q.includes(txt);
      return okUrg && okCon && okSearch;
    });
    if (sort === "newest") rows = rows.sort((a, b) => b.timestamp - a.timestamp);
    if (sort === "oldest") rows = rows.sort((a, b) => a.timestamp - b.timestamp);
    if (sort === "urgency") rows = rows.sort((a, b) => (priority[b.urgency] - priority[a.urgency]) || (b.timestamp - a.timestamp));
    return rows;
  }, [submissions, urgencyFilter, consentFilter, search, sort]);

  const onFlag = (id: string) => {
    updateSubmissionStatus(id, "flagged");
    logEvent("flag_case", { id });
    setLiveMsg(t("dashboard.flagged"));
    refresh();
  };

  const onRespond = (id: string) => {
    updateSubmissionStatus(id, "responded");
    logEvent("respond_case", { id });
    setLiveMsg(t("dashboard.responded"));
    refresh();
  };

  const onExportJSON = () => {
    downloadJSON("submissions.json", filtered);
  };

  const onExportCSV = () => {
    const csv = submissionsToCSV(filtered);
    downloadCSV("submissions.csv", csv);
  };

  const onClear = () => {
    if (confirm(t("dashboard.clearConfirm"))) {
      clearData();
      setLiveMsg(t("dashboard.cleared"));
      refresh();
    }
  };

  const onSeed = () => {
    seedDemoData();
    setLiveMsg(t("dashboard.seeded"));
    refresh();
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1>{t("dashboard.title")}</h1>
        <div aria-live="polite" className="text-sm text-gray-600">{liveMsg}</div>
      </div>

      <div className="card">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="flex items-center gap-2">
            <label htmlFor="f-urgency">{t("dashboard.urgency")}</label>
            <select id="f-urgency" className="border border-gray-300 rounded-md px-2 py-1" value={urgencyFilter} onChange={(e) => setUrgencyFilter(e.target.value as any)}>
              <option value="all">{t("dashboard.urgency.all")}</option>
              <option value="low">{t("dashboard.urgency.low")}</option>
              <option value="medium">{t("dashboard.urgency.medium")}</option>
              <option value="high">{t("dashboard.urgency.high")}</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="f-consent">{t("dashboard.consent")}</label>
            <select id="f-consent" className="border border-gray-300 rounded-md px-2 py-1" value={consentFilter} onChange={(e) => setConsentFilter(e.target.value as any)}>
              <option value="all">{t("dashboard.consent.all")}</option>
              <option value="immediate">{t("dashboard.consent.immediate")}</option>
              <option value="crisis_only">{t("dashboard.consent.crisisOnly")}</option>
              <option value="none">{t("dashboard.consent.none")}</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="f-sort">{t("dashboard.sort")}</label>
            <select id="f-sort" className="border border-gray-300 rounded-md px-2 py-1" value={sort} onChange={(e) => setSort(e.target.value as any)}>
              <option value="newest">{t("dashboard.sort.newest")}</option>
              <option value="oldest">{t("dashboard.sort.oldest")}</option>
              <option value="urgency">{t("dashboard.sort.urgency")}</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="f-search">{t("dashboard.search")}</label>
            <input
              id="f-search"
              className="border border-gray-300 rounded-md px-2 py-1"
              placeholder={t("dashboard.searchPlaceholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button className="btn btn-secondary" onClick={onExportJSON}>{t("dashboard.exportJSON")}</button>
            <button className="btn btn-secondary" onClick={onExportCSV}>{t("dashboard.exportCSV")}</button>
            <button className="btn btn-secondary" onClick={onSeed}>{t("dashboard.seedDemo")}</button>
            <button className="btn btn-primary" onClick={onClear}>{t("dashboard.clearData")}</button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="text-gray-600">{t("dashboard.noSubmissions")}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600 border-b">
                  <th className="py-2 pr-4">{t("dashboard.table.id")}</th>
                  <th className="py-2 pr-4">{t("dashboard.table.issue")}</th>
                  <th className="py-2 pr-4">{t("dashboard.table.urgency")}</th>
                  <th className="py-2 pr-4">{t("dashboard.table.consent")}</th>
                  <th className="py-2 pr-4">{t("dashboard.table.timestamp")}</th>
                  <th className="py-2 pr-4">{t("dashboard.table.status")}</th>
                  <th className="py-2 pr-0">{t("dashboard.table.actions")}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id} className="border-b last:border-b-0">
                    <td className="py-2 pr-4 font-mono">{shortId(s.id)}</td>
                    <td className="py-2 pr-4">{s.issueType}</td>
                    <td className="py-2 pr-4">
                      <span className={`badge ${s.urgency === "low" ? "badge-low" : s.urgency === "medium" ? "badge-medium" : "badge-high"}`}>
                        {s.urgency}
                      </span>
                    </td>
                    <td className="py-2 pr-4">{s.consentLevel}</td>
                    <td className="py-2 pr-4">{formatTime(s.timestamp)}</td>
                    <td className="py-2 pr-4">{s.status}</td>
                    <td className="py-2 pr-0">
                      <div className="flex gap-2">
                        <button className="btn btn-secondary" onClick={() => onFlag(s.id)} disabled={s.status !== "new"}>{t("dashboard.flag")}</button>
                        <button className="btn btn-secondary" onClick={() => onRespond(s.id)} disabled={s.status === "responded"}>{t("dashboard.respond")}</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
