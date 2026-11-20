"use client";

import { Button } from "@components/Buttons/Button";
import { CvCard } from "@components/CvCard";
import { Dropdown } from "@components/Dropdown";
import { Empty } from "@components/Empty";
import { Input } from "@components/Input";
import { Typography } from "@components/Typography";
import type { Resume } from "@interfaces/resume/types";
import { ALL_CATEGORIES, SORT_OPTIONS } from "@static/constants";
import { Loader2, Plus, Search, X } from "lucide-react";
import { type FC, useMemo } from "react";

export interface IProps {
  onClickAddResume: () => void;
  onClickResetFilters: () => void;
  setFilter: (key: string, value: string) => void;
  category: string;
  search: string;
  sort: string;
  resumes: Resume[];
  isLoadingResumes: boolean;
}

const MyResumes: FC<IProps> = ({
  resumes,
  isLoadingResumes,
  onClickAddResume,
  onClickResetFilters,
  setFilter,
  category,
  search,
  sort,
}) => {
  const categories = useMemo(() => {
    const unique = new Set<string>();
    for (const resume of resumes) {
      if (resume.category) unique.add(resume.category);
    }
    return [ALL_CATEGORIES, ...Array.from(unique)];
  }, [resumes]);

  const filteredResumes = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = resumes.filter((resume) => {
      const matchesCategory =
        category === ALL_CATEGORIES || resume.category === category;

      if (!matchesCategory) return false;
      if (!query) return true;

      return (
        resume.title?.toLowerCase().includes(query) ||
        resume.filename?.toLowerCase().includes(query) ||
        resume.skills?.toLowerCase().includes(query)
      );
    });

    return [...filtered].sort((a, b) => {
      switch (sort) {
        case "Oldest first":
          return +new Date(a.created_at) - +new Date(b.created_at);
        case "Recently updated":
          return +new Date(b.updated_at) - +new Date(a.updated_at);
        case "A–Z":
          return (a.title ?? "").localeCompare(b.title ?? "");
        default:
          return +new Date(b.created_at) - +new Date(a.created_at);
      }
    });
  }, [resumes, search, category, sort]);

  const hasActiveFilters = search !== "" || category !== ALL_CATEGORIES;

  return (
    <main className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      <section className="flex shrink-0 flex-wrap items-end justify-between gap-4 border-b border-border px-6 py-5">
        <div>
          <Typography text="h3" medium class="leading-6.75!">
            My Resumes
          </Typography>
          <div className="mt-0.5 flex">
            <Typography color="mutedForeground" class="leading-5!">
              {resumes.length} resumes · {filteredResumes.length} shown
            </Typography>
          </div>
        </div>
        <Button onClick={onClickAddResume}>
          <Plus />
          Add resume
        </Button>
      </section>

      <section className="flex shrink-0 flex-col gap-3 border-b border-border bg-muted/30 px-6 py-3 sm:flex-row sm:items-center">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="w-full pl-9"
            placeholder="Search resumes, skills..."
            value={search}
            onChange={(e) => setFilter("search", e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-full sm:w-[180px]">
            <Dropdown
              data={categories}
              placeholder={ALL_CATEGORIES}
              activeElement={category}
              onSelect={(option) => setFilter("category", option)}
            />
          </div>
          <div className="w-full sm:w-[160px]">
            <Dropdown
              data={SORT_OPTIONS}
              placeholder="Sort by"
              activeElement={sort}
              onSelect={(option) => setFilter("sort", option)}
            />
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={onClickResetFilters}
              className="shrink-0"
            >
              <X />
              <Typography>Clear</Typography>
            </Button>
          )}
        </div>
      </section>
      <section className="min-h-0 flex-1 overflow-y-auto p-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {isLoadingResumes ? (
            <div className="col-span-full flex justify-center py-16">
              <Loader2 className="size-6 animate-spin text-muted-foreground" />
            </div>
          ) : !resumes.length ? (
            <Empty
              title="No resumes yet"
              description="It's quiet in here. Upload your first resume and it will show up on this list."
            />
          ) : !filteredResumes.length ? (
            <Empty
              title="No matching resumes"
              description="Try a different search phrase or clear the filters."
            />
          ) : (
            filteredResumes.map((resume) => (
              <CvCard
                key={resume.id}
                category={resume.category}
                filename={resume.filename}
                isDefault={resume.is_default ?? false}
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
    </main>
  );
};

export default MyResumes;
