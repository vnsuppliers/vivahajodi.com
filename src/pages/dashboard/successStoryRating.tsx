import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { Loader2, Star, Upload, X, Heart, Calendar, MapPin, User, FileText, CheckCircle, Clock, Sparkles, AlertTriangle, Trash2 } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatusMessage, UserStatusType } from "@/components/StatusMessage";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format, parseISO } from "date-fns";
import { successStoryService } from "@/services/success_story_ratings.service";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface SuccessStoryFormValues {
    groom_name: string;
    bride_name: string;
    location: string;
    description: string;
}

interface ExistingStoryData {
    success_story: {
        groom_name: string;
        bride_name: string;
        marriage_date: string;
        location: string;
        description: string;
        image?: string;
        status: number;
        decline_reason?: string;
    } | null;
    rating: {
        rating: number;
        status: number;
    } | null;
}

export default function SuccessStoryRatingPage() {
    const { user } = useAuth();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [existingData, setExistingData] = useState<ExistingStoryData | null>(null);

    const [userStatus, setUserStatus] = useState<number | string>(1);
    const [statusMessage, setStatusMessage] = useState<string>("");

    // Start with 0 so no stars are yellow by default
    const [rating, setRating] = useState<number>(0);
    const [hoverRating, setHoverRating] = useState<number>(0);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // Marriage Date Dropdown Popover helper states
    const [marriageDate, setMarriageDate] = useState<string>("");
    const [isDobOpen, setIsDobOpen] = useState(false);
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 60 }, (_, i) => currentYear - i);
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const [calendarMonth, setCalendarMonth] = useState<Date>(new Date(currentYear - 2, 0, 1));

    const [formData, setFormData] = useState<SuccessStoryFormValues>({
        groom_name: "",
        bride_name: "",
        location: "",
        description: "",
    });

    const [errors, setErrors] = useState<Partial<Record<keyof SuccessStoryFormValues, string>>>({});

    const identifier = user?.id;

    useEffect(() => {
        const fetchExistingStory = async () => {
            if (!identifier) return;
            try {
                setIsFetching(true);
                const response = await successStoryService.getSuccessStory(identifier);
                if (response?.status) {
                    setExistingData(response.data);
                }
                setUserStatus(1);
            } catch (err: any) {
                console.error("Failed to fetch success story", err);
                const backendMessage = err?.response?.data?.message || "";
                const errorCode = err?.response?.data?.errorCode || "";
                const status = err?.response?.status;
                setStatusMessage(backendMessage);

                if (status === 402 || status === 426) {
                    setUserStatus(5);
                } else if (status === 403) {
                    if (errorCode === "BLOCKED") setUserStatus("BLOCKED");
                    else if (errorCode === "UNDER_REVIEW") setUserStatus(0);
                    else if (errorCode === "DEACTIVATED") setUserStatus(3);
                    else if (errorCode === "SUSPENDED") setUserStatus(2);
                    else setUserStatus(0);
                } else if (status === 401) {
                    setUserStatus(4);
                } else {
                    setUserStatus(1);
                }
            } finally {
                setIsFetching(false);
            }
        };

        fetchExistingStory();
    }, [identifier]);

    const parseDob = (dobStr: string): Date => {
        const [year, month, day] = dobStr.split("-").map(Number);
        return new Date(year, month - 1, day);
    };

    // Formatter to render date as dd/MM/yyyy (dmY format)
    const formatDisplayDate = (dateStr?: string) => {
        if (!dateStr) return "";
        try {
            const parsed = dateStr.includes("T") ? parseISO(dateStr) : parseDob(dateStr);
            return format(parsed, "dd-MM-yyyy");
        } catch {
            return dateStr;
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof SuccessStoryFormValues]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                toast.error("Please upload a valid image file");
                return;
            }
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setImagePreview(null);
        setSelectedFile(null);
    };

    const validateForm = () => {
        const newErrors: Partial<Record<keyof SuccessStoryFormValues, string>> = {};
        if (!formData.groom_name.trim()) newErrors.groom_name = "Groom's name is required";
        if (!formData.bride_name.trim()) newErrors.bride_name = "Bride's name is required";
        if (!marriageDate) newErrors.marriage_date = "Marriage date is required";
        if (!formData.location.trim()) newErrors.location = "Location is required";
        if (!formData.description.trim()) newErrors.description = "Description is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;

        if (rating === 0) {
            toast.error("Please select a star rating before submitting");
            return;
        }

        if (!identifier) {
            toast.error("User session not found. Please log in again.");
            return;
        }

        try {
            setIsLoading(true);
            const data = new FormData();
            data.append("groom_name", formData.groom_name);
            data.append("bride_name", formData.bride_name);
            data.append("marriage_date", marriageDate);
            data.append("location", formData.location);
            data.append("description", formData.description);
            data.append("rating", rating.toString());

            if (selectedFile) {
                data.append("image", selectedFile);
            }

            const response = await successStoryService.createSuccessStory(identifier, data);

            if (response?.status) {
                toast.success(response.message || "Success story submitted successfully!");
                setExistingData(response.data);
            } else {
                toast.error(response?.message || "Failed to submit success story.");
            }
        } catch (error: any) {
            const errorMsg = error?.response?.data?.message || error.message || "Something went wrong!";
            toast.error(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    const hasStory = existingData?.success_story !== null && existingData?.success_story !== undefined;
    const storyStatus = existingData?.success_story?.status;

    return (
        <DashboardLayout>
            <div className="space-y-6 max-w-5xl mx-auto pb-16">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Success Story & Rating</h1>
                    {userStatus === 1 && (
                        <p className="text-sm text-muted-foreground mt-1">
                            Celebrate your special union and inspire our matchmaking community.
                        </p>
                    )}
                </div>

                {userStatus !== 1 ? (
                    <StatusMessage status={userStatus as UserStatusType} message={statusMessage} />
                ) : isFetching ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-3 bg-card rounded-2xl border border-border shadow-sm">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="text-sm text-muted-foreground font-medium animate-pulse">Loading your success story details...</p>
                    </div>
                ) : hasStory && storyStatus !== 2 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative overflow-hidden rounded-3xl border border-border/80 shadow-2xl bg-card"
                    >
                        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
                        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative bg-gradient-to-r from-primary/15 via-rose-500/10 to-pink-500/15 p-6 sm:p-8 border-b border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary border border-primary/30 shadow-inner">
                                    <Heart className="w-6 h-6 fill-primary animate-pulse" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold uppercase tracking-wider text-primary">Vivaha Milestone</span>
                                        <Sparkles className="w-3.5 h-3.5 text-primary" />
                                    </div>
                                    <h3 className="text-2xl font-display font-extrabold text-foreground tracking-tight">
                                        {existingData?.success_story?.groom_name} & {existingData?.success_story?.bride_name}
                                    </h3>
                                </div>
                            </div>
                            <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide w-fit shadow-sm ${storyStatus === 1
                                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                                    : "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                                }`}>
                                {storyStatus === 1 ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                                {storyStatus === 1 ? "Approved & Published" : "Pending Admin Approval"}
                            </span>
                        </div>

                        <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            {existingData?.success_story?.image && (
                                <div className="lg:col-span-5 relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-rose-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
                                    <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border-2 border-border shadow-lg bg-background">
                                        <img
                                            src={`${existingData.success_story.image}`}
                                            alt="Happy Couple Wedding"
                                            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                                            <div className="text-white text-xs font-medium flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                                                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" /> Forever Journey Started
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className={`${existingData?.success_story?.image ? "lg:col-span-7" : "lg:col-span-12"} space-y-6`}>
                                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground font-medium bg-muted/40 p-4 rounded-2xl border border-border/50">
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 rounded-xl bg-primary/10 text-primary">
                                            <Calendar className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <span className="block text-[10px] uppercase font-bold text-muted-foreground">Marriage Date (dd/MM/yyyy)</span>
                                            <span className="text-foreground font-semibold">
                                                {formatDisplayDate(existingData?.success_story?.marriage_date)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="h-8 w-px bg-border/80 hidden sm:block"></div>
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 rounded-xl bg-primary/10 text-primary">
                                            <MapPin className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <span className="block text-[10px] uppercase font-bold text-muted-foreground">Location</span>
                                            <span className="text-foreground font-semibold">{existingData?.success_story?.location}</span>
                                        </div>
                                    </div>
                                </div>

                                {(existingData?.rating || rating > 0) && (
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-amber-500/10 p-5 rounded-2xl border border-amber-500/30">
                                        <div>
                                            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-1">Community Rating Experience</span>
                                            <div className="flex items-center gap-1.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-5 h-5 ${i < (existingData?.rating?.rating || rating)
                                                                ? "fill-amber-400 text-amber-400 drop-shadow-sm"
                                                                : "text-muted-foreground/30"
                                                            }`}
                                                    />
                                                ))}
                                                <span className="ml-2 text-sm font-bold text-amber-700 dark:text-amber-300">
                                                    {existingData?.rating?.rating || rating} / 5 Stars
                                                </span>
                                            </div>
                                        </div>
                                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-200 w-fit">
                                            ⭐️ Verified Feedback
                                        </span>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">Our Journey & Story</span>
                                    <blockquote className="relative p-5 rounded-2xl bg-gradient-to-br from-background to-muted/50 border border-border/80 text-foreground text-sm sm:text-base leading-relaxed italic shadow-sm">
                                        <span className="absolute top-2 left-3 text-4xl text-primary/20 font-serif leading-none">“</span>
                                        <p className="relative z-10 pl-3">{existingData?.success_story?.description}</p>
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-card rounded-3xl shadow-xl border border-border/80 overflow-hidden p-6 sm:p-10 space-y-6"
                    >
                        {storyStatus === 2 && (
                            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5 space-y-2">
                                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold">
                                    <AlertTriangle className="w-5 h-5" />
                                    <span>Your previous submission was declined</span>
                                </div>
                                {existingData?.success_story?.decline_reason && (
                                    <p className="text-sm text-foreground/80 pl-7">
                                        <strong>Reason:</strong> {existingData.success_story.decline_reason}
                                    </p>
                                )}
                                <p className="text-xs text-muted-foreground pl-7 pt-1">
                                    Please update your details and re-submit your success story below.
                                </p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="groom_name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                                        <User className="w-3.5 h-3.5 text-primary" /> Groom's Name
                                    </label>
                                    <input
                                        type="text"
                                        id="groom_name"
                                        name="groom_name"
                                        value={formData.groom_name}
                                        onChange={handleInputChange}
                                        placeholder="Enter groom's full name"
                                        className="w-full h-11 px-4 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground text-sm"
                                    />
                                    {errors.groom_name && <p className="text-xs text-rose-500 font-medium">{errors.groom_name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="bride_name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                                        <User className="w-3.5 h-3.5 text-primary" /> Bride's Name
                                    </label>
                                    <input
                                        type="text"
                                        id="bride_name"
                                        name="bride_name"
                                        value={formData.bride_name}
                                        onChange={handleInputChange}
                                        placeholder="Enter bride's full name"
                                        className="w-full h-11 px-4 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground text-sm"
                                    />
                                    {errors.bride_name && <p className="text-xs text-rose-500 font-medium">{errors.bride_name}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5 text-primary" /> Marriage Date
                                    </label>
                                    <Popover open={isDobOpen} onOpenChange={setIsDobOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-full justify-start h-11 px-4 rounded-xl bg-background border border-border font-normal text-sm text-foreground"
                                            >
                                                {marriageDate
                                                    ? formatDisplayDate(marriageDate)
                                                    : "Select marriage date"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-3" align="start">
                                            <div className="flex items-center justify-between gap-2 mb-3 px-1">
                                                <Select
                                                    value={String(calendarMonth.getMonth())}
                                                    onValueChange={(m) => {
                                                        const newDate = new Date(calendarMonth);
                                                        newDate.setMonth(Number(m));
                                                        setCalendarMonth(newDate);
                                                    }}
                                                >
                                                    <SelectTrigger className="h-8 w-[130px] text-xs">
                                                        <SelectValue placeholder="Month" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {months.map((monthName, idx) => (
                                                            <SelectItem key={idx} value={String(idx)}>
                                                                {monthName}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>

                                                <Select
                                                    value={String(calendarMonth.getFullYear())}
                                                    onValueChange={(y) => {
                                                        const newDate = new Date(calendarMonth);
                                                        newDate.setFullYear(Number(y));
                                                        setCalendarMonth(newDate);
                                                    }}
                                                >
                                                    <SelectTrigger className="h-8 w-[100px] text-xs">
                                                        <SelectValue placeholder="Year" />
                                                    </SelectTrigger>
                                                    <SelectContent className="max-h-60">
                                                        {years.map((yr) => (
                                                            <SelectItem key={yr} value={String(yr)}>
                                                                {yr}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <CalendarComponent
                                                mode="single"
                                                month={calendarMonth}
                                                onMonthChange={setCalendarMonth}
                                                selected={marriageDate ? parseDob(marriageDate) : undefined}
                                                onSelect={(date) => {
                                                    if (!date) return;
                                                    setMarriageDate(format(date, "yyyy-MM-dd"));
                                                    setIsDobOpen(false);
                                                }}
                                                className="rounded-md border"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    {errors.marriage_date && <p className="text-xs text-rose-500 font-medium">{errors.marriage_date}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="location" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                                        <MapPin className="w-3.5 h-3.5 text-primary" /> Wedding Location
                                    </label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Hyderabad, India"
                                        className="w-full h-11 px-4 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground text-sm"
                                    />
                                    {errors.location && <p className="text-xs text-rose-500 font-medium">{errors.location}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                                    <Upload className="w-3.5 h-3.5 text-primary" /> Couple / Wedding Photo
                                </label>
                                {!imagePreview ? (
                                    <label className="border-2 border-dashed border-border hover:border-primary rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all bg-background group">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform">
                                            <Upload className="w-5 h-5" />
                                        </div>
                                        <p className="text-sm font-semibold text-foreground">Click to upload wedding photo</p>
                                        <p className="text-xs text-muted-foreground mt-1">PNG, JPG or WEBP (Max 5MB)</p>
                                        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                    </label>
                                ) : (
                                    <div className="relative w-full h-56 rounded-2xl overflow-hidden border border-border shadow-sm">
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute top-3 right-3 p-2 bg-background/80 hover:bg-background text-foreground rounded-full backdrop-blur-md transition-colors border border-border"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="description" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                                    <FileText className="w-3.5 h-3.5 text-primary" /> Your Journey & Story
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={4}
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Tell us how you met through Vivaha..."
                                    className="w-full p-4 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground text-sm resize-none"
                                />
                                {errors.description && <p className="text-xs text-rose-500 font-medium">{errors.description}</p>}
                            </div>

                            <div className="pt-4 border-t border-border flex flex-col items-center justify-center space-y-3">
                                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    Rate Your Experience With Us
                                </span>
                                <div className="flex items-center gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            type="button"
                                            key={star}
                                            className="p-1 focus:outline-none transition-transform hover:scale-125"
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                        >
                                            <Star
                                                className={`w-8 h-8 transition-colors ${(hoverRating || rating) >= star
                                                        ? "fill-amber-400 text-amber-400 drop-shadow-sm"
                                                        : "text-muted-foreground/30"
                                                    }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                                <span className="text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                                    {rating === 0 ? "Please select a rating" : `${rating} out of 5 Stars`}
                                </span>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-12 bg-gradient-to-r from-primary to-rose-600 hover:opacity-95 text-primary-foreground font-bold rounded-2xl shadow-lg shadow-primary/25 transition-all text-sm"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin mr-2" /> Submitting Story...
                                    </>
                                ) : (
                                    "Submit Success Story & Rating"
                                )}
                            </Button>
                        </form>
                    </motion.div>
                )}
            </div>
        </DashboardLayout>
    );
}