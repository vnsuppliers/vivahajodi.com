import React, { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Check,
  ChevronsUpDown,
  Loader2,
  GraduationCap,
  Award,
  Power,
  Activity,
} from "lucide-react";

import { masterService } from "@/services/master.service";

const EducationFormModal = ({
  open,
  onClose,
  loading,
  handleSave,

  form,
  setForm,

  educations,
  countries,

  title,
  buttonText,
}: any) => {
  const [specialisations, setSpecialisations] =
    useState<any[]>([]);

  const [states, setStates] = useState<any[]>([]);

  const [cities, setCities] = useState<any[]>([]);

  const [educationOpen, setEducationOpen] =
    useState(false);

  const [specialisationOpen, setSpecialisationOpen] =
    useState(false);

  const [countryOpen, setCountryOpen] =
    useState(false);

  const [stateOpen, setStateOpen] =
    useState(false);

  const [cityOpen, setCityOpen] =
    useState(false);

  const [eduStatusOpen, setEduStatusOpen] =
    useState(false);

  const eduStatusMap: any = {
    1: "Completed",
    2: "Pursuing",
    3: "Dropped",
  };

  useEffect(() => {
    if (!form.education_id) return;
    masterService
      .getSpecialisations(Number(form.education_id))
      .then((res) => setSpecialisations(res || []));
  }, [form.education_id, open]);

  useEffect(() => {
    if (!form.country_id) return;

    masterService
      .getStates(Number(form.country_id))
      .then((res) => {
        setStates(res || []);
      });
  }, [form.country_id]);

  useEffect(() => {
    if (!form.state_id) return;

    masterService
      .getCities(Number(form.state_id))
      .then((res) => {
        setCities(res || []);
      });
  }, [form.state_id]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="p-0 gap-0 w-full h-dvh max-h-dvh sm:h-auto sm:max-h-[90vh] sm:w-[95vw] sm:max-w-5xl flex flex-col overflow-hidden">

        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6">

          {/* STATUS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

            {/* EDUCATION STATUS */}
            <div className="border rounded-xl p-3">
              <Label className="text-xs">
                Academic Status
              </Label>

              <Popover
                open={eduStatusOpen}
                onOpenChange={setEduStatusOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between mt-2"
                  >
                    {form.education_info_status
                      ? eduStatusMap[
                          Number(
                            form.education_info_status
                          )
                        ]
                      : "Select"}

                    <ChevronsUpDown className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="p-0 w-[300px]">
                  <Command>
                    <CommandInput placeholder="Search status..." />
                    <CommandList className="max-h-60 overflow-y-auto">
                      {Object.entries(eduStatusMap).map(([val, label]) => (
                        <CommandItem
                          key={val}
                          onSelect={() => {
                            setForm((p: any) => ({
                              ...p,
                              education_info_status: String(val),
                            }));
                            setEduStatusOpen(false);
                          }}
                        >
                          <Check
                            className={`mr-2 h-4 w-4 ${
                              Number(form.education_info_status) === Number(val)
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          />
                          {String(label)}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* STATUS */}
            <div className="border rounded-xl p-3 flex items-center justify-between">
              <div>
                <Label className="text-xs">
                  Visible to Others
                </Label>

                <p className="text-sm mt-1">
                  {Number(form.status) === 1
                    ? "Active"
                    : "Inactive"}
                </p>
              </div>

              <div
                onClick={() =>
                  setForm((p: any) => ({
                    ...p,
                    status:
                      Number(p.status) === 1
                        ? 0
                        : 1,
                  }))
                }
                className={`relative flex h-6 w-11 items-center rounded-full cursor-pointer px-[2px] ${
                  Number(form.status) === 1
                    ? "bg-green-500"
                    : "bg-slate-300"
                }`}
              >
                <span
                  className={`h-5 w-5 rounded-full bg-white transition-transform ${
                    Number(form.status) === 1
                      ? "translate-x-5"
                      : "translate-x-0"
                  }`}
                />
              </div>
            </div>

            {/* HIGHEST */}
            <div className="border rounded-xl p-3 flex items-center justify-between">
              <div>
                <Label className="text-xs">
                  Highest Education
                </Label>

                <p className="text-sm mt-1">
                  {form.is_highest_education
                    ? "Yes"
                    : "No"}
                </p>
              </div>

              <div
                onClick={() =>
                  setForm((p: any) => ({
                    ...p,
                    is_highest_education:
                      !p.is_highest_education,
                  }))
                }
                className={`relative flex h-6 w-11 items-center rounded-full cursor-pointer px-[2px] ${
                  form.is_highest_education
                    ? "bg-primary"
                    : "bg-slate-300"
                }`}
              >
                <span
                  className={`h-5 w-5 rounded-full bg-white transition-transform ${
                    form.is_highest_education
                      ? "translate-x-5"
                      : "translate-x-0"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* EDUCATION */}
            <div>
              <Label>Education</Label>

              <Popover
                open={educationOpen}
                onOpenChange={setEducationOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between"
                  >
                    {form.education_id
                      ? educations.find(
                          (e: any) =>
                            String(e.id) ===
                            form.education_id
                        )?.name
                      : "Select"}

                    <ChevronsUpDown className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="p-0 w-[300px]">
                  <Command>
                    <CommandInput placeholder="Search education..." />
                    <CommandList className="max-h-60 overflow-y-auto">
                      {educations.map((edu: any) => (
                        <CommandItem
                          key={edu.id}
                          onSelect={() => {
                            setForm((p: any) => ({
                              ...p,
                              education_id: String(edu.id),
                              specialisation_id: "",
                            }));
                            setEducationOpen(false);
                          }}
                        >
                          {edu.name}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* SPECIALISATION */}
            <div>
              <Label>Specialisation</Label>

              <Popover
                open={specialisationOpen}
                onOpenChange={
                  setSpecialisationOpen
                }
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between"
                  >
                    {form.specialisation_id
                      ? specialisations.find(
                          (s: any) =>
                            String(s.id) ===
                            form.specialisation_id
                        )?.name
                      : "Select"}

                    <ChevronsUpDown className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="p-0 w-[300px]">
                  <Command>
                    <CommandInput placeholder="Search specialisation..." />
                    <CommandList className="max-h-60 overflow-y-auto">
                      {specialisations.map((s: any) => (
                        <CommandItem
                          key={s.id}
                          onSelect={() => {
                            setForm((p: any) => ({
                              ...p,
                              specialisation_id: String(s.id),
                            }));
                            setSpecialisationOpen(false);
                          }}
                        >
                          {s.name}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* COLLEGE */}
            <div>
              <Label>College</Label>

              <Input
                value={form.college_name}
                onChange={(e) =>
                  setForm((p: any) => ({
                    ...p,
                    college_name:
                      e.target.value,
                  }))
                }
              />
            </div>

            {/* UNIVERSITY */}
            <div>
              <Label>University</Label>

              <Input
                value={form.university_name}
                onChange={(e) =>
                  setForm((p: any) => ({
                    ...p,
                    university_name:
                      e.target.value,
                  }))
                }
              />
            </div>

            {/* COUNTRY */}
            <div>
              <Label>Country</Label>

              <Popover
                open={countryOpen}
                onOpenChange={setCountryOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between"
                  >
                    {form.country_id
                      ? countries.find(
                          (c: any) =>
                            String(c.id) ===
                            form.country_id
                        )?.name
                      : "Select"}

                    <ChevronsUpDown className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="p-0 w-[300px]">
                  <Command>
                    <CommandInput placeholder="Search country..." />
                    <CommandList className="max-h-60 overflow-y-auto">
                      {countries.map((c: any) => (
                        <CommandItem
                          key={c.id}
                          onSelect={() => {
                            setForm((p: any) => ({
                              ...p,
                              country_id: String(c.id),
                              state_id: "",
                              city_id: "",
                            }));
                            setCountryOpen(false);
                          }}
                        >
                          {c.name}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* STATE */}
            <div>
              <Label>State</Label>

              <Popover
                open={stateOpen}
                onOpenChange={setStateOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between"
                  >
                    {form.state_id
                      ? states.find(
                          (s: any) =>
                            String(s.id) ===
                            form.state_id
                        )?.name
                      : "Select"}

                    <ChevronsUpDown className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="p-0 w-[300px]">
                  <Command>
                    <CommandInput placeholder="Search state..." />
                    <CommandList className="max-h-60 overflow-y-auto">
                      {states.map((s: any) => (
                        <CommandItem
                          key={s.id}
                          onSelect={() => {
                            setForm((p: any) => ({
                              ...p,
                              state_id: String(s.id),
                              city_id: "",
                            }));
                            setStateOpen(false);
                          }}
                        >
                          {s.name}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* CITY */}
            <div>
              <Label>City</Label>

              <Popover
                open={cityOpen}
                onOpenChange={setCityOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between"
                  >
                    {form.city_id
                      ? cities.find(
                          (c: any) =>
                            String(c.id) ===
                            form.city_id
                        )?.name
                      : "Select"}

                    <ChevronsUpDown className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="p-0 w-[300px]">
                  <Command>
                    <CommandInput placeholder="Search city..." />
                    <CommandList className="max-h-60 overflow-y-auto">
                      {cities.map((c: any) => (
                        <CommandItem
                          key={c.id}
                          onSelect={() => {
                            setForm((p: any) => ({
                              ...p,
                              city_id: String(c.id),
                            }));
                            setCityOpen(false);
                          }}
                        >
                          {c.name}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* YEAR */}
            <div>
              <Label>Passing Year</Label>

              <Input
                type="number"
                value={form.passing_year}
                onChange={(e) =>
                  setForm((p: any) => ({
                    ...p,
                    passing_year:
                      e.target.value,
                  }))
                }
              />
            </div>

            {/* ADDRESS */}
            <div className="col-span-full">
              <Label>Address</Label>

              <Textarea
                value={form.education_address}
                onChange={(e) =>
                  setForm((p: any) => ({
                    ...p,
                    education_address:
                      e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </div>

        <DialogFooter className="border-t px-6 py-4">
          <Button
            variant="ghost"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            disabled={loading}
          >
            {loading && (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            )}

            {buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EducationFormModal;