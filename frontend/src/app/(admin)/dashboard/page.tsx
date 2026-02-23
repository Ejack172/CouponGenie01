import { ChevronRight, Plus, MoreVertical } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    return (
        <div className="h-full flex flex-col">
            {/* Top Bar */}
            <header className="h-16 flex items-center justify-between px-8 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10 w-full">
                <div className="flex items-center gap-4">
                    <h1 className="font-semibold text-lg text-white">Hello, Admin</h1>
                    <div className="h-4 w-px bg-slate-700"></div>
                    <div className="flex items-center space-x-2 text-sm text-slate-400">
                        <span>Dashboard</span>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-slate-200">Overview</span>
                    </div>
                </div>

                <Link
                    href="/admin/deals/new"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-blue-500"
                >
                    <Plus className="w-4 h-4" />
                    Add New Deal
                </Link>
            </header>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-auto p-8">

                {/* Placeholder Card */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl max-w-5xl">
                    <div className="px-6 py-5 border-b border-slate-800 flex justify-between items-center">
                        <h2 className="font-medium text-slate-200">Recent Deals</h2>
                    </div>

                    <div className="p-0">
                        <table className="w-full text-left text-sm text-slate-400">
                            <thead className="text-xs uppercase bg-slate-900/50 border-b border-slate-800">
                                <tr>
                                    <th className="px-6 py-3 font-medium">Title</th>
                                    <th className="px-6 py-3 font-medium">Price</th>
                                    <th className="px-6 py-3 font-medium">Store</th>
                                    <th className="px-6 py-3 font-medium">Status</th>
                                    <th className="px-6 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { title: "Smartwatch 20% Off", price: "$149.99", store: "Amazon", status: "Active", statusColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
                                    { title: "Noise-Canceling Headphones", price: "$229.00", store: "Best Buy", status: "Pending", statusColor: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
                                    { title: "Fashion Sneakers", price: "$89.99", store: "Flipkart", status: "Expired", statusColor: "text-red-400 bg-red-400/10 border-red-400/20" },
                                ].map((item, idx) => (
                                    <tr key={idx} className="border-b border-slate-800 last:border-0 hover:bg-slate-900/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-200">{item.title}</td>
                                        <td className="px-6 py-4">{item.price}</td>
                                        <td className="px-6 py-4">{item.store}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1.5 rounded-md text-xs border font-medium ${item.statusColor}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-slate-500 hover:text-slate-300 transition-colors p-1 rounded-md hover:bg-slate-800">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
