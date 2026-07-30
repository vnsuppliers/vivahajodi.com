"use client";

import { useEffect, useState } from "react";
import { Image as ImageIcon, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { familyInfoService } from "../../services/galleryService";
import { GalleryItem } from "../../types/gallery";
import ViewGalleryImageModal from "../my_profile/modals/ViewGalleryImageModal";

type Props = {
  profile: any;
};

export default function ProfileGalleryTab({ profile }: Props) {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal tracking states
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const fetchMemberGallery = async () => {
      if (!profile?.user?.id) return;
      try {
        setLoading(true);
        const res = await familyInfoService.getMemberGalleryImages(String(profile.user.id));
        setImages(Array.isArray(res) ? res : []);
      } catch (err) {
        console.error("Failed loading member gallery scope images array:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberGallery();
  }, [profile]);

  const getResolvedSrc = (item: GalleryItem): string => {
    if (item.image_url && String(item.image_url).trim().startsWith("http")) {
      return String(item.image_url).trim();
    }
    if (item.gallery_images && typeof item.gallery_images === "string" && item.gallery_images.trim().length > 0) {
      return `/api/uploads/gallery/${item.gallery_images.trim()}`;
    }
    return "";
  };

  const handleOpenViewModal = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsViewOpen(true);
  };

  if (loading) {
    return (
      <div className="text-center py-24 font-serif text-sm italic text-rose-500/80 animate-pulse">
        Curating viewable moments...
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-24 bg-gradient-to-b from-rose-50/20 rounded-3xl border border-dashed border-rose-200/60 flex flex-col items-center p-8">
        <ImageIcon size={36} className="text-rose-400 mb-4" />
        <h4 className="font-serif text-xl font-medium text-zinc-800">No photos shared yet</h4>
        <p className="text-sm text-zinc-500 mt-1 max-w-xs">
          This user has no visible public portrait assets linked to their portfolio display profile.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* 
        FIXED GRID BREAKPOINTS: 
        grid-cols-1 ensures single full-width layout images stack cleanly on mobile viewports.
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((item) => {
          const currentImgSrc = getResolvedSrc(item);
          if (!currentImgSrc) return null;

          return (
            <div key={item.id} className="flex flex-col">
              {/* Premium Uniform Portrait Frame */}
              <div
                className="group relative w-full aspect-[3/4] overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-900 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                <img
                  src={currentImgSrc}
                  alt=""
                  className="w-full h-full object-cover opacity-95 transition-opacity duration-300"
                  loading="lazy"
                />

                {/* Visual Bottom Fade Layer */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* DESKTOP/LAPTOP HOVER OVERLAY: Appears seamlessly when mouse rolls over the card */}
                <div className="absolute inset-0 bg-black/40 hidden sm:flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-auto">
                  <button
                    onClick={() => handleOpenViewModal(item)}
                    className="p-3 bg-white text-zinc-900 rounded-full hover:bg-rose-500 hover:text-white transition-all transform hover:scale-110 shadow-lg cursor-pointer flex items-center justify-center"
                    title="View Fullscreen"
                  >
                    <Eye size={18} className="stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* MOBILE INTERACTION STRIP: Hidden on larger breakpoint systems via `sm:hidden` */}
              <div className="block sm:hidden mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenViewModal(item)}
                  className="w-full text-[11px] font-semibold h-8 bg-zinc-50 border-zinc-200 text-zinc-700 rounded-xl shadow-2xs"
                >
                  View Image
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Embedded High-End Portrait View Modal Gate */}
      <ViewGalleryImageModal
        open={isViewOpen}
        item={selectedItem}
        onClose={() => {
          setIsViewOpen(false);
          setSelectedItem(null);
        }}
      />
    </>
  );
}