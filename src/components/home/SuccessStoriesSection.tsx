"use client";

import { useEffect, useState } from "react";
import { Heart, Star, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { masterService } from "@/services/master.service";

interface SuccessStory {
    id: number;
    groom_name: string;
    bride_name: string;
    location: string;
    description: string;
    image: string | null;
    rating?: {
        rating: number;
    } | null;
}

export const SuccessStoriesSection = () => {
    const [stories, setStories] = useState<SuccessStory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStories();
    }, []);

    const loadStories = async () => {
        try {
            const res = await masterService.getSuccessStoryRatings();

            if (res?.status) {
                setStories(res.data.items || []);
            }
        } catch (err) {
            console.error("Failed to load success stories", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-20 md:py-28 bg-card/60 backdrop-blur-xl border-t border-b border-border/60 relative z-10">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground tracking-tight">
                        Success Stories
                    </h2>
                    <p className="text-muted-foreground text-sm md:text-base">
                        Real couples who found their forever soulmate on Vivaha.
                    </p>
                </div>

                {loading ? (
                    <div className="text-center text-muted-foreground">
                        Loading success stories...
                    </div>
                ) : stories.length === 0 ? (
                    <div className="text-center text-muted-foreground">
                        No success stories available.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {stories.map((story, i) => (
                            <motion.div
                                key={story.id}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-background/90 backdrop-blur-md rounded-3xl border border-border/80 overflow-hidden shadow-lg hover:shadow-xl transition-all"
                            >
                                {story.image && (
                                    <img
                                        src={story.image}
                                        alt={`${story.groom_name} & ${story.bride_name}`}
                                        className="w-full h-56 object-cover"
                                    />
                                )}

                                <div className="p-8 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-1.5 mb-6">
                                            <Heart className="h-5 w-5 text-primary fill-primary mr-1" />

                                           {[...Array(Number(story.rating?.rating) || 5)].map((_, idx) => (
                                                <Star
                                                    key={idx}
                                                    className="h-4 w-4 text-amber-500 fill-amber-500"
                                                />
                                            ))}
                                        </div>

                                        <p className="text-sm md:text-base text-muted-foreground italic mb-8 leading-relaxed line-clamp-5">
                                            "{story.description}"
                                        </p>
                                    </div>

                                    <div className="border-t border-border/60 pt-4">
                                        <p className="font-display font-bold text-foreground text-base">
                                            {story.groom_name} & {story.bride_name}
                                        </p>

                                        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                                            <MapPin className="h-3.5 w-3.5" />
                                            {story.location}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};