import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-2xl font-black text-blue-700 tracking-tight">Coupon<span className="text-emerald-500">Genie</span>.in</span>
                    </Link>

                    {/* Search Bar - Hidden on Mobile */}
                    <div className="hidden md:flex flex-1 max-w-xl mx-8">
                        <div className="w-full relative">
                            <input
                                type="text"
                                placeholder="Search deals, coupons, or stores (e.g., 'iPhone 15', 'Amazon')..."
                                className="w-full bg-slate-100 rounded-full py-2.5 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                            />
                            <svg className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    {/* Nav Links */}
                    <div className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600">
                        <Link href="/categories" className="hover:text-blue-600 transition-colors">Categories</Link>
                        <Link href="/stores" className="hover:text-blue-600 transition-colors">Stores</Link>
                        <Link href="/loot-deals" className="flex items-center gap-1 text-red-500 hover:text-red-700 transition-colors">
                            🔥 Hot Deals
                        </Link>
                        <Link href="/coupons" className="hover:text-blue-600 transition-colors">Coupons</Link>
                    </div>

                    {/* Auth / Wishlist */}
                    <div className="flex items-center gap-4">
                        <button className="hidden sm:block text-slate-600 hover:text-blue-600 font-semibold text-sm">Log In</button>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-bold text-sm shadow-md transition-all hover:shadow-lg">
                            Sign Up Let's Go
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
