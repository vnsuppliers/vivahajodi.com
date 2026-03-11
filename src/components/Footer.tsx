import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export const Footer = () => (
  <footer className="border-t border-border bg-card py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Heart className="h-6 w-6 text-primary fill-primary" />
            <span className="font-display text-lg font-bold text-foreground">Vivāha</span>
          </div>
          <p className="text-sm text-muted-foreground">Find your perfect life partner with trust and tradition.</p>
        </div>
        <div>
          <h4 className="font-display font-semibold text-foreground mb-3">Company</h4>
          <div className="space-y-2">
            <Link to="/terms" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Terms & Conditions</Link>
            <Link to="/privacy" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold text-foreground mb-3">Quick Links</h4>
          <div className="space-y-2">
            <Link to="/register" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Register</Link>
            <Link to="/login" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Login</Link>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold text-foreground mb-3">Contact</h4>
          <p className="text-sm text-muted-foreground">support@vivaha.com</p>
          <p className="text-sm text-muted-foreground">+91 1800 123 4567</p>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">&copy; 2026 Vivāha. All rights reserved.</p>
      </div>
    </div>
  </footer>
);
