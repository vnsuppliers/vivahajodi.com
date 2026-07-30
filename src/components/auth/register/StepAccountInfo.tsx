import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  RegisterForm,
  RegisterErrors,
} from "@/interfaces/auth.interface";

interface Props {
  form: RegisterForm;
  errors: RegisterErrors;
  update: (
    key: keyof RegisterForm,
    value: string
  ) => void;
  nextStep: () => void;
}

export const StepAccountInfo = ({
  form,
  errors,
  update,
  nextStep,
}: Props) => (
  <div className="space-y-5 animate-in fade-in slide-in-from-right-8 duration-500">

    {/* First + Last Name */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      <div className="space-y-1">
        <Label>First Name *</Label>

        <Input
          placeholder="Enter first name"
          className={`h-11 rounded-xl ${
            errors.first_name
              ? "border-red-500 focus-visible:ring-red-500"
              : ""
          }`}
          value={form.first_name}
          onChange={(e) =>
            update("first_name", e.target.value)
          }
        />

        {errors.first_name && (
          <span className="text-[10px] text-red-500 font-medium">
            {errors.first_name}
          </span>
        )}
      </div>

      <div className="space-y-1">
        <Label>Last Name *</Label>

        <Input
          placeholder="Enter last name"
          className={`h-11 rounded-xl ${
            errors.last_name
              ? "border-red-500 focus-visible:ring-red-500"
              : ""
          }`}
          value={form.last_name}
          onChange={(e) =>
            update("last_name", e.target.value)
          }
        />

        {errors.last_name && (
          <span className="text-[10px] text-red-500 font-medium">
            {errors.last_name}
          </span>
        )}
      </div>
    </div>

    {/* Email + Phone */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      <div className="space-y-1">
        <Label>Email *</Label>

        <Input
          type="email"
          placeholder="Enter email address"
          className={`h-11 rounded-xl ${
            errors.email
              ? "border-red-500 focus-visible:ring-red-500"
              : ""
          }`}
          value={form.email}
          onChange={(e) =>
            update("email", e.target.value)
          }
        />

        {errors.email && (
          <span className="text-[10px] text-red-500 font-medium">
            {errors.email}
          </span>
        )}
      </div>

      <div className="space-y-1">
        <Label>Phone *</Label>

        <Input
          placeholder="Numbers only"
          className={`h-11 rounded-xl ${
            errors.phone
              ? "border-red-500 focus-visible:ring-red-500"
              : ""
          }`}
          value={form.phone}
          onChange={(e) =>
            update("phone", e.target.value)
          }
        />

        {errors.phone && (
          <span className="text-[10px] text-red-500 font-medium">
            {errors.phone}
          </span>
        )}
      </div>
    </div>

    {/* DOB + Password */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      {/* DOB */}
      <div className="space-y-1">
        <Label>Date of Birth *</Label>

        <Popover>
<PopoverTrigger asChild>
  <Button
    type="button"
    variant="outline"
    className={cn(
      "w-full h-11 rounded-xl justify-start text-left font-normal border-slate-200 hover:bg-transparent",
      !form.date_of_birth &&
        "text-slate-400",
      errors.date_of_birth &&
        "border-red-500"
    )}
  >
    <CalendarIcon className="mr-2 h-4 w-4 text-slate-500" />

    {form.date_of_birth ? (
      format(
        new Date(form.date_of_birth),
        "dd MMM yyyy"
      )
    ) : (
      <span>Date Of Birth</span>
    )}
  </Button>
</PopoverTrigger>

  <PopoverContent
  className="w-full p-0 rounded-xl border border-slate-200 shadow-2xl bg-white"
  align="start"
  // This ensures the popover doesn't flip weirdly on mobile
  sideOffset={4}
>
  <Calendar
    mode="single"
    selected={form.date_of_birth ? new Date(form.date_of_birth) : undefined}
    onSelect={(date) => {
      if (date) {
        update("date_of_birth", format(date, "yyyy-MM-dd"));
      }
    }}
    disabled={(date) => date > new Date()}
    initialFocus
  />
</PopoverContent>
        </Popover>

        {errors.date_of_birth && (
          <span className="text-[10px] text-red-500 font-medium">
            {errors.date_of_birth}
          </span>
        )}
      </div>

      {/* Password */}
      <div className="space-y-1">
        <Label>Password *</Label>

        <Input
          type="password"
          placeholder="Create password"
          className={`h-11 rounded-xl ${
            errors.password
              ? "border-red-500 focus-visible:ring-red-500"
              : ""
          }`}
          value={form.password}
          onChange={(e) =>
            update("password", e.target.value)
          }
        />

        {errors.password && (
          <span className="text-[10px] text-red-500 font-medium">
            {errors.password}
          </span>
        )}
      </div>
    </div>

    <Button
      type="button"
      className="w-full h-12 mt-2 rounded-xl text-base font-semibold"
      onClick={nextStep}
    >
      Continue to Step 2
    </Button>
  </div>
);