"use client";

import { CvCard } from "@components/CvCard";
import { Empty } from "@components/Empty";
import { Typography } from "@components/Typography";
import type { Resume } from "@interfaces/resume/types";
import type { FC } from "react";

export interface IProps {
  resumes: Resume[];
}

const MyResumes: FC<IProps> = ({ resumes }) => {
  return (
    <main className="min-w-0 flex-1">
      <div className="flex min-h-full flex-col">
        <section className="flex flex-wrap items-end justify-between gap-4 border-b border-border px-6 py-5">
          <div>
            <Typography text="h3" medium class="leading-6.75!">
              My Resumes
            </Typography>
            <div className="flex mt-0.5">
              <Typography color="mutedForeground" class="leading-5!">
                {resumes.length} resumes · {resumes.length} shown
              </Typography>
            </div>
          </div>
        </section>
        <section className="flex-1 p-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {!resumes.length ? (
              <Empty
                title="No resumes yet"
                description="It's quiet in here. Upload your first resume and it will show up on this list."
              />
            ) : (
              resumes.map((resume) => (
                <CvCard
                  key={resume.id}
                  category={resume.category}
                  filename={resume.filename}
                  title={resume.title}
                  created_at={resume.created_at}
                  updated_at={resume.updated_at}
                  skills={JSON.parse(resume.skills)}
                  onClick={() => {}}
                />
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default MyResumes;
