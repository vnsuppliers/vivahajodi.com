"use client";

import React from "react";
import { X, Calendar } from "lucide-react";
import { GalleryItem } from "@/types/gallery";

type Props = {
    open: boolean;
    item: GalleryItem | null;
    onClose: () => void;
};

export default function ViewGalleryImageModal({ open, item, onClose }: Props) {
    if (!open || !item) return null;

    // Resolve the image source URL identically to the main gallery tab views
    const getResolvedSrc = (galleryItem: GalleryItem): string => {
        if (galleryItem.image_url && String(galleryItem.image_url).trim().startsWith("http")) {
            return String(galleryItem.image_url).trim();
        }
        if (galleryItem.gallery_images && typeof galleryItem.gallery_images === "string" && galleryItem.gallery_images.trim().length > 0) {
            return `/api/uploads/gallery/${galleryItem.gallery_images.trim()}`;
        }
        return "";
    };

    const currentImgSrc = getResolvedSrc(item);

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-card border border-border rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">

                {/* Modal Header Actions Panel */}
                <div className="p-4 border-b border-border flex justify-between items-center bg-background/50 backdrop-blur-xs">
                    <h4 className="font-serif font-bold text-sm text-foreground">View Portfolio Image</h4>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors cursor-pointer"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Modal Body: Custom Maintained Image Frame Aspect Box */}
                <div className="p-5 overflow-y-auto space-y-4">

                    {/* Maintained precise matching aspect portrait layout block frame */}
                    <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl border border-zinc-200/60 bg-zinc-950 shadow-sm">
                        {currentImgSrc ? (
                            <img
                                src={currentImgSrc}
                                alt="Enlarged Portfolio View"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground text-xs font-medium bg-muted/40">
                                Failed to extract picture resource source parameters...
                            </div>
                        )}
                    </div>

                    {/* Asset Metadata Footer Block */}
                    {item.created_at && (
                        <div className="flex items-center gap-1.5 justify-center text-[11px] font-medium text-muted-foreground pt-1">
                            <Calendar size={12} className="text-muted-foreground/80" />
                            <span>Uploaded on: {new Date(item.created_at).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</span>
                        </div>
                    )}

                </div>

            </div>
        </div>
    );
}