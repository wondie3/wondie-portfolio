const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2025" -> "2025", "2025-03" -> "Mar 2025", "2026-11-06" -> "Nov 6, 2026". Anything else is shown as typed. */
export function formatDate(d?: string): string {
  if (!d) return "";
  const m = /^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?$/.exec(d);
  if (!m) return d;
  if (!m[2]) return m[1];
  const mon = MONTHS[Number(m[2]) - 1] ?? "";
  if (m[3]) return `${mon} ${Number(m[3])}, ${m[1]}`;
  return `${mon} ${m[1]}`.trim();
}

const FULL = /^(\d{4})-(\d{2})-(\d{2})$/;

/** Consistent period text. end: "present" means a current role. Same-month ranges read "Nov 27\u201329, 2026". */
export function formatPeriod(start?: string, end?: string): string {
  if (end === "present") {
    const s = formatDate(start);
    return s ? `Since ${s}` : "";
  }
  const a = FULL.exec(start ?? "");
  const z = FULL.exec(end ?? "");
  if (a && z && a[1] === z[1] && a[2] === z[2]) {
    return `${MONTHS[Number(a[2]) - 1]} ${Number(a[3])}\u2013${Number(z[3])}, ${a[1]}`;
  }
  const s = formatDate(start);
  const e = formatDate(end);
  if (s && e) return s === e ? s : `${s} \u2013 ${e}`;
  return s || e;
}
