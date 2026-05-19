import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xl">
                A
              </div>
              <span className="font-bold text-xl tracking-tight text-dark">
                Adburd
              </span>
            </Link>
            <p className="text-muted mb-8 max-w-sm">
              We are a premium digital marketing agency dedicated to driving revenue and growth for serious businesses.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Subscribe to our newsletter"
                className="bg-light border border-border rounded-xl px-4 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <button
                type="submit"
                className="bg-dark hover:bg-black text-white p-2.5 rounded-xl transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="font-semibold text-dark mb-5">Services</h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/services/seo-services" className="text-muted hover:text-primary text-sm transition-colors">SEO Services</Link></li>
              <li><Link href="/services/ppc-management-services" className="text-muted hover:text-primary text-sm transition-colors">PPC Management</Link></li>
              <li><Link href="/services/social-media-marketing" className="text-muted hover:text-primary text-sm transition-colors">Social Media</Link></li>
              <li><Link href="/services/website-design-development" className="text-muted hover:text-primary text-sm transition-colors">Web Development</Link></li>
              <li><Link href="/services/branding-graphic-design" className="text-muted hover:text-primary text-sm transition-colors">Branding & Design</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-dark mb-5">Industries</h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/industries/healthcare-digital-marketing" className="text-muted hover:text-primary text-sm transition-colors">Healthcare</Link></li>
              <li><Link href="/industries/real-estate-marketing" className="text-muted hover:text-primary text-sm transition-colors">Real Estate</Link></li>
              <li><Link href="/industries/local-business-marketing" className="text-muted hover:text-primary text-sm transition-colors">Local Businesses</Link></li>
              <li><Link href="/case-studies" className="text-muted hover:text-primary text-sm transition-colors">Case Studies</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-dark mb-5">Company</h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/about-us" className="text-muted hover:text-primary text-sm transition-colors">About Us</Link></li>
              <li><Link href="/why-adburd" className="text-muted hover:text-primary text-sm transition-colors">Why Adburd</Link></li>
              <li><Link href="/our-process" className="text-muted hover:text-primary text-sm transition-colors">Our Process</Link></li>
              <li><Link href="/blog" className="text-muted hover:text-primary text-sm transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-dark mb-5">Contact</h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/contact-us" className="text-muted hover:text-primary text-sm transition-colors">Contact Us</Link></li>
              <li><Link href="/free-marketing-audit" className="text-muted hover:text-primary text-sm transition-colors">Get Free Audit</Link></li>
              <li className="mt-4">
                <a href="mailto:hello@adburd.com" className="text-dark font-medium text-sm hover:text-primary transition-colors">
                  hello@adburd.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Adburd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm text-muted hover:text-dark transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-sm text-muted hover:text-dark transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
