import Link from 'next/link';
import { LayoutDashboard, ShoppingBag, PlusCircle, Users, Store, FileText, Settings, LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex bg-slate-100 min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col fixed shadow-xl z-20">
                <div className="p-6 border-b border-slate-800 flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center font-bold">C</div>
                    <span className="font-bold text-xl tracking-tight">Admin<span className="text-blue-500">Panel</span></span>
                </div>

                <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
                    <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Main Menu</p>
                    <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-600 text-white font-medium transition-colors">
                        <LayoutDashboard className="w-5 h-5" /> Dashboard
                    </Link>
                    <Link href="/admin/deals" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                        <ShoppingBag className="w-5 h-5" /> All Deals
                    </Link>
                    <Link href="/admin/deals/new" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                        <PlusCircle className="w-5 h-5" /> Add Deal
                    </Link>

                    <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-6">Content</p>
                    <Link href="/admin/blogs" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                        <FileText className="w-5 h-5" /> Blogs
                    </Link>
                    <Link href="/admin/stores" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                        <Store className="w-5 h-5" /> Stores
                    </Link>

                    <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-6">System</p>
                    <Link href="/admin/users" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                        <Users className="w-5 h-5" /> Users
                    </Link>
                    <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                        <Settings className="w-5 h-5" /> Settings
                    </Link>
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition">
                        <LogOut className="w-5 h-5" /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 ml-64 p-8">
                {/* Top Header */}
                <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                    <h2 className="text-lg font-bold text-slate-700">Welcome back, Admin 👋</h2>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 uppercase flex items-center justify-center font-bold text-blue-700 border-2 border-white shadow-sm ring-1 ring-slate-200">
                            AD
                        </div>
                    </div>
                </header>

                {children}
            </main>
        </div>
    );
}
