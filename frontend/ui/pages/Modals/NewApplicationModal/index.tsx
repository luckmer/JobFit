import { Button } from "@components/Buttons/Button";
import CalendarPicker from "@components/CalendarPicker";
import { Dialog } from "@components/Dialog/Dialog";
import { DialogContent } from "@components/Dialog/DialogContent";
import { DialogHeader } from "@components/Dialog/DialogHeader";
import { Dropdown } from "@components/Dropdown";
import { Input } from "@components/Input";
import { Typography } from "@components/Typography";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type NewApplicationFormValues,
  newApplicationSchema,
} from "@schemas/newApplicationSchema";
import { COLUMN_IDS } from "@static/constatns";
import { cn } from "cn";
import { X } from "lucide-react";
import type { FC } from "react";
import { Controller, useForm } from "react-hook-form";

export type IProps = {
  open: boolean;
  onOpenChange: (status: boolean) => void;
  onSubmit: (values: NewApplicationFormValues) => void;
};

export const NewApplicationModal: FC<IProps> = ({
  onOpenChange,
  open,
  onSubmit,
}) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<NewApplicationFormValues>({
    resolver: zodResolver(newApplicationSchema),
    mode: "onChange",
    defaultValues: {
      company: "",
      jobTitle: "",
      stage: "new",
    },
  });

  const handleClose = () => {
    if (isSubmitting) return;
    reset();
    onOpenChange(false);
  };

  const onFormSubmit = async (data: NewApplicationFormValues) => {
    onSubmit(data);
    onOpenChange(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="flex max-h-[85vh] flex-col border-none p-0! shadow-2xl">
        <DialogHeader>
          <section className="flex shrink-0 flex-row items-center justify-between space-y-1.5 border-b border-border px-6 py-4 text-center">
            <Typography text="bodyBold" class="mb-0! sm:text-left!">
              New application
            </Typography>
            <Button
              variant="ghost"
              className="h-fit p-0!"
              onClick={handleClose}
              disabled={isSubmitting}
              type="button"
            >
              <X />
            </Button>
          </section>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="flex min-h-0 flex-1 flex-col overflow-hidden"
        >
          <section className="min-h-0 flex-1 space-y-4 overflow-y-auto px-6 py-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <Typography text="tiny" uppercase color="mutedForeground">
                  company *
                </Typography>
                <Controller
                  control={control}
                  name="company"
                  render={({ field }) => (
                    <Input
                      placeholder="Google"
                      value={field.value ?? ""}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.company && (
                  <span className="text-xs text-destructive">
                    {errors.company.message}
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <Typography text="tiny" uppercase color="mutedForeground">
                  job title *
                </Typography>
                <Controller
                  control={control}
                  name="jobTitle"
                  render={({ field }) => (
                    <Input
                      placeholder="Senior Frontend Engineer"
                      value={field.value ?? ""}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.jobTitle && (
                  <span className="text-xs text-destructive">
                    {errors.jobTitle.message}
                  </span>
                )}
              </div>
              <div className="space-y-1 sm:col-span-2">
                <Typography text="tiny" uppercase color="mutedForeground">
                  Posting url
                </Typography>
                <Controller
                  control={control}
                  name="postingUrl"
                  render={({ field }) => (
                    <Input
                      placeholder="https://..."
                      value={field.value ?? ""}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.postingUrl && (
                  <span className="text-xs text-destructive">
                    {errors.postingUrl.message}
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-1 sm:col-span-2">
              <Typography text="tiny" uppercase color="mutedForeground">
                Job description or posting URL
              </Typography>
              <Controller
                control={control}
                name="jobDescription"
                render={({ field }) => (
                  <textarea
                    placeholder="Paste the full job description..."
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    className={cn(
                      "min-h-20 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
                    )}
                  />
                )}
              />
            </div>
            <div className="grid gap-3 border-t border-border pt-4 sm:grid-cols-2">
              <div className="space-y-1">
                <Typography text="tiny" uppercase color="mutedForeground">
                  Salary range
                </Typography>
                <Controller
                  control={control}
                  name="salaryRange"
                  render={({ field }) => (
                    <Input
                      placeholder="12 000 - 16 000 net B2B"
                      value={field.value ?? ""}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
              <div className="space-y-1">
                <Typography text="tiny" uppercase color="mutedForeground">
                  Location / work arrangement
                </Typography>
                <Controller
                  control={control}
                  name="location"
                  render={({ field }) => (
                    <Input
                      placeholder="Warsaw - hybrid, 2 remote days/week"
                      value={field.value ?? ""}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
              <div className="space-y-1">
                <Typography text="tiny" uppercase color="mutedForeground">
                  Employment type
                </Typography>
                <Controller
                  control={control}
                  name="employmentType"
                  render={({ field }) => (
                    <Input
                      placeholder="Full time"
                      value={field.value ?? ""}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
              <div className="space-y-1">
                <Typography text="tiny" uppercase color="mutedForeground">
                  Application date
                </Typography>
                <div className="flex h-9.25">
                  <Controller
                    control={control}
                    name="applicationDate"
                    render={({ field }) => (
                      <CalendarPicker
                        onChange={field.onChange}
                        placeholder="Select date"
                        value={field.value ?? ""}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Typography text="tiny" uppercase color="mutedForeground">
                  Follow-up date
                </Typography>
                <div className="flex h-9.25">
                  <Controller
                    control={control}
                    name="followUpDate"
                    render={({ field }) => (
                      <CalendarPicker
                        onChange={field.onChange}
                        placeholder="Select date"
                        value={field.value ?? ""}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Typography text="tiny" uppercase color="mutedForeground">
                  Stage
                </Typography>
                <div className="flex h-9.25">
                  <Controller
                    control={control}
                    name="stage"
                    render={({ field }) => (
                      <Dropdown
                        placeholder="Select stage"
                        data={COLUMN_IDS}
                        activeElement={field.value ?? ""}
                        onSelect={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-1 sm:col-span-2">
              <Typography text="tiny" uppercase color="mutedForeground">
                Notes
              </Typography>
              <Controller
                control={control}
                name="notes"
                render={({ field }) => (
                  <textarea
                    placeholder="Where you found the role, conversations, salary expectations..."
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    className={cn(
                      "min-h-20 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
                    )}
                  />
                )}
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4">
              <div className="flex flex-row items-center gap-2">
                <Typography text="small" uppercase color="faint">
                  resume
                </Typography>
                <Typography color="mutedForeground">· 0 available</Typography>
              </div>
              <Button variant="outline" disabled type="button">
                <Typography text="small">Analyze & suggest resume</Typography>
              </Button>
            </div>
          </section>
          <section className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-border bg-card px-6 py-4">
            <div className="ml-auto flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={handleClose}
                disabled={isSubmitting}
                type="button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Saving..." : "Save application"}
              </Button>
            </div>
          </section>
        </form>
      </DialogContent>
    </Dialog>
  );
};
