import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { ChevronsUpDown, Check, Loader2 } from "lucide-react";
import { masterService } from "@/services/master.service";

interface Props {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  handleSave: () => void;
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  professions: any[];
  countries: any[];
}

const CreateProfessionModal = ({
  open, onClose, loading, handleSave,
  form, setForm,
  professions = [],
  countries = [],  
}: Props) => {

  //  All dropdown data is LOCAL — safe to reset on close
  const [designations, setDesignations] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  const [openProf, setOpenProf] = useState(false);
  const [openDes, setOpenDes] = useState(false);
  const [openCountry, setOpenCountry] = useState(false);
  const [openState, setOpenState] = useState(false);
  const [openCity, setOpenCity] = useState(false);

  const handleClose = () => {
    //  Safe — only resets local state, table is unaffected
    setDesignations([]);
    setStates([]);
    setCities([]);
    setForm({
      profession_id: "", designation_id: "", company_name: "",
      experience: "", income: "", country_id: "", state_id: "",
      city_id: "", location: "", description: "", status: 1,
    });
    onClose();
  };

  const handleProfession = async (id: string) => {
    setForm((p: any) => ({ ...p, profession_id: id, designation_id: "" }));
    setDesignations([]);
    if (id) {
      const res = await masterService.getDesignationMaster(Number(id));
      setDesignations(res || []);
    }
  };

  const handleCountry = async (id: string) => {
    setForm((p: any) => ({ ...p, country_id: id, state_id: "", city_id: "" }));
    setStates([]);
    setCities([]);
    if (id) {
      const res = await masterService.getStates(Number(id));
      setStates(res || []);
    }
  };

  const handleState = async (id: string) => {
    setForm((p: any) => ({ ...p, state_id: id, city_id: "" }));
    setCities([]);
    if (id) {
      const res = await masterService.getCities(Number(id));
      setCities(res || []);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); }}>
      <DialogContent className="max-w-4xl h-[90vh] p-0 overflow-hidden flex flex-col">
        <DialogHeader className="px-6 py-4 border-b shrink-0">
          <DialogTitle>Create Profession Info</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">

          {/* STATUS */}
          <div className="flex justify-between items-center border rounded-xl p-4 mb-5">
            <div>
              <Label>Status</Label>
              <p className="text-sm text-muted-foreground mt-1">Active / Inactive</p>
            </div>
            <div
              onClick={() => setForm((p: any) => ({ ...p, status: Number(p.status) === 1 ? 0 : 1 }))}
              className={`w-11 h-6 flex items-center rounded-full cursor-pointer px-1 transition ${Number(form.status) === 1 ? "bg-green-500" : "bg-gray-300"}`}
            >
              <span className={`w-4 h-4 bg-white rounded-full transition-transform ${Number(form.status) === 1 ? "translate-x-5" : "translate-x-0"}`} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* PROFESSION */}
            <div>
              <Label>Profession</Label>
              <Popover open={openProf} onOpenChange={setOpenProf}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {form.profession_id
                      ? professions.find((p) => String(p.id) === String(form.profession_id))?.profession_name
                      : "Select Profession"}
                    <ChevronsUpDown className="h-4 w-4 opacity-70" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-full">
                  <Command>
                    <CommandInput placeholder="Search profession..." />
                    <CommandList>
                      {professions.map((p) => (
                        <CommandItem key={p.id} onSelect={() => { handleProfession(String(p.id)); setOpenProf(false); }}>
                          <Check className={`mr-2 h-4 w-4 ${String(form.profession_id) === String(p.id) ? "opacity-100" : "opacity-0"}`} />
                          {p.profession_name}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* DESIGNATION */}
            <div>
              <Label>Designation</Label>
              <Popover open={openDes} onOpenChange={setOpenDes}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between" disabled={!form.profession_id}>
                    {form.designation_id
                      ? designations.find((d) => String(d.id) === String(form.designation_id))?.designation_name
                      : "Select Designation"}
                    <ChevronsUpDown className="h-4 w-4 opacity-70" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-full">
                  <Command>
                    <CommandInput placeholder="Search designation..." />
                    <CommandList>
                      {designations.map((d) => (
                        <CommandItem key={d.id} onSelect={() => { setForm((p: any) => ({ ...p, designation_id: String(d.id) })); setOpenDes(false); }}>
                          <Check className={`mr-2 h-4 w-4 ${String(form.designation_id) === String(d.id) ? "opacity-100" : "opacity-0"}`} />
                          {d.designation_name}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* COMPANY */}
            <div>
              <Label>Company Name</Label>
              <Input value={form.company_name} onChange={(e) => setForm((p: any) => ({ ...p, company_name: e.target.value }))} />
            </div>

            {/* EXPERIENCE */}
            <div>
              <Label>Experience</Label>
              <Input value={form.experience} onChange={(e) => setForm((p: any) => ({ ...p, experience: e.target.value }))} />
            </div>

            {/* INCOME */}
            <div>
              <Label>Income</Label>
              <Input value={form.income} onChange={(e) => setForm((p: any) => ({ ...p, income: e.target.value }))} />
            </div>

            {/* COUNTRY */}
            <div>
              <Label>Country</Label>
              <Popover open={openCountry} onOpenChange={setOpenCountry}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {form.country_id
                      ? countries.find((c) => String(c.id) === String(form.country_id))?.name
                      : "Select Country"}
                    <ChevronsUpDown className="h-4 w-4 opacity-70" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-full">
                  <Command>
                    <CommandInput placeholder="Search country..." />
                    <CommandList>
                      {countries.map((c) => (
                        <CommandItem key={c.id} onSelect={() => { handleCountry(String(c.id)); setOpenCountry(false); }}>
                          <Check className={`mr-2 h-4 w-4 ${String(form.country_id) === String(c.id) ? "opacity-100" : "opacity-0"}`} />
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
              <Popover open={openState} onOpenChange={setOpenState}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between" disabled={!form.country_id}>
                    {form.state_id
                      ? states.find((s) => String(s.id) === String(form.state_id))?.name
                      : "Select State"}
                    <ChevronsUpDown className="h-4 w-4 opacity-70" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-full">
                  <Command>
                    <CommandInput placeholder="Search state..." />
                    <CommandList>
                      {states.map((s) => (
                        <CommandItem key={s.id} onSelect={() => { handleState(String(s.id)); setOpenState(false); }}>
                          <Check className={`mr-2 h-4 w-4 ${String(form.state_id) === String(s.id) ? "opacity-100" : "opacity-0"}`} />
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
              <Popover open={openCity} onOpenChange={setOpenCity}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between" disabled={!form.state_id}>
                    {form.city_id
                      ? cities.find((c) => String(c.id) === String(form.city_id))?.name
                      : "Select City"}
                    <ChevronsUpDown className="h-4 w-4 opacity-70" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-full">
                  <Command>
                    <CommandInput placeholder="Search city..." />
                    <CommandList>
                      {cities.map((c) => (
                        <CommandItem key={c.id} onSelect={() => { setForm((p: any) => ({ ...p, city_id: String(c.id) })); setOpenCity(false); }}>
                          <Check className={`mr-2 h-4 w-4 ${String(form.city_id) === String(c.id) ? "opacity-100" : "opacity-0"}`} />
                          {c.name}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* LOCATION */}
            <div className="md:col-span-2">
              <Label>Location</Label>
              <Textarea rows={3} value={form.location} onChange={(e) => setForm((p: any) => ({ ...p, location: e.target.value }))} />
            </div>

            {/* DESCRIPTION */}
            <div className="md:col-span-2">
              <Label>Description</Label>
              <Textarea rows={4} value={form.description} onChange={(e) => setForm((p: any) => ({ ...p, description: e.target.value }))} />
            </div>

          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t shrink-0">
          <Button variant="outline" onClick={handleClose}>Cancel</Button>
          <Button disabled={loading} onClick={handleSave}>
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProfessionModal;