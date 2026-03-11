import { DashboardLayout } from "@/components/DashboardLayout";
import { ProfileCard } from "@/components/ProfileCard";
import { mockProfiles } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filters, setFilters] = useState({ gender: "", religion: "", minAge: "", maxAge: "", location: "" });

  const filtered = mockProfiles.filter((p) => {
    if (query && !p.name.toLowerCase().includes(query.toLowerCase()) && !p.location.toLowerCase().includes(query.toLowerCase())) return false;
    if (filters.gender && p.gender !== filters.gender) return false;
    if (filters.religion && p.religion !== filters.religion) return false;
    return true;
  });

  const selectClass = "rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground h-10";

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Search Profiles</h1>

        <div className="bg-card rounded-xl border border-border p-5 shadow-card space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name or location..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10" />
            </div>
            <Button variant="outline" onClick={() => setShowAdvanced(!showAdvanced)} className="gap-2">
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </Button>
          </div>

          {showAdvanced && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-border">
              <select className={selectClass} value={filters.gender} onChange={(e) => setFilters({ ...filters, gender: e.target.value })}>
                <option value="">All Genders</option><option value="Male">Male</option><option value="Female">Female</option>
              </select>
              <select className={selectClass} value={filters.religion} onChange={(e) => setFilters({ ...filters, religion: e.target.value })}>
                <option value="">All Religions</option><option>Hindu</option><option>Muslim</option><option>Christian</option><option>Sikh</option>
              </select>
              <Input placeholder="Min Age" type="number" value={filters.minAge} onChange={(e) => setFilters({ ...filters, minAge: e.target.value })} />
              <Input placeholder="Location" value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })} />
            </div>
          )}
        </div>

        <p className="text-sm text-muted-foreground">{filtered.length} profiles found</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => <ProfileCard key={p.id} profile={p} />)}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SearchPage;
