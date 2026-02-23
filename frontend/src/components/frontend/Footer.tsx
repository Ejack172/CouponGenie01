import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-100 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Col 1 */}
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="flex items-center gap-2 group w-fit">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold group-hover:shadow-lg transition-shadow duration-300">
                                CG
                            </div>
                            <span className="text-xl font-bold tracking-tight text-gray-900">
                                CouponGenie
                            </span>
                        </Link>
                        <p className="text-gray-500 text-sm">
                            The best deals, floating to the top.
                        </p>
                        <p className="text-gray-400 text-xs mt-4">
                            © {new Date().getFullYear()} CouponGenie.in. All rights reserved.
                        </p>
                    </div>

                    {/* Col 2 */}
                    <div className="flex flex-col gap-3">
                        <h3 className="font-semibold text-gray-900">Explore</h3>
                        <Link href="/deals" className="text-gray-500 hover:text-blue-600 text-sm transition-colors w-fit">All Deals</Link>
                        <Link href="/stores" className="text-gray-500 hover:text-blue-600 text-sm transition-colors w-fit">Top Stores</Link>
                        <Link href="/categories" className="text-gray-500 hover:text-blue-600 text-sm transition-colors w-fit">Categories</Link>
                        <Link href="/blog" className="text-gray-500 hover:text-blue-600 text-sm transition-colors w-fit">Blog</Link>
                    </div>

                    {/* Col 3 */}
                    <div className="flex flex-col gap-3">
                        <h3 className="font-semibold text-gray-900">Legal</h3>
                        <Link href="/privacy" className="text-gray-500 hover:text-blue-600 text-sm transition-colors w-fit">Privacy Policy</Link>
                        <Link href="/terms" className="text-gray-500 hover:text-blue-600 text-sm transition-colors w-fit">Terms of Service</Link>
                        <Link href="/contact" className="text-gray-500 hover:text-blue-600 text-sm transition-colors w-fit">Contact Us</Link>
                    </div>

                    {/* Col 4 */}
                    <div className="flex flex-col gap-4">
                        <h3 className="font-semibold text-gray-900">Never miss a loot!</h3>
                        <form className="flex items-center">
                            <input
                                type="email"
                                placeholder="Enter email"
                                className="w-full bg-white border border-gray-200 rounded-l-full py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium text-gray-700 placeholder-gray-400"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 text-white rounded-r-full py-2.5 px-6 text-sm font-semibold hover:bg-blue-700 transition-colors border border-blue-600 hover:border-blue-700 shadow-sm"
                            >
                                Join
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </footer>
    );
}
