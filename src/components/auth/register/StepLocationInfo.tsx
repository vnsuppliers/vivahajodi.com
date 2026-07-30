import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { SearchSelect } from "@/components/common/search-select";

import {
  RegisterForm,
  MasterState,
  RegisterErrors,
} from "@/interfaces/auth.interface";

interface LocationProps {
  form: RegisterForm;
  errors: RegisterErrors;

  update: (
    key: keyof RegisterForm,
    value: string
  ) => void;

  nextStep: () => void;
  prevStep: () => void;

  masters: MasterState;
}

export const StepLocationInfo = ({
  form,
  errors,
  update,
  nextStep,
  prevStep,
  masters,
}: LocationProps) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">

      {/* Gender & Religion */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Gender */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-slate-700">
            Gender *
          </Label>

          <SearchSelect
            value={form.gender_id}
            onChange={(value) =>
              update("gender_id", value)
            }
            options={(masters.genders || []).map((g) => ({
              label: g.name,
              value: g.id.toString(),
            }))}
            placeholder="Select Gender"
            searchPlaceholder="Search gender..."
            error={errors.gender_id}
          />

          {errors.gender_id && (
            <p className="text-xs text-red-500 font-medium">
              {errors.gender_id}
            </p>
          )}
        </div>

        {/* Religion */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-slate-700">
            Religion *
          </Label>

          <SearchSelect
            value={form.religion_id}
            onChange={(value) =>
              update("religion_id", value)
            }
            options={(masters.religions || []).map((r) => ({
              label: r.name,
              value: r.id.toString(),
            }))}
            placeholder="Select Religion"
            searchPlaceholder="Search religion..."
            error={errors.religion_id}
          />

          {errors.religion_id && (
            <p className="text-xs text-red-500 font-medium">
              {errors.religion_id}
            </p>
          )}
        </div>
      </div>

      {/* Country */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold text-slate-700">
          Country *
        </Label>

        <SearchSelect
          value={form.country_id}
          onChange={(value) =>
            update("country_id", value)
          }
          options={(masters.countries || []).map((c) => ({
            label: c.name,
            value: c.id.toString(),
          }))}
          placeholder="Select Country"
          searchPlaceholder="Search country..."
          error={errors.country_id}
        />

        {errors.country_id && (
          <p className="text-xs text-red-500 font-medium">
            {errors.country_id}
          </p>
        )}
      </div>

      {/* State & City */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* State */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-slate-700">
            State *
          </Label>

          <SearchSelect
            value={form.state_id}
            onChange={(value) =>
              update("state_id", value)
            }
            options={(masters.states || []).map((s) => ({
              label: s.name,
              value: s.id.toString(),
            }))}
            placeholder="Select State"
            searchPlaceholder="Search state..."
            disabled={!form.country_id}
            error={errors.state_id}
          />

          {errors.state_id && (
            <p className="text-xs text-red-500 font-medium">
              {errors.state_id}
            </p>
          )}
        </div>

        {/* City */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-slate-700">
            City *
          </Label>

          <SearchSelect
            value={form.city_id}
            onChange={(value) =>
              update("city_id", value)
            }
            options={(masters.cities || []).map((c) => ({
            label: c.name,       
            value: c.id.toString(), 
          }))}
            placeholder="Select City"
            searchPlaceholder="Search city..."
            disabled={!form.state_id}
            error={errors.city_id}
          />

          {errors.city_id && (
            <p className="text-xs text-red-500 font-medium">
              {errors.city_id}
            </p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          className="flex-1 h-11 rounded-xl border-slate-200 hover:bg-slate-50"
        >
          Back
        </Button>

        <Button
          type="button"
          onClick={nextStep}
          className="flex-1 h-11 rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg"
        >
          Continue to Step 3
        </Button>
      </div>
    </div>
  );
};