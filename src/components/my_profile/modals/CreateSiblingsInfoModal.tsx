import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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

import { Calendar } from "@/components/ui/calendar";

import { format } from "date-fns";

import {
  Check,
  ChevronsUpDown,
  Loader2,
} from "lucide-react";

import { masterService } from "@/services/master.service";

interface Props {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  handleSave: () => void;

  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;

  countries: any[];
}

const CreateSiblingsInfoModal = ({
  open,
  onClose,
  loading,
  handleSave,
  form,
  setForm,
  countries = [],
}: Props) => {

  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  const [openCountry, setOpenCountry] =
    useState(false);

  const [openState, setOpenState] =
    useState(false);

  const [openCity, setOpenCity] =
    useState(false);

  const [openElder, setOpenElder] =
    useState(false);

  // ================= RESET =================
  const handleClose = () => {
    setStates([]);
    setCities([]);

    setForm({
      name: "",
      date_of_birth: "",
      relation: "",
      is_elder: 0,

      marital_status: "",

      educational_qualification: "",
      profession: "",
      company_name: "",

      spouse_name: "",
      spouse_profession: "",

      children_count: "",

      additional_notes: "",

      country_id: "",
      state_id: "",
      city_id: "",

      status: 1,
    });

    onClose();
  };

  // ================= COUNTRY =================
  const handleCountry = async (id: string) => {
    setForm((p: any) => ({
      ...p,
      country_id: id,
      state_id: "",
      city_id: "",
    }));

    setStates([]);
    setCities([]);

    if (id) {
      const res = await masterService.getStates(
        Number(id)
      );

      setStates(res || []);
    }
  };

  // ================= STATE =================
  const handleState = async (id: string) => {
    setForm((p: any) => ({
      ...p,
      state_id: id,
      city_id: "",
    }));

    setCities([]);

    if (id) {
      const res = await masterService.getCities(
        Number(id)
      );

      setCities(res || []);
    }
  };

  // ================= LOAD STATES/CITIES =================
  useEffect(() => {
    const load = async () => {

      if (form.country_id) {
        const stateRes =
          await masterService.getStates(
            Number(form.country_id)
          );

        setStates(stateRes || []);
      }

      if (form.state_id) {
        const cityRes =
          await masterService.getCities(
            Number(form.state_id)
          );

        setCities(cityRes || []);
      }
    };

    if (open) {
      load();
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) handleClose();
      }}
    >
      <DialogContent className="max-w-5xl h-[90vh] p-0 overflow-hidden flex flex-col">

        {/* HEADER */}
        <DialogHeader className="px-6 py-4 border-b shrink-0">
          <DialogTitle>
            Create Sibling Info
          </DialogTitle>
        </DialogHeader>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto px-6 py-4">

          {/* STATUS */}
          <div className="flex justify-between items-center border rounded-xl p-4 mb-5">

            <div>
              <Label>Status</Label>

              <p className="text-sm text-muted-foreground mt-1">
                Visible / Hidden
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
              className={`w-11 h-6 flex items-center rounded-full cursor-pointer px-1 transition ${
                Number(form.status) === 1
                  ? "bg-green-500"
                  : "bg-gray-300"
              }`}
            >
              <span
                className={`w-4 h-4 bg-white rounded-full transition-transform ${
                  Number(form.status) === 1
                    ? "translate-x-5"
                    : "translate-x-0"
                }`}
              />
            </div>
          </div>

          {/* FORM */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* NAME */}
            <div>
              <Label>Sibling Name</Label>

              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((p: any) => ({
                    ...p,
                    name: e.target.value,
                  }))
                }
              />
            </div>

            {/* DOB */}
            <div>
              <Label>Date of Birth</Label>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                  >
                    {form.date_of_birth
                      ? format(
                          new Date(
                            form.date_of_birth
                          ),
                          "dd MMM yyyy"
                        )
                      : "Select DOB"}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={
                      form.date_of_birth
                        ? new Date(
                            form.date_of_birth
                          )
                        : undefined
                    }
                    onSelect={(date) => {
                      if (!date) return;

                      setForm((p: any) => ({
                        ...p,
                        date_of_birth:
                          format(
                            date,
                            "yyyy-MM-dd"
                          ),
                      }));
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* RELATION */}
            <div>
              <Label>Relation</Label>

              <Input
                placeholder="Brother / Sister"
                value={form.relation}
                onChange={(e) =>
                  setForm((p: any) => ({
                    ...p,
                    relation: e.target.value,
                  }))
                }
              />
            </div>

            {/* ELDER */}
            <div>
              <Label>
                Elder / Younger
              </Label>

              <Popover
                open={openElder}
                onOpenChange={setOpenElder}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between"
                  >
                    {form.is_elder === 1
                      ? "Elder"
                      : form.is_elder === 2
                      ? "Twins"
                      : "Younger"}

                    <ChevronsUpDown className="h-4 w-4 opacity-70" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="p-0">
                  <Command>
                    <CommandList>

                      <CommandItem
                        onSelect={() => {
                          setForm((p: any) => ({
                            ...p,
                            is_elder: 1,
                          }));

                          setOpenElder(
                            false
                          );
                        }}
                      >
                        <Check
                          className={`mr-2 h-4 w-4 ${
                            form.is_elder === 1
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        />

                        Elder
                      </CommandItem>

                      <CommandItem
                        onSelect={() => {
                          setForm((p: any) => ({
                            ...p,
                            is_elder: 0,
                          }));

                          setOpenElder(
                            false
                          );
                        }}
                      >
                        <Check
                          className={`mr-2 h-4 w-4 ${
                            form.is_elder === 0
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        />

                        Younger
                      </CommandItem>

                      <CommandItem
                        onSelect={() => {
                          setForm((p: any) => ({
                            ...p,
                            is_elder: 2,
                          }));

                          setOpenElder(
                            false
                          );
                        }}
                      >
                        <Check
                          className={`mr-2 h-4 w-4 ${
                            form.is_elder === 2
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        />

                        Twins
                      </CommandItem>

                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* MARITAL STATUS */}
            <div>
              <Label>Marital Status</Label>

              <Input
                placeholder="Single / Married"
                value={form.marital_status}
                onChange={(e) =>
                  setForm((p: any) => ({
                    ...p,
                    marital_status:
                      e.target.value,
                  }))
                }
              />
            </div>

            {/* EDUCATION */}
            <div>
              <Label>Education</Label>

              <Input
                placeholder="MBA / B.Tech"
                value={
                  form.educational_qualification
                }
                onChange={(e) =>
                  setForm((p: any) => ({
                    ...p,
                    educational_qualification:
                      e.target.value,
                  }))
                }
              />
            </div>

            {/* PROFESSION */}
            <div>
              <Label>Profession</Label>

              <Input
                placeholder="Software Engineer"
                value={form.profession}
                onChange={(e) =>
                  setForm((p: any) => ({
                    ...p,
                    profession:
                      e.target.value,
                  }))
                }
              />
            </div>

            {/* COMPANY */}
            <div>
              <Label>Company Name</Label>

              <Input
                value={form.company_name}
                onChange={(e) =>
                  setForm((p: any) => ({
                    ...p,
                    company_name:
                      e.target.value,
                  }))
                }
              />
            </div>

            {/* SPOUSE NAME */}
            <div>
              <Label>Spouse Name</Label>

              <Input
                value={form.spouse_name}
                onChange={(e) =>
                  setForm((p: any) => ({
                    ...p,
                    spouse_name:
                      e.target.value,
                  }))
                }
              />
            </div>

            {/* SPOUSE PROFESSION */}
            <div>
              <Label>
                Spouse Profession
              </Label>

              <Input
                value={
                  form.spouse_profession
                }
                onChange={(e) =>
                  setForm((p: any) => ({
                    ...p,
                    spouse_profession:
                      e.target.value,
                  }))
                }
              />
            </div>

            {/* CHILDREN */}
            <div>
              <Label>Children Count</Label>

              <Input
                value={form.children_count}
                onChange={(e) =>
                  setForm((p: any) => ({
                    ...p,
                    children_count:
                      e.target.value,
                  }))
                }
              />
            </div>

            {/* COUNTRY */}
            <div>
              <Label>Country</Label>

              <Popover
                open={openCountry}
                onOpenChange={
                  setOpenCountry
                }
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between"
                  >
                    {form.country_id
                      ? countries.find(
                          (c) =>
                            String(c.id) ===
                            String(
                              form.country_id
                            )
                        )?.name
                      : "Select Country"}

                    <ChevronsUpDown className="h-4 w-4 opacity-70" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="p-0 w-full">
                  <Command>
                    <CommandInput placeholder="Search country..." />

                    <CommandList>
                      {countries.map((c) => (
                        <CommandItem
                          key={c.id}
                          onSelect={() => {
                            handleCountry(
                              String(c.id)
                            );

                            setOpenCountry(
                              false
                            );
                          }}
                        >
                          <Check
                            className={`mr-2 h-4 w-4 ${
                              String(
                                form.country_id
                              ) ===
                              String(c.id)
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          />

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
                open={openState}
                onOpenChange={setOpenState}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between"
                    disabled={
                      !form.country_id
                    }
                  >
                    {form.state_id
                      ? states.find(
                          (s) =>
                            String(s.id) ===
                            String(
                              form.state_id
                            )
                        )?.name
                      : "Select State"}

                    <ChevronsUpDown className="h-4 w-4 opacity-70" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="p-0 w-full">
                  <Command>
                    <CommandInput placeholder="Search state..." />

                    <CommandList>
                      {states.map((s) => (
                        <CommandItem
                          key={s.id}
                          onSelect={() => {
                            handleState(
                              String(s.id)
                            );

                            setOpenState(
                              false
                            );
                          }}
                        >
                          <Check
                            className={`mr-2 h-4 w-4 ${
                              String(
                                form.state_id
                              ) ===
                              String(s.id)
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          />

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
                open={openCity}
                onOpenChange={setOpenCity}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between"
                    disabled={
                      !form.state_id
                    }
                  >
                    {form.city_id
                      ? cities.find(
                          (c) =>
                            String(c.id) ===
                            String(
                              form.city_id
                            )
                        )?.name
                      : "Select City"}

                    <ChevronsUpDown className="h-4 w-4 opacity-70" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="p-0 w-full">
                  <Command>
                    <CommandInput placeholder="Search city..." />

                    <CommandList>
                      {cities.map((c) => (
                        <CommandItem
                          key={c.id}
                          onSelect={() => {
                            setForm(
                              (p: any) => ({
                                ...p,
                                city_id:
                                  String(
                                    c.id
                                  ),
                              })
                            );

                            setOpenCity(
                              false
                            );
                          }}
                        >
                          <Check
                            className={`mr-2 h-4 w-4 ${
                              String(
                                form.city_id
                              ) ===
                              String(c.id)
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          />

                          {c.name}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* NOTES */}
            <div className="md:col-span-2">
              <Label>
                Additional Notes
              </Label>

              <Textarea
                rows={4}
                value={
                  form.additional_notes
                }
                onChange={(e) =>
                  setForm((p: any) => ({
                    ...p,
                    additional_notes:
                      e.target.value,
                  }))
                }
              />
            </div>

          </div>
        </div>

        {/* FOOTER */}
        <DialogFooter className="px-6 py-4 border-t shrink-0">
          <Button
            variant="outline"
            onClick={handleClose}
          >
            Cancel
          </Button>

          <Button
            disabled={loading}
            onClick={handleSave}
          >
            {loading && (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            )}

            Save Changes
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
};

export default CreateSiblingsInfoModal;