"use client";

import { Typography } from "@components/Typography";

const CareerAssistant = () => {
  return (
    <main className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      <section className="flex shrink-0 flex-wrap items-end justify-between gap-4 border-b border-border px-6 py-5">
        <div>
          <Typography text="h3" medium class="leading-6.75!">
            Career Assistant
          </Typography>
          <div className="mt-0.5 flex">
            <Typography color="mutedForeground" class="leading-5!">
              Your personal AI career advisor.
            </Typography>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CareerAssistant;
