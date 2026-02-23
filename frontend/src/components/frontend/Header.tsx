import Link from "next/link";
import { Search, Menu, User } from "lucide-react";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full glass-header">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Logo Area */}
                <div className="flex items-center gap-2">
                    <Menu className="w-5 h-5 text-gray-500 sm:hidden cursor-pointer" />
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold group-hover:shadow-lg transition-shadow duration-300">
                            CG
                        </div>
                        <span className="text-xl font-bold tracking-tight text-gray-900">
                            CouponGenie
                        </span>
                    </Link>
                </div>

                {/* Fast Search Bar */}
                <div className="hidden sm:flex flex-1 max-w-xl mx-8">
                    <div className="relative w-full group text-gray-400 focus-within:text-blue-600 transition-colors">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search deals, stores, or categories..."
                            className="block w-full pl-10 pr-3 py-2 border-0 rounded-full bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all duration-300 sm:text-sm"
                        />
                    </div>
                </div>

                {/* Right Nav */}
                <nav className="flex items-center gap-6">
                    <Link href="/stores" className="hidden md:block text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
                        Stores
                    </Link>
                    <Link href="/blog" className="hidden md:block text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
                        Blog
                    </Link>
                    <div className="h-4 w-px bg-gray-200 hidden md:block"></div>
                    <button className="sm:hidden text-gray-500 hover:text-gray-900 transition-colors">
                        <Search className="w-5 h-5" />
                    </button>
                    <Link
                        href="/admin"
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                        <User className="w-4 h-4" />
                    </Link>
                </nav>
            </div>
        </header>
    );
}
