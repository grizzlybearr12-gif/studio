import Link from 'next/link';
import { ConciergeBell } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <ConciergeBell className="h-6 w-6 text-primary" />
            <span className="font-headline text-xl font-bold">CaterEase</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-muted-foreground mb-4 md:mb-0">
            <Link href="#" className="hover:text-primary transition-colors">About Us</Link>
            <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
          </nav>
        </div>
        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>&copy; {currentYear} CaterEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
