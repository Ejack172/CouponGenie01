import Link from 'next/link';
import { Pencil, Trash2 } from 'lucide-react';

async function fetchDeals() {
    try {
        const res = await fetch('http://localhost:4000/api/admin/deals', {
            cache: 'no-store',
            headers: { 'x-dev-mock-admin': 'true' }
        });
        if (!res.ok) throw new Error('Failed to fetch');
        const json = await res.json();
        return json.data;
    } catch (e) {
        return [];
    }
}

export default async function AdminDeals() {
    const deals = await fetchDeals();

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                <h1 className="text-xl font-bold text-slate-800">All Deals ({deals.length})</h1>
                <Link href="/admin/deals/new" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-sm transition text-sm">
                    + Add Deal
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-200 text-slate-500 text-sm uppercase tracking-wider">
                            <th className="pb-3 px-4 font-semibold">Title</th>
                            <th className="pb-3 px-4 font-semibold">Store</th>
                            <th className="pb-3 px-4 font-semibold">Category</th>
                            <th className="pb-3 px-4 font-semibold text-center">Disc. %</th>
                            <th className="pb-3 px-4 font-semibold text-center">Status</th>
                            <th className="pb-3 px-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {deals.map((deal: any) => (
                            <tr key={deal.id} className="hover:bg-slate-50 transition">
                                <td className="py-4 px-4 font-medium text-slate-800 max-w-xs truncate" title={deal.title}>
                                    {deal.title}
                                </td>
                                <td className="py-4 px-4 text-slate-600">
                                    {deal.store?.name}
                                </td>
                                <td className="py-4 px-4 text-slate-600">
                                    {deal.category?.name}
                                </td>
                                <td className="py-4 px-4 text-center font-bold text-emerald-600">
                                    {deal.discountPercentage}%
                                </td>
                                <td className="py-4 px-4 text-center">
                                    <span className={`text-xs px-2 py-1 rounded-full font-bold uppercase ${deal.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' :
                                            deal.status === 'PENDING' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                        {deal.status}
                                    </span>
                                </td>
                                <td className="py-4 px-4 text-right flex items-center justify-end gap-3">
                                    <Link href={`/admin/deals/${deal.id}`} className="text-blue-600 hover:text-blue-800 transition">
                                        <Pencil className="w-4 h-4" />
                                    </Link>
                                    <button className="text-red-500 hover:text-red-700 transition" aria-label="Delete">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
