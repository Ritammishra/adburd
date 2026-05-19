"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Industries", href: "/industries" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Blog", href: "/blog" },
  { name: "About Us", href: "/about-us" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isTicking = useRef(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      lastScrollY.current = window.scrollY;

      if (!isTicking.current) {
        isTicking.current = true;

        window.requestAnimationFrame(() => {
          const nextScrolled = lastScrollY.current > 10;
          setIsScrolled((current) => (current === nextScrolled ? current : nextScrolled));
          isTicking.current = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-border py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 z-50">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xl">
            A
          </div>
          <span className="font-bold text-xl tracking-tight text-dark">
            Adburd
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-dark hover:text-primary transition-colors flex items-center gap-1"
            >
              {link.name}
              {(link.name === "Services" || link.name === "Industries") && (
                <ChevronDown className="w-4 h-4 text-muted" />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop Right */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6">
          <Link
            href="/contact-us"
            className="text-sm font-medium text-dark hover:text-primary transition-colors whitespace-nowrap"
          >
            Contact Us
          </Link>
          <Link
            href="/free-marketing-audit"
            className="bg-primary hover:bg-primary-hover text-white text-sm font-medium py-2.5 px-5 rounded-xl shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
          >
            Get Free Audit
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-dark z-50 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-0 left-0 right-0 h-screen bg-white pt-24 px-6 flex flex-col gap-6 z-40"
            >
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium text-dark py-3 border-b border-border"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-8 flex flex-col gap-4">
                <Link
                  href="/contact-us"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-3 text-dark font-medium border border-border rounded-xl"
                >
                Contact Us
                </Link>
                <Link
                  href="/free-marketing-audit"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-3 bg-primary text-white font-medium rounded-xl shadow-[0_4px_14px_0_rgba(37,99,235,0.39)]"
                >
                  Get Free Audit
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
