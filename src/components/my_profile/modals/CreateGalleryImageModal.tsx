import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { CreateGalleryPayload } from '../../types/gallery';

type Props = {
    open: boolean;
    onClose: () => void;
    onCreate: (payload: CreateGalleryPayload) => void;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const CreateGalleryImageModal = ({ open, onClose, onCreate }: Props) => {
    const [url, setUrl] = useState('');
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [errorMsg, setErrorMsg] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (open) {
            setUrl('');
            setSelectedFiles([]);
            setErrorMsg('');
        }
    }, [open]);

    if (!open) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setErrorMsg('');
        if (!e.target.files) return;

        const filesArray = Array.from(e.target.files);
        const oversizedFile = filesArray.find(file => file.size > MAX_FILE_SIZE);

        if (oversizedFile) {
            setErrorMsg(`"${oversizedFile.name}" exceeds the strict 5MB size limit.`);
            return;
        }

        setSelectedFiles(filesArray);
        if (filesArray.length > 0) setUrl(''); // URL is cleared if files are picked
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');

        const hasUrl = url.trim().length > 0;
        const hasFiles = selectedFiles.length > 0;

        if (!hasUrl && !hasFiles) {
            setErrorMsg('Either an external image source URL link or file attachments are required.');
            return;
        }

        onCreate({
            image_url: hasUrl ? url.trim() : undefined,
            files: hasFiles ? selectedFiles : undefined,
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-[90%] max-w-md p-5 rounded-xl space-y-4">

                <h2 className="text-lg font-semibold">Create Gallery Entry</h2>

                {errorMsg && (
                    <div className="p-2.5 text-xs text-red-600 bg-red-50 rounded border border-red-100">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Upload Local Images
                        </label>
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className={`border border-dashed rounded p-4 text-center cursor-pointer transition-colors ${selectedFiles.length > 0 ? 'border-indigo-500 bg-indigo-50/20' : 'bg-gray-50 hover:bg-gray-100'
                                }`}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                multiple
                                className="hidden"
                            />
                            <span className="text-sm font-medium text-gray-600 block">
                                {selectedFiles.length > 0 ? `Staged ${selectedFiles.length} file(s)` : 'Click to select files (Max 5MB)'}
                            </span>
                        </div>
                    </div>

                    <div className="relative text-center my-2">
                        <span className="text-xs font-bold text-gray-400 bg-white px-2">OR</span>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Image Web Address URL
                        </label>
                        <input
                            type="url"
                            placeholder="https://example.com/image.png"
                            className="w-full border p-2 rounded text-sm outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-400"
                            value={url}
                            onChange={(e) => { setUrl(e.target.value); if (e.target.value) setSelectedFiles([]); }}
                            disabled={selectedFiles.length > 0}
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="default">
                            Save Entry
                        </Button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default CreateGalleryImageModal;