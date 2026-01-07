"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Utensils, LogIn } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const NavLinks = () => (
  <>
    <Button variant="link" asChild>
      <Link href="/#search">Find Caterers</Link>
    </Button>
    <Button variant="link" asChild>
      <Link href="/register-provider">
        Become a Partner
      </Link>
    </Button>
  </>
);


export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 mr-auto">
          <Utensils className="h-7 w-7 text-primary" />
          <span className="font-headline text-2xl font-bold">CaterEase</span>
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-4 text-lg">
          <NavLinks />
        </nav>

        <div className="hidden md:flex items-center gap-2 ml-4">
          <Button variant="outline" asChild>
            <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Link>
          </Button>
        </div>

        <div className="md:hidden ml-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 py-8">
                  <Link href="/" className="flex items-center gap-2 mb-4">
                      <Utensils className="h-7 w-7 text-primary" />
                      <span className="font-headline text-xl font-bold">CaterEase</span>
                  </Link>
                  <nav className="flex flex-col gap-4">
                      <NavLinks/>
                  </nav>
                  <div className="mt-4 pt-4 border-t">
                      <Button variant="outline" className="w-full" asChild>
                          <Link href="/login">
                              <LogIn className="mr-2 h-4 w-4" />
                              Login
                          </Link>
                      </Button>
                  </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
