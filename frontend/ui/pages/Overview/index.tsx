"use client";

import { Card } from "@components/Card";
import { ColumnHeader } from "@components/ColumnHeader";
import type { Job } from "@interfaces/job/types";
import type { ColumnId } from "@interfaces/overview/types";
import { type DragEvent, type FC, useState } from "react";

const COLUMNS = [
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

export interface IProps {
  handleUpdateStage: (
    id: string,
    column: ColumnId,
    prevColumn: ColumnId,
  ) => void;
  jobs: Job[];
}

export const Overview: FC<IProps> = ({ jobs, handleUpdateStage }) => {
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [overColumn, setOverColumn] = useState<ColumnId | null>(null);

  const dragStart = (e: DragEvent<HTMLLIElement>, id: number) => {
    e.dataTransfer.setData("text/plain", id.toString());
    e.dataTransfer.effectAllowed = "move";
    setDraggedId(id);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setOverColumn(null);
  };

  const handleDragOver = (
    e: DragEvent<HTMLButtonElement>,
    column: ColumnId,
  ) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (overColumn !== column) setOverColumn(column);
  };

  const handleDrop = (e: DragEvent<HTMLButtonElement>, column: ColumnId) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");

    const index = jobs.findIndex((job) => job.id === parseInt(id, 10));
    const job = jobs[index];

    if (!job) {
      handleDragEnd();
      return;
    }
    handleUpdateStage(id, column, job.stage);
    handleDragEnd();
  };

  return (
    <main className="min-w-0 flex-1">
      <div className="relative flex h-screen flex-col">
        <div className="flex flex-1 overflow-x-auto">
          {COLUMNS.map((col) => {
            const columnJobs = jobs.filter((j) => j.stage === col.id);

            return (
              <div
                key={col.id}
                className="flex min-w-64 flex-1 flex-col border-r border-border transition-colors"
              >
                <ColumnHeader
                  title={col.title}
                  total={String(columnJobs.length)}
                  color={col.id}
                />

                <button
                  type="button"
                  onDragOver={(e) => handleDragOver(e, col.id)}
                  onDragLeave={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                      setOverColumn(null);
                    }
                  }}
                  onDrop={(e) => handleDrop(e, col.id)}
                  className={`flex flex-1 flex-col gap-2 overflow-y-auto p-2.5 pb-24 transition-colors ${
                    overColumn === col.id ? "bg-muted/40" : ""
                  }`}
                >
                  {!columnJobs.length && (
                    <div className="flex flex-1 items-center justify-center text-center text-[10px] font-medium uppercase tracking-[0.12em] text-faint">
                      {col.fallback}
                    </div>
                  )}
                  {columnJobs.length > 0 && (
                    <ul className="flex flex-col gap-2">
                      {columnJobs.map((job) => (
                        <li
                          key={job.id}
                          draggable
                          onDragStart={(e) => dragStart(e, job.id)}
                          onDragEnd={handleDragEnd}
                          className={
                            draggedId === job.id ? "opacity-40" : undefined
                          }
                        >
                          <Card
                            title={job.title}
                            location={job.location}
                            link={job.url}
                            id={job.id.toString()}
                            company={job.company}
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};
