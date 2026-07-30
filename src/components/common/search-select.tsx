"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Option {
  label: string;
  value: string;
}

interface SearchSelectProps {
  value?: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  error?: string;
}

export function SearchSelect({
  value,
  onChange,
  options,
  placeholder = "Select option",
  searchPlaceholder = "Search...",
  emptyText = "No data found.",
  disabled,
  error,
}: SearchSelectProps) {
  const [open, setOpen] = React.useState(false);

  const selected = options.find((o) => o.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          disabled={disabled}
          className={cn(
            "w-full h-11 justify-between rounded-xl border text-sm font-normal",
            "bg-white hover:bg-white",
            "focus:ring-2 focus:ring-primary/20",
            disabled && "opacity-60 cursor-not-allowed",
            error
              ? "border-red-500"
              : "border-slate-200 hover:border-primary/40"
          )}
        >
          <span className="truncate">
            {selected ? selected.label : placeholder}
          </span>

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0 rounded-xl border border-slate-200 shadow-xl"
        align="start"
      >
        <Command>
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 text-slate-400" />

            <CommandInput
              placeholder={searchPlaceholder}
              className="h-11 border-0 focus:ring-0"
            />
          </div>

          <CommandList className="max-h-60 overflow-y-auto">
            <CommandEmpty>{emptyText}</CommandEmpty>

            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className="cursor-pointer"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 text-primary",
                      value === option.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />

                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}