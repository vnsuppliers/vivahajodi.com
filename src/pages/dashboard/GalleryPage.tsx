import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, Eye, EyeOff, Image as ImageIcon, Sparkles, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { GalleryItem, CreateGalleryPayload } from '../../types/gallery';
import CreateGalleryImageModal from '../../components/my_profile/modals/CreateGalleryImageModal';
import ViewGalleryImageModal from '../../components/my_profile/modals/ViewGalleryImageModal';
import DeleteGalleryImageModal from '../../components/my_profile/modals/DeleteGalleryImageModal';
import { galleryService } from '@/services/galleryService';

type GalleryPageProps = {
    userId: string | number | undefined;
    profile: any;
    onRefresh?: () => void;
};

export default function GalleryPage({ userId }: GalleryPageProps) {
    const targetUserId = userId ? String(userId) : "";

    const [records, setRecords] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

    // ==========================================
    //  HANDLE FECTH GALLERY IMAGES
    // ==========================================
    const fetchGallery = useCallback(async () => {
        if (!targetUserId) return;
        try {
            setLoading(true);
            const data = await galleryService.galleryInfo(targetUserId);
            setRecords(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed loading gallery data:", error);
        } finally {
            setLoading(false);
        }
    }, [targetUserId]);

    useEffect(() => {
        if (targetUserId) fetchGallery();
    }, [targetUserId, fetchGallery]);

    // ==========================================
    //  HANDLE CREATE
    // ==========================================
    const handleCreate = async (payload: CreateGalleryPayload) => {
        if (!targetUserId) return;
        try {
            const formData = new FormData();
            if (payload.image_url) formData.append('image_url', payload.image_url);
            if (payload.files && payload.files.length > 0) {
                payload.files.forEach((file) => formData.append('gallery_images', file));
            }
            formData.append('status', '1');

            await galleryService.updateCreateGalleryInfo(targetUserId, formData);
            fetchGallery();
        } catch (error) {
            console.error("Create error:", error);
        }
    };

    // ==========================================
    //  TOGGLE VISIBILITY STATUS METHOD (0 <-> 1)
    // ==========================================
    const handleToggleVisibility = async (item: GalleryItem) => {
        if (!targetUserId) return;
        try {
            const nextStatus = item.status === 1 ? 0 : 1;

            // Directly calls the new independent status route
            await galleryService.updateGalleryStatus(targetUserId, item.id, nextStatus);
            fetchGallery();
        } catch (error) {
            console.error("Failed toggling visibility scope status:", error);
        }
    };

    // ==========================================
    //  HANDLE DELETE
    // ==========================================
    const handleDeleteConfirm = async () => {
        if (!targetUserId || !selectedItem) return;
        try {
            await galleryService.deleteGalleryInfo(targetUserId, selectedItem.id);
            fetchGallery();
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    // ==========================================
    //  HANDLE GET IMAGE
    // ==========================================
    const getResolvedSrc = (item: GalleryItem): string => {
        // Check for web link URL first
        if (item.image_url && String(item.image_url).trim().startsWith('http')) {
            return String(item.image_url).trim();
        }

        // Check for local uploaded image string file next
        if (item.gallery_images && typeof item.gallery_images === 'string' && item.gallery_images.trim().length > 0) {
            return `/api/uploads/gallery/${item.gallery_images.trim()}`;
        }

        return '';
    };

    if (!targetUserId) {
        return <div className="text-center py-10 text-sm text-muted-foreground">Awaiting user authentication...</div>;
    }

    return (
        <div className="w-full mt-8 space-y-8 animate-in fade-in duration-500">

            {/* Editorial Sub-Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-rose-100/60">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-rose-500">
                        <Sparkles size={16} />
                        <span className="text-xs font-semibold tracking-widest uppercase">Visual Portfolio</span>
                    </div>
                    <h3 className="font-serif text-3xl font-bold text-zinc-900">Portrait Gallery</h3>
                    <p className="text-sm text-zinc-500">Manage photos and privacy controls shown on your match sheet profiles.</p>
                </div>
                <Button
                    onClick={() => setIsCreateOpen(true)}
                    className="bg-gradient-to-r from-rose-500 via-pink-600 to-indigo-600 text-white px-5 py-6 rounded-xl transition-all hover:-translate-y-0.5"
                >
                    <Plus size={18} />
                    Upload Moments
                </Button>
            </div>

            {/* Gallery Grid */}
            <div>
                {loading ? (
                    <div className="text-center py-24 italic text-rose-500/80 font-serif">Curating your moments...</div>
                ) : records.length === 0 ? (
                    <div className="text-center py-24 bg-gradient-to-b from-rose-50/20 rounded-3xl border border-dashed border-rose-200/60 flex flex-col items-center p-8">
                        <ImageIcon size={36} className="text-rose-400 mb-4" />
                        <h4 className="font-serif text-xl font-medium">No photos shared yet</h4>
                        <Button variant="outline" onClick={() => setIsCreateOpen(true)} className="mt-6 border-rose-200 text-rose-600 rounded-xl px-6">
                            Upload First Photo
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {records.map((item, idx) => {
                            const currentImgSrc = getResolvedSrc(item);
                            const isHidden = item.status === 0;

                            return (
                                <div key={item.id} className="flex flex-col">
                                    {/* Image Card Frame Wrapper using exact aspect-[3/4] proportions */}
                                    <div
                                        className={`group relative aspect-[3/4] rounded-2xl overflow-hidden border bg-zinc-900 shadow-sm hover:shadow-xl transition-all duration-500 ${isHidden ? 'border-amber-200/60' : 'border-zinc-100'
                                            }`}
                                    >
                                        {/* Image layer applying direct blur effects if hidden */}
                                        <img
                                            src={currentImgSrc}
                                            alt=""
                                            className={`w-full h-full object-cover transition-all duration-700 scale-100 ${isHidden ? 'opacity-30 blur-md scale-105' : 'opacity-95'
                                                }`}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                                        {/* Dynamic Badges Container */}
                                        <div className="absolute top-3 left-3 right-3 z-20 flex justify-between items-center">
                                            <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20 text-[9px] font-bold text-white/95 uppercase tracking-widest">
                                                <Heart size={8} className="fill-rose-400 stroke-rose-400" />
                                                Photo {idx + 1}
                                            </div>

                                            {isHidden && (
                                                <span className="flex items-center gap-1 bg-amber-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full tracking-wider uppercase shadow-sm">
                                                    <EyeOff size={8} /> Private
                                                </span>
                                            )}
                                        </div>

                                        {/* DESKTOP HOVER OVERLAY BUTTON PANEL */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-rose-950/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 z-10">
                                            {/* View Fullscreen */}
                                            <button
                                                onClick={() => {
                                                    setSelectedItem(item);
                                                    setIsViewOpen(true);
                                                }}
                                                className="p-2.5 bg-white text-zinc-900 rounded-full hover:bg-rose-500 hover:text-white transition-all transform hover:scale-110 shadow-lg cursor-pointer"
                                                title="View Image"
                                            >
                                                <Eye size={16} />
                                            </button>

                                            {/* Privacy Scope State Control Button */}
                                            <button
                                                onClick={() => handleToggleVisibility(item)}
                                                className={`p-2.5 rounded-full transition-all transform hover:scale-110 shadow-lg cursor-pointer ${isHidden
                                                    ? 'bg-amber-500 text-white hover:bg-amber-600'
                                                    : 'bg-white text-zinc-900 hover:bg-zinc-700 hover:text-white'
                                                    }`}
                                                title={isHidden ? "Make Visible to Matches" : "Hide From Profile Matches"}
                                            >
                                                {isHidden ? <Eye size={16} /> : <EyeOff size={16} />}
                                            </button>

                                            {/* Delete Action Trigger Button */}
                                            <button
                                                onClick={() => { setSelectedItem(item); setIsDeleteOpen(true); }}
                                                className="p-2.5 bg-white text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all transform hover:scale-110 shadow-lg cursor-pointer"
                                                title="Remove Photo"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* MOBILE SCREEN INTERACTION STRIP: Hidden on large desktop and laptop monitors via lg:hidden */}
                                    <div className="block lg:hidden mt-3">
                                        <div className="flex items-center justify-between gap-2 px-0.5">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => { setSelectedItem(item); setIsViewOpen(true); }}
                                                className="flex-1 text-[11px] font-semibold h-8 bg-zinc-50 border-zinc-200 text-zinc-700 rounded-xl"
                                            >
                                                View
                                            </Button>

                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleToggleVisibility(item)}
                                                className={`flex-1 text-[11px] font-semibold h-8 rounded-xl ${
                                                    isHidden 
                                                    ? "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100" 
                                                    : "border-zinc-200 bg-zinc-50 text-zinc-700"
                                                }`}
                                            >
                                                {isHidden ? "Show" : "Hide"}
                                            </Button>

                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => { setSelectedItem(item); setIsDeleteOpen(true); }}
                                                className="text-red-600 border-red-100 bg-red-50/60 hover:bg-red-50 h-8 w-8 p-0 rounded-xl shrink-0"
                                            >
                                                <Trash2 size={13} />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Modals Portal Mount Blocks */}
            <CreateGalleryImageModal open={isCreateOpen} onClose={() => setIsCreateOpen(false)} onCreate={handleCreate} />
            <ViewGalleryImageModal open={isViewOpen} item={selectedItem} onClose={() => { setIsViewOpen(false); setSelectedItem(null); }} />

            <DeleteGalleryImageModal
                open={isDeleteOpen}
                imageSrc={selectedItem ? getResolvedSrc(selectedItem) : null}
                onClose={() => { setIsDeleteOpen(false); setSelectedItem(null); }}
                onConfirmDelete={handleDeleteConfirm}
            />
        </div>
    );
}