import { Activity, ShoppingBag, Users as UsersIcon, FileText, CheckCircle, Store } from 'lucide-react';
import Link from 'next/link';

// NOTE: Fetching from the Express backend in an actual scenario requires passing the JWT Bearer token in headers. 
// For this Admin Panel preview, we will fetch directly from our new admin endpoint but handle errors gracefully if unauthorized.
async function fetchAdminStats() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    try {
        const res = await fetch(`${API_URL}/api/admin/dashboard`, {
            cache: 'no-store',
            // headers: { Authorization: `Bearer ${ADMIN_TOKEN}` } // In a real flow, get token from cookies
        });
        if (!res.ok) throw new Error('Unauthorized or API Down');
        const json = await res.json();
        return json.data;
    } catch (e) {
        // Failing gracefully to render preview dummy data if JWT is missing
        return {
            dealsCount: 50,
            activeUsers: 3,
            pendingDeals: 3,
            blogsCount: 0,
            storesCount: 10,
            topDeals: [
                { id: 1, title: 'iPhone 15 Pro Max at Lowest Price', viewsCount: 1200, status: 'APPROVED' },
                { id: 2, title: 'Sony WH-1000XM5 Headphones Offer', viewsCount: 950, status: 'APPROVED' },
                { id: 4, title: 'Samsung 55 inch 4K Smart TV', viewsCount: 890, status: 'PENDING' },
            ]
        };
    }
}

export default async function AdminDashboard() {
    const stats = await fetchAdminStats();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-black text-slate-800 tracking-tight">System Overview</h1>
                <div className="flex gap-4">
                    <Link href="/admin/deals/new" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-sm transition">
                        + New Deal
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="bg-blue-100 p-4 rounded-xl text-blue-600">
                        <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-500">Total Deals</p>
                        <p className="text-3xl font-black text-slate-800">{stats.dealsCount}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="bg-emerald-100 p-4 rounded-xl text-emerald-600">
                        <UsersIcon className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-500">Active Users</p>
                        <p className="text-3xl font-black text-slate-800">{stats.activeUsers}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="bg-amber-100 p-4 rounded-xl text-amber-600">
                        <Activity className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-500">Pending Approvals</p>
                        <p className="text-3xl font-black text-slate-800">{stats.pendingDeals}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="bg-purple-100 p-4 rounded-xl text-purple-600">
                        <Store className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-500">Total Stores</p>
                        <p className="text-3xl font-black text-slate-800">{stats.storesCount}</p>
                    </div>
                </div>
            </div>

            {/* Charts & Tables Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

                {/* Most Viewed Deals */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                    <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-emerald-500" /> Most Viewed Deals
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-200 text-slate-500 text-sm">
                                    <th className="pb-3 font-semibold">Deal Title</th>
                                    <th className="pb-3 font-semibold text-center">Views</th>
                                    <th className="pb-3 font-semibold text-center">Status</th>
                                    <th className="pb-3 font-semibold text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.topDeals.map((deal: any) => (
                                    <tr key={deal.id} className="border-b border-slate-100 hover:bg-slate-50">
                                        <td className="py-4 font-medium text-slate-800 pr-4">{deal.title}</td>
                                        <td className="py-4 text-center font-bold text-slate-600">{deal.viewsCount}</td>
                                        <td className="py-4 text-center">
                                            <span className={`text-xs px-2 py-1 rounded-full font-bold ${deal.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                                {deal.status}
                                            </span>
                                        </td>
                                        <td className="py-4 text-right">
                                            <Link href={`/admin/deals/${deal.id}`} className="text-blue-600 hover:underline font-semibold text-sm">Edit</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-2xl shadow-sm border border-blue-500 p-6 text-white flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-bold mb-2 flex items-center gap-2"><FileText className="w-5 h-5" /> Quick Actions</h2>
                        <p className="text-blue-100 text-sm mb-6">Create content and verify community deals rapidly.</p>

                        <ul className="space-y-3">
                            <li><button className="w-full bg-white/10 hover:bg-white/20 font-semibold px-4 py-3 rounded-xl transition text-left flex justify-between">Review Submissions <span className="bg-red-500 px-2 rounded-full text-xs flex items-center">{stats.pendingDeals}</span></button></li>
                            <li><Link href="/admin/blogs/new" className="w-full bg-white/10 hover:bg-white/20 font-semibold px-4 py-3 rounded-xl transition text-left flex justify-between block">Write New Blog Post</Link></li>
                            <li><button className="w-full bg-white/10 hover:bg-white/20 font-semibold px-4 py-3 rounded-xl transition text-left flex justify-between">Manage Users</button></li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    );
}
