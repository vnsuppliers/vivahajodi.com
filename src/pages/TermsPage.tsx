import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const TermsPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="font-display text-3xl font-bold text-foreground mb-8">Terms & Conditions</h1>
      <div className="prose prose-sm text-muted-foreground space-y-6">
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
          <p>By accessing and using Vivāha, you accept and agree to be bound by the terms and provisions of this agreement.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">2. Eligibility</h2>
          <p>You must be at least 18 years of age and legally eligible for marriage to use this service. Users must provide accurate and truthful information.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">3. User Conduct</h2>
          <p>Users agree not to use the platform for any unlawful purposes, harassment, or misrepresentation. Fake profiles will be removed immediately.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">4. Privacy</h2>
          <p>Your privacy is important to us. Please review our Privacy Policy for information on how we collect and use your data.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">5. Account Termination</h2>
          <p>We reserve the right to terminate accounts that violate our terms of service or community guidelines without prior notice.</p>
        </section>
      </div>
    </div>
    <Footer />
  </div>
);

export default TermsPage;
