import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      captionLayout="dropdown-buttons"
      fromYear={1920}
      toYear={new Date().getFullYear()}
      className={cn("p-2 bg-white", className)}
      classNames={{
        months: "flex flex-col",
        month: "space-y-0",

        caption: "flex justify-center pt-0.5 relative items-center h-7",
        caption_label: "hidden",
        caption_dropdowns: "flex items-center gap-1.5 z-10",
        dropdown_year: "flex items-center",   // ← fixed
        dropdown: cn(
          "h-6 rounded-md border border-slate-200 bg-white px-1.5 pr-5 text-[11px] font-semibold",
          "text-[#9B1C3E] outline-none cursor-pointer",
          "hover:border-[#9B1C3E] hover:bg-rose-50 transition-colors",
          "appearance-none",
          "bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%279B1C3E%27 stroke-width=%272.5%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpath d=%27m6 9 6 6 6-6%27/%3e%3c/svg%3e')]",
          "bg-[length:9px] bg-[right_4px_center] bg-no-repeat"
        ),

        nav: "flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-6 w-6 bg-transparent p-0 border-slate-200 opacity-60 hover:opacity-100",
          "hover:border-[#9B1C3E] hover:text-[#9B1C3E] transition-colors"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",

        table: "w-full border-collapse",
        head_row: "flex mt-1",
        head_cell: "text-slate-400 w-7 font-medium text-[10px] text-center",
        row: "flex w-full mt-0.5",
        cell: "h-7 w-7 text-center text-xs p-0 relative focus-within:relative focus-within:z-20",

        day: cn(
          "inline-flex items-center justify-center h-7 w-7 rounded-md text-[11px] font-normal",
          "hover:bg-[#F5A623] hover:text-white transition-colors cursor-pointer",
          "aria-selected:opacity-100"
        ),

        day_selected:
          "bg-[#F5A623] !text-white hover:bg-[#F5A623] hover:!text-white focus:bg-[#F5A623] rounded-md",

        day_today: "border border-[#F5A623] text-[#9B1C3E] font-semibold",

        day_outside: "text-slate-300 opacity-40",
        day_disabled:
          "text-slate-300 opacity-40 cursor-not-allowed hover:bg-transparent hover:text-slate-300",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-3 w-3" />,
        IconRight: () => <ChevronRight className="h-3 w-3" />,
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";
export { Calendar };