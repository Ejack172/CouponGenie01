import Image from 'next/image';
import Link from 'next/link';

interface Deal {
    id: number;
    title: string;
    description: string;
    originalPrice: number;
    discountedPrice: number;
    discountPercentage: number;
    isLootDeal: boolean;
    couponCode: string;
    affiliateLink: string;
    store: { name: string; logoURL: string };
    tags: { name: string; slug: string }[];
    _count: { comments: number; wishlistedBy: number };
}

export default function DealCard({ deal }: { deal: Deal }) {
    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col relative overflow-hidden group h-full">
            {/* Loot Badge */}
            {deal.isLootDeal && (
                <div className="absolute top-4 -right-10 bg-red-500 text-white text-xs font-bold py-1 px-10 transform rotate-45 shadow-sm z-10">
                    LOOT DEAL
                </div>
            )}

            {/* Header Info */}
            <div className="p-5 pb-0 flex items-start justify-between">
                <Image
                    src={deal.store.logoURL || '/store-placeholder.png'}
                    alt={deal.store.name}
                    width={40} height={40}
                    className="rounded-lg border border-slate-200 object-cover bg-white"
                />
                <div className="flex gap-1.5 flex-wrap justify-end pl-4">
                    {deal.tags.map(t => (
                        <span key={t.slug} className={`text-xs px-2 py-1 rounded-sm font-semibold tracking-wide
              ${t.slug === 'bank-offer' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'}`}>
                            {t.name}
                        </span>
                    ))}
                </div>
            </div>

            {/* Body */}
            <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-slate-800 text-lg leading-tight mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                    <Link href={`/deal/${deal.id}`}>{deal.title}</Link>
                </h3>
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl font-black text-slate-900">₹{deal.discountedPrice}</span>
                    <span className="text-sm text-slate-400 line-through">₹{deal.originalPrice}</span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">{deal.discountPercentage}% OFF</span>
                </div>
                <p className="text-slate-500 text-sm line-clamp-2">{deal.description}</p>
            </div>

            {/* Footer */}
            <div className="mt-auto border-t border-slate-100 p-4 bg-slate-50 flex items-center justify-between">
                <div className="flex gap-3 text-slate-500 text-sm">
                    <button className="flex items-center gap-1 hover:text-emerald-600 transition">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
                        24
                    </button>
                    <Link href={`/deal/${deal.id}#comments`} className="flex items-center gap-1 hover:text-blue-600 transition">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                        {deal._count.comments}
                    </Link>
                </div>

                {deal.couponCode ? (
                    <div className="border border-blue-200 bg-blue-50 text-blue-700 font-mono font-bold px-3 py-1.5 rounded-md text-sm uppercase flex items-center gap-2">
                        {deal.couponCode}
                        <svg className="w-4 h-4 cursor-pointer hover:text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    </div>
                ) : (
                    <a href={deal.affiliateLink} target="_blank" rel="noopener noreferrer"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-4 py-2 rounded-lg transition shadow-sm hover:shadow-md">
                        Get Deal
                    </a>
                )}
            </div>
        </div>
    );
}
