import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const PrivacyPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="font-display text-3xl font-bold text-foreground mb-8">Privacy Policy</h1>
      <div className="prose prose-sm text-muted-foreground space-y-6">
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">1. Information We Collect</h2>
          <p>We collect personal information you provide during registration including name, email, phone number, and profile details to help you find matches.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">2. How We Use Your Information</h2>
          <p>Your information is used to create your profile, suggest matches, enable communication between members, and improve our services.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">3. Data Protection</h2>
          <p>We implement industry-standard security measures to protect your personal data. Your information is encrypted and stored securely.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">4. Your Rights</h2>
          <p>You have the right to access, modify, or delete your personal information at any time through your account settings.</p>
        </section>
      </div>
    </div>
    <Footer />
  </div>
);

export default PrivacyPage;
