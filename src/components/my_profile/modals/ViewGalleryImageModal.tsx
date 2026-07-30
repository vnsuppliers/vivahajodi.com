import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { GalleryItem } from '../../../types/gallery';

type Props = {
    open: boolean;
    item: GalleryItem | null;
    onClose: () => void;
};

const ViewGalleryImageModal = ({ open, item, onClose }: Props) => {
    const [hasError, setHasError] = useState(false);

    if (!open || !item) return null;

    const getResolvedSrc = (): string => {
        if (item.image_url && String(item.image_url).trim().startsWith('http')) {
            return String(item.image_url).trim();
        }
        if (item.gallery_images && typeof item.gallery_images === 'string' && item.gallery_images.trim().length > 0) {
            return `/api/uploads/gallery/${item.gallery_images.trim()}`;
        }
        return '';
    };

    const targetSrc = getResolvedSrc();

    return (
        <div
            className="fixed inset-0 bg-black/95 flex flex-col justify-between p-6 z-50 animate-in fade-in duration-200 cursor-zoom-out"
            onClick={() => { setHasError(false); onClose(); }}
        >
            <div className="flex justify-between items-center w-full">
                <span className="font-serif text-sm italic tracking-wide text-zinc-400">
                    Portfolio View
                </span>
                <button
                    onClick={() => { setHasError(false); onClose(); }}
                    className="text-white bg-white/10 p-2.5 rounded-full hover:bg-white/20 transition-all duration-200 transform hover:scale-105"
                >
                    <X size={20} />
                </button>
            </div>

            <div
                className="flex-grow flex items-center justify-center overflow-hidden w-full max-w-4xl mx-auto p-2 sm:p-6 cursor-default"
                onClick={(e) => e.stopPropagation()}
            >
                {targetSrc && !hasError ? (
                    <img
                        src={targetSrc}
                        alt="Matrimony premium portrait visualization"
                        className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-2xl shadow-2xl border border-white/5 animate-in zoom-in-95 duration-300"
                        onError={() => setHasError(true)}
                    />
                ) : (
                    <div className="flex flex-col items-center gap-3 text-center p-6 bg-zinc-900 rounded-2xl border border-zinc-800 max-w-md">
                        <AlertCircle className="text-amber-500" size={32} />
                        <h4 className="font-serif text-lg font-medium text-zinc-200">External Preview Blocked</h4>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                            This domain hosting provider blocks direct link viewing (hotlinking protection). Download the image directly and use the local upload option instead.
                        </p>
                    </div>
                )}
            </div>

            <div className="w-full text-center py-2 text-zinc-500 text-xs font-serif italic tracking-wider">
                Tap anywhere outside the frame to close review window
            </div>
        </div>
    );
};

export default ViewGalleryImageModal;