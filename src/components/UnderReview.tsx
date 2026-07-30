import { Clock3 } from "lucide-react";

interface UnderReviewProps {
    message?: string;
}

const UnderReview = ({ message }: UnderReviewProps) => {
    return (
        <div className="w-full rounded-3xl border border-border bg-card p-12 text-center shadow-card">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 text-yellow-700">
                <Clock3 className="h-8 w-8" />
            </div>

            <h3 className="font-display text-2xl font-bold text-foreground mt-6">
                Your profile is under review
            </h3>

            <p className="text-muted-foreground mt-3 max-w-md mx-auto">
                {message ||
                    "Our team is verifying your account. This usually takes a short while — you'll be able to manage all profile sections once it's approved."}
            </p>
        </div>
    );
};

export default UnderReview;