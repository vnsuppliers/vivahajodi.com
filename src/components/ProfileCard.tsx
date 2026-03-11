import { Link } from "react-router-dom";
import { Heart, Bookmark, MessageCircle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Profile } from "@/data/mockData";

interface ProfileCardProps {
  profile: Profile;
  compact?: boolean;
}

export const ProfileCard = ({ profile, compact }: ProfileCardProps) => (
  <div className="group bg-card rounded-lg border border-border overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300">
    <div className="relative">
      <img src={profile.avatar} alt={profile.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute top-3 right-3 flex gap-1.5">
        <button className="p-1.5 rounded-full bg-background/80 backdrop-blur-sm text-muted-foreground hover:text-primary transition-colors">
          <Heart className="h-4 w-4" />
        </button>
        <button className="p-1.5 rounded-full bg-background/80 backdrop-blur-sm text-muted-foreground hover:text-accent transition-colors">
          <Bookmark className="h-4 w-4" />
        </button>
      </div>
    </div>
    <div className="p-4">
      <h3 className="font-display font-semibold text-foreground">{profile.name}, {profile.age}</h3>
      <p className="text-sm text-muted-foreground mt-1">{profile.location}</p>
      {!compact && (
        <>
          <p className="text-sm text-muted-foreground">{profile.education} • {profile.occupation}</p>
          <p className="text-sm text-muted-foreground">{profile.religion} • {profile.height}</p>
        </>
      )}
      <div className="flex items-center gap-2 mt-3">
        <Link to={`/dashboard/profile/${profile.id}`} className="flex-1">
          <Button size="sm" variant="outline" className="w-full gap-1.5">
            <Eye className="h-3.5 w-3.5" /> View
          </Button>
        </Link>
        <Button size="sm" className="flex-1 gap-1.5">
          <MessageCircle className="h-3.5 w-3.5" /> Interest
        </Button>
      </div>
    </div>
  </div>
);
