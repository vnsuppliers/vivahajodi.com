import React from 'react';
import { Button } from "@/components/ui/button";

type Props = {
    open: boolean;
    imageSrc: string | null;
    onClose: () => void;
    onConfirmDelete: () => void;
};

const DeleteGalleryImageModal = ({ open, imageSrc, onClose, onConfirmDelete }: Props) => {
    if (!open || !imageSrc) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-150">
            <div className="bg-white w-[90%] max-w-sm p-6 rounded-2xl space-y-4 shadow-xl text-center">
                
                {/* Visual Header */}
                <h2 className="text-lg font-serif font-bold text-zinc-900">
                    Remove Photo
                </h2>
                
                {/* Visual Image Thumbnail Preview */}
                <div className="relative aspect-[3/4] w-28 mx-auto rounded-xl overflow-hidden shadow-md border border-zinc-100 bg-zinc-50">
                    <img 
                        src={imageSrc} 
                        alt="Preview to delete" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1594322436404-5a0526db4d13?auto=format&fit=crop&w=800&q=80';
                        }}
                    />
                </div>

                {/* Romantic/Soft Warning Context */}
                <p className="text-sm text-zinc-500 leading-relaxed px-2">
                    Are you sure you want to remove this photograph from your visual portfolio? Prospective matches will no longer see this moment.
                </p>

                {/* Premium Action Buttons Panel */}
                <div className="flex items-center justify-center gap-3 pt-2">
                    <Button 
                        variant="outline" 
                        onClick={onClose}
                        className="w-1/2 rounded-xl border-zinc-200 text-zinc-700 hover:bg-zinc-50 py-5"
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant="destructive" 
                        onClick={() => {
                            onConfirmDelete();
                            onClose();
                        }}
                        className="w-1/2 rounded-xl bg-red-600 hover:bg-red-700 text-white py-5 shadow-sm shadow-red-100"
                    >
                        Remove
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default DeleteGalleryImageModal;