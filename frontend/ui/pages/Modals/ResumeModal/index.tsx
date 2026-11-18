"use client";
import { Button } from "@components/Buttons/Button";
import { Dialog } from "@components/Dialog/Dialog";
import { DialogContent } from "@components/Dialog/DialogContent";
import { DialogHeader } from "@components/Dialog/DialogHeader";
import { Input } from "@components/Input";
import { Typography } from "@components/Typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ResumeFormValues, resumeSchema } from "@schemas/resumeSchema";
import { X } from "lucide-react";
import type { FC } from "react";
import { Controller, useForm } from "react-hook-form";

export type IProps = {
  onOpenChange: (status: boolean) => void;
  onClickSubmit: (formData: FormData) => void;
  open: boolean;
};

const ResumeModal: FC<IProps> = ({ open, onOpenChange, onClickSubmit }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResumeFormValues>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      title: "",
      category: "",
      skills: "",
      file: undefined,
    },
  });

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  const onSubmit = async (values: ResumeFormValues) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("category", values.category);
    if (values.skills) formData.append("skills", values.skills);
    formData.append("file", values.file);
    onClickSubmit(formData);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="border-none shadow-2xl">
        <DialogHeader>
          <section className="flex shrink-0 flex-row items-start justify-between space-y-1.5 border-b border-border px-6 py-4 text-center">
            <div className="flex flex-col gap-1 flex-start">
              <Typography text="bodyBold" class="mb-0!" left>
                Add resume
              </Typography>
              <Typography text="small" color="mutedForeground" class="mb-0!">
                Register a resume file to attach to applications and rate.
              </Typography>
            </div>
            <Button
              variant="ghost"
              className="h-fit sm:w-auto p-0!"
              onClick={handleClose}
              type="button"
            >
              <X />
            </Button>
          </section>
        </DialogHeader>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="flex min-h-0 flex-1 flex-col"
        >
          <section className="min-h-0 flex-1 space-y-4 overflow-y-auto px-6 py-5">
            <div className="space-y-1">
              <Typography text="tiny" uppercase color="mutedForeground">
                Resume name *
              </Typography>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    name={field.name}
                    placeholder="Frontend Developer"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    aria-invalid={!!errors.title}
                  />
                )}
              />
              {errors.title && (
                <span className="text-xs text-destructive">
                  {errors.title.message}
                </span>
              )}
            </div>
            <div className="space-y-1">
              <Typography text="tiny" uppercase color="mutedForeground">
                File *
              </Typography>
              <Controller
                name="file"
                control={control}
                render={({ field }) => (
                  <input
                    type="file"
                    name={field.name}
                    onBlur={field.onBlur}
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                    aria-invalid={!!errors.file}
                    className="min-h-20 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
                  />
                )}
              />
              {errors.file && (
                <span className="text-xs text-destructive">
                  {errors.file.message}
                </span>
              )}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <div className="flex flex-row gap-1">
                  <Typography text="tiny" uppercase color="mutedForeground">
                    Skills
                  </Typography>
                  <Typography text="tiny" color="faint">
                    (optional, comma-separated)
                  </Typography>
                </div>
                <Controller
                  name="skills"
                  control={control}
                  render={({ field }) => (
                    <Input
                      name={field.name}
                      placeholder="React,Typescript,Tailwind"
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    />
                  )}
                />
              </div>
              <div className="space-y-1">
                <Typography text="tiny" uppercase color="mutedForeground">
                  Category *
                </Typography>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Input
                      name={field.name}
                      placeholder="Frontend"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      aria-invalid={!!errors.category}
                    />
                  )}
                />
                {errors.category && (
                  <span className="text-xs text-destructive">
                    {errors.category.message}
                  </span>
                )}
              </div>
            </div>
            {errors.root && (
              <span className="text-xs text-destructive">
                {errors.root.message}
              </span>
            )}
          </section>
          <section className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-border bg-card px-6 py-4">
            <div className="ml-auto flex items-center gap-2">
              <Button variant="ghost" onClick={handleClose} type="button">
                Cancel
              </Button>
              <Button
                type="submit"
                className="disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add resume
              </Button>
            </div>
          </section>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeModal;
