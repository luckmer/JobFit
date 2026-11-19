export const COLUMN_IDS = [
  "new",
  "ranked",
  "applied",
  "screening",
  "tech interview",
  "final round",
  "offer",
  "rejected",
  "skipped",
] as const;

export type ColumnId = (typeof COLUMN_IDS)[number];

export const COLUMN_ID_TO_TITLE: Record<string, ColumnId> = {
  new: "new",
  ranked: "ranked",
  applied: "applied",
  screening: "screening",
  techInterview: "tech interview",
  finalRound: "final round",
  offer: "offer",
  rejected: "rejected",
  skipped: "skipped",
};

export const TITLE_TO_COLUMN_ID = Object.fromEntries(
  Object.entries(COLUMN_ID_TO_TITLE).map(([id, title]) => [title, id]),
) as Record<string, ColumnId>;

export const COLUMNS = [
  { fallback: "Nothing saved for later", id: "new", title: "New" },
  { fallback: "No applications sent", id: "ranked", title: "Ranked" },
  { fallback: "No recruiter call booked", id: "applied", title: "Applied" },
  { fallback: "No interview booked", id: "screening", title: "Screening" },
  {
    fallback: "No technical stage booked",
    id: "techInterview",
    title: "Tech Interview",
  },
  { fallback: "No finall round", id: "finalRound", title: "Final Round" },
  { fallback: "No offers yet", id: "offer", title: "Offer" },
  { fallback: "Nothing rejected", id: "rejected", title: "Rejected" },
  { fallback: "nothing passed over", id: "skipped", title: "Skipped" },
] as const;

export const ALL_CATEGORIES = "All categories";
export const SORT_OPTIONS = [
  "Newest first",
  "Oldest first",
  "Recently updated",
  "A–Z",
] as const;
