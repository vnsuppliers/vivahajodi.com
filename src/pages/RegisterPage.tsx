import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Heart } from "lucide-react";

import { registerSchema, RegisterErrors } from "@/schemas/register.schema";
import { masterService } from "@/services/master.service";
import { useAuth } from "@/contexts/AuthContext";

import {
  RegisterForm,
  MasterState,
} from "@/interfaces/auth.interface";

import { StepAccountInfo } from "@/components/auth/register/StepAccountInfo";
import { StepLocationInfo } from "@/components/auth/register/StepLocationInfo";
import { StepAboutInfo } from "@/components/auth/register/StepAboutInfo";

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] =
    useState<RegisterErrors>({});

  const { register } = useAuth();

  const navigate = useNavigate();

  const [form, setForm] =
    useState<RegisterForm>({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",

      gender_id: "",
      religion_id: "",

      country_id: "",
      state_id: "",
      city_id: "",

      about: "",
      date_of_birth: "",
    });

  const [masters, setMasters] =
    useState<MasterState>({
      countries: [],
      states: [],
      cities: [],
      religions: [],
      genders: [],
    });

  // Fetch Initial Masters
  useEffect(() => {
    masterService
      .getCountries()
      .then((data) =>
        setMasters((prev) => ({
          ...prev,
          countries: data || [],
        }))
      );

    masterService
      .getReligions()
      .then((data) =>
        setMasters((prev) => ({
          ...prev,
          religions: data || [],
        }))
      );

    masterService
      .getGenders()
      .then((data) =>
        setMasters((prev) => ({
          ...prev,
          genders: data || [],
        }))
      );
  }, []);

  // Fetch States
  useEffect(() => {
    if (!form.country_id) {
      setMasters((prev) => ({
        ...prev,
        states: [],
        cities: [],
      }));

      return;
    }

    masterService
      .getStates(Number(form.country_id))
      .then((data) =>
        setMasters((prev) => ({
          ...prev,
          states: data || [],
          cities: [],
        }))
      );

    setForm((prev) => ({
      ...prev,
      state_id: "",
      city_id: "",
    }));
  }, [form.country_id]);

  // Fetch Cities
  useEffect(() => {
    if (!form.state_id) {
      setMasters((prev) => ({
        ...prev,
        cities: [],
      }));

      return;
    }

    masterService
      .getCities(Number(form.state_id))
      .then((data) =>
        setMasters((prev) => ({
          ...prev,
          cities: data || [],
        }))
      );

    setForm((prev) => ({
      ...prev,
      city_id: "",
    }));
  }, [form.state_id]);

  // Update Form
  const update = (
    key: keyof RegisterForm,
    value: string
  ) => {
    let sanitized = value;

    if (key === "phone") {
      sanitized = value.replace(/\D/g, "");
    }

    setForm((prev) => ({
      ...prev,
      [key]: sanitized,
    }));

    if (errors[key]) {
      setErrors((prev) => ({
        ...prev,
        [key]: undefined,
      }));
    }
  };

  // Validate Step
  const validateAndNext = () => {
    let result;

    // Step 1
    if (step === 1) {
      result = registerSchema
        .pick({
          first_name: true,
          last_name: true,
          email: true,
          phone: true,
          password: true,
        })
        .safeParse({
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          phone: form.phone,
          password: form.password,
        });
    }

    // Step 2
    if (step === 2) {
      result = registerSchema
        .pick({
          gender_id: true,
          religion_id: true,
          country_id: true,
          state_id: true,
          city_id: true,
        })
        .safeParse({
          gender_id: form.gender_id,
          religion_id: form.religion_id,
          country_id: form.country_id,
          state_id: form.state_id,
          city_id: form.city_id,
        });
    }

    if (result && !result.success) {
      const fieldErrors: RegisterErrors = {};

      result.error.issues.forEach((issue) => {
        const path =
          issue.path[0] as keyof RegisterForm;

        fieldErrors[path] = issue.message;
      });

      setErrors(fieldErrors);

      return;
    }

    setErrors({});

    setStep((prev) => prev + 1);
  };

  // Submit
const handleSubmit = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  console.log("SUBMIT CLICKED");

  const result = registerSchema
    .pick({
      about: true,
    })
    .safeParse({
      about: form.about,
    });

  if (!result.success) {
    setErrors({
      about:
        result.error.issues[0]?.message,
    });

    return;
  }

  try {
    setLoading(true);

    console.log("FORM DATA =>", form);

    const success =
      await register(form);

    console.log(
      "REGISTER SUCCESS =>",
      success
    );

    if (success) {
      navigate("/dashboard");
    }
  } catch (error) {
    console.error(
      "HANDLE SUBMIT ERROR =>",
      error
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex bg-slate-50">
      
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-2/5 gradient-hero items-center justify-center p-12 bg-primary text-white">
        <div className="text-center">
          <Heart className="h-16 w-16 text-yellow-400 mx-auto mb-6 fill-yellow-400/30" />

          <h2 className="text-3xl font-bold mb-4">
            Join Vivāha
          </h2>

          <p className="text-white/80 max-w-sm mx-auto mb-8">
            Start your journey to finding the
            perfect life partner today.
          </p>

          <div className="flex justify-center gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-2 w-8 rounded-full transition-all ${
                  step >= i
                    ? "bg-white"
                    : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 p-6 lg:p-12 overflow-auto flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl bg-white p-8 rounded-3xl shadow-xl border">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 mb-8"
          >
            <Heart className="h-7 w-7 text-primary fill-primary" />

            <span className="font-display text-xl font-bold text-foreground">
              Vivāha
            </span>
          </Link>

          {/* Heading */}
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            Create Account
          </h1>

          <p className="text-muted-foreground mb-8">
            Please provide your details to
            begin your journey
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit}>

            {step === 1 && (
              <StepAccountInfo
                form={form}
                errors={errors}
                update={update}
                nextStep={validateAndNext}
              />
            )}

            {step === 2 && (
              <StepLocationInfo
                form={form}
                errors={errors}
                update={update}
                nextStep={validateAndNext}
                prevStep={() => setStep(1)}
                masters={masters}
              />
            )}

            {step === 3 && (
              <StepAboutInfo
                form={form}
                errors={errors}
                update={update}
                prevStep={() => setStep(2)}
                loading={loading}
              />
            )}
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center space-y-4">

            <p className="text-slate-600 text-sm">
              Already have an account?{" "}

              <Link
                to="/login"
                className="text-primary font-bold hover:underline"
              >
                Sign In
              </Link>
            </p>

            <div className="flex justify-center gap-4 text-[10px] text-slate-400 uppercase tracking-widest">
              <Link
                to="/terms"
                className="hover:text-primary transition-colors"
              >
                Terms
              </Link>

              <span>•</span>

              <Link
                to="/privacy"
                className="hover:text-primary transition-colors"
              >
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;