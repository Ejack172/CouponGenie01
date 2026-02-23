import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Home, Tag, ShoppingBag, Folder, PenTool, LogOut } from "lucide-react";
import Link from 'next/link';

export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/api/auth/signin"); // Let NextAuth handle login for now
    }

    return (
        <div className="flex h-screen bg-slate-950 text-slate-200 font-sans antialiased overflow-hidden">

            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-800 bg-slate-950 flex flex-col justify-between hidden md:flex">
                <div>
                    {/* Logo */}
                    <div className="h-16 flex items-center px-6 border-b border-slate-800">
                        <div className="font-bold text-lg tracking-tight text-white flex items-center gap-2">
                            <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-xs">CG</div>
                            Admin
                        </div>
                    </div>

                    {/* Nav Links */}
                    <nav className="p-4 space-y-1">
                        <Link href="/admin/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-600/10 text-blue-500 font-medium">
                            <Home className="w-4 h-4" />
                            Dashboard
                        </Link>
                        <Link href="/admin/deals" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition-colors">
                            <Tag className="w-4 h-4" />
                            Manage Deals
                        </Link>
                        <Link href="/admin/stores" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition-colors">
                            <ShoppingBag className="w-4 h-4" />
                            Stores
                        </Link>
                        <Link href="/admin/categories" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition-colors">
                            <Folder className="w-4 h-4" />
                            Categories
                        </Link>
                        <Link href="/admin/blog" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition-colors">
                            <PenTool className="w-4 h-4" />
                            Blog
                        </Link>
                    </nav>
                </div>

                {/* Bottom actions */}
                <div className="p-4 border-t border-slate-800">
                    <Link href="/api/auth/signout" className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors">
                        <LogOut className="w-4 h-4" />
                        Log Out
                    </Link>
                </div>
            </aside>

            {/* Main Area */}
            <main className="flex-1 flex flex-col bg-slate-900 overflow-hidden relative">
                {children}
            </main>

        </div>
    );
}
