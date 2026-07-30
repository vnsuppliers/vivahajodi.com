import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { RegisterErrors } from "@/interfaces/auth.interface";
interface StepAboutProps {
  form: { about: string };
  errors: RegisterErrors;
  update: (key: string, value: string) => void;
  prevStep: () => void;
  loading: boolean;
}

export const StepAboutInfo = ({ form, errors, update, prevStep, loading }: StepAboutProps) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="space-y-2">
        <Label className="text-lg font-semibold text-slate-900">About Yourself *</Label>
        <p className="text-sm text-slate-500 mb-2">
          Tell potential matches about your personality, hobbies, and what you are looking for.
        </p>
        <Textarea 
          placeholder="I am a software engineer who loves hiking and..." 
          className="min-h-[200px] text-base leading-relaxed p-4 resize-none border-slate-200 focus:border-primary focus:ring-primary"
          value={form.about}
          onChange={e => update("about", e.target.value)}
        />
        {errors.about && (
          <p className="text-xs text-red-500 font-medium">
            {errors.about}
          </p>
        )}
      </div>

      <div className="flex gap-4 pt-4">
        <Button 
          type="button" 
          variant="ghost" 
          className="flex-1 h-12 text-slate-600" 
          onClick={prevStep}
          disabled={loading}
        >
          Back
        </Button>
        <Button 
          type="submit" 
          className="flex-1 h-12 font-bold shadow-xl shadow-primary/30" 
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Creating Account...</span>
            </div>
          ) : (
            "Complete Registration"
          )}
        </Button>
      </div>
    </div>
  );
};