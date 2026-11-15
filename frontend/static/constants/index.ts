export const COLUMN_IDS = [
  "new",
  "ranked",
  "applied",
  "screening",
  "techInterview",
  "finalRound",
  "offer",
  "rejected",
  "skipped",
] as const;

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
