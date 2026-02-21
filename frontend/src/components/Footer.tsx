'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, ArrowUp } from 'lucide-react';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-white border-t border-slate-200 pt-16 pb-8 mt-20 relative text-slate-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Top Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

                    {/* Company */}
                    <div>
                        <h3 className="text-xl font-bold text-[#007BFF] mb-4">Company</h3>
                        <ul className="space-y-3 font-medium text-sm">
                            <li><Link href="/about" className="hover:text-[#007BFF] transition-colors" aria-label="About Us">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-[#007BFF] transition-colors" aria-label="Contact Us">Contact Us</Link></li>
                            <li><Link href="/privacy" className="hover:text-[#007BFF] transition-colors" aria-label="Privacy Policy">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-[#007BFF] transition-colors" aria-label="Terms of Service">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Deals */}
                    <div>
                        <h3 className="text-xl font-bold text-[#007BFF] mb-4">Deals</h3>
                        <ul className="space-y-3 font-medium text-sm">
                            <li><Link href="/deals/hot" className="hover:text-[#007BFF] transition-colors" aria-label="Hot Deals">Hot Deals</Link></li>
                            <li><Link href="/coupons/latest" className="hover:text-[#007BFF] transition-colors" aria-label="Latest Coupons">Latest Coupons</Link></li>
                            <li><Link href="/categories/fashion" className="hover:text-[#007BFF] transition-colors" aria-label="Fashion Deals">Fashion</Link></li>
                            <li><Link href="/categories/electronics" className="hover:text-[#007BFF] transition-colors" aria-label="Electronics Deals">Electronics</Link></li>
                        </ul>
                    </div>

                    {/* Community */}
                    <div>
                        <h3 className="text-xl font-bold text-[#007BFF] mb-4">Community</h3>
                        <ul className="space-y-3 font-medium text-sm">
                            <li><Link href="/forum" className="hover:text-[#007BFF] transition-colors" aria-label="Community Forum">Forum</Link></li>
                            <li><Link href="/blog" className="hover:text-[#007BFF] transition-colors" aria-label="Read our Blog">Blog</Link></li>
                            <li><Link href="/submit-deal" className="hover:text-[#007BFF] transition-colors" aria-label="Submit a Deal">Submit a Deal</Link></li>
                        </ul>
                    </div>

                    {/* Help & Newsletter */}
                    <div>
                        <h3 className="text-xl font-bold text-[#007BFF] mb-4">Help</h3>
                        <ul className="space-y-3 font-medium text-sm mb-6">
                            <li><Link href="/faq" className="hover:text-[#007BFF] transition-colors" aria-label="Frequently Asked Questions">FAQ</Link></li>
                            <li><Link href="/affiliate" className="hover:text-[#007BFF] transition-colors" aria-label="Affiliate Program">Affiliate Program</Link></li>
                        </ul>

                        <h4 className="font-bold text-slate-800 mb-2">Subscribe to our Newsletter</h4>
                        <form className="flex flex-col sm:flex-row gap-2" onSubmit={(e) => e.preventDefault()}>
                            <label htmlFor="emailInput" className="sr-only">Email Address</label>
                            <input
                                id="emailInput"
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 bg-slate-100 border border-slate-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#007BFF] text-sm"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-[#28A745] hover:bg-[#218838] text-white font-bold py-2 px-4 rounded-md transition shadow-sm text-sm"
                                aria-label="Subscribe"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>

                </div>

                {/* Middle Section (Socials) */}
                <div className="flex justify-center flex-wrap gap-6 border-t border-slate-200 pt-8 pb-8">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className="text-slate-400 hover:text-[#007BFF] transition p-2 bg-slate-50 rounded-full hover:bg-blue-50">
                        <Twitter className="w-5 h-5" />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-slate-400 hover:text-[#007BFF] transition p-2 bg-slate-50 rounded-full hover:bg-blue-50">
                        <Facebook className="w-5 h-5" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-slate-400 hover:text-[#007BFF] transition p-2 bg-slate-50 rounded-full hover:bg-blue-50">
                        <Instagram className="w-5 h-5" />
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-slate-400 hover:text-[#007BFF] transition p-2 bg-slate-50 rounded-full hover:bg-blue-50">
                        <Youtube className="w-5 h-5" />
                    </a>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-slate-200 pt-6 flex flex-col md:flex-row justify-between items-center text-sm gap-4">
                    <p className="text-slate-500 font-medium">
                        &copy; {new Date().getFullYear()} CouponGenie.in - All Rights Reserved.
                    </p>
                    <button
                        onClick={scrollToTop}
                        className="flex items-center gap-2 group text-slate-500 hover:text-[#007BFF] transition font-semibold"
                        aria-label="Back to Top"
                    >
                        Back to Top
                        <div className="bg-slate-100 p-1.5 rounded-full group-hover:bg-blue-100 transition">
                            <ArrowUp className="w-4 h-4" />
                        </div>
                    </button>
                </div>

            </div>
        </footer>
    );
}
