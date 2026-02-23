import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";

export interface DealProps {
    id: string;
    title: string;
    originalPrice: number;
    currentPrice: number;
    discountPercentage: number;
    storeName: string;
    storeLogoUrl: string;
    imageUrl: string;
    affiliateLink: string;
    expiresIn?: string;
}

export default function DealCard({ deal }: { deal: DealProps }) {
    return (
        <article className="group relative flex flex-col justify-between overflow-hidden rounded-2xl p-4 antigravity-card">
            {/* Discount Badge (Floating Top Right) */}
            <div className="absolute top-4 right-4 z-10">
                <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700 shadow-sm ring-1 ring-inset ring-red-600/10">
                    {deal.discountPercentage}% OFF
                </span>
            </div>

            <div className="flex flex-col gap-4">
                {/* Deal Image Placeholder/Store Logo Header */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center p-6">
                    <Image
                        src={deal.imageUrl}
                        alt={deal.storeName}
                        fill
                        className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                    />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1 font-medium">
                        <span className="bg-gray-100 px-2 py-0.5 rounded-md text-gray-700">{deal.storeName}</span>
                        {deal.expiresIn && (
                            <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {deal.expiresIn}
                            </span>
                        )}
                    </div>

                    <h3 className="text-base font-semibold leading-tight text-gray-900 line-clamp-2">
                        {deal.title}
                    </h3>

                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-xl font-bold tracking-tight text-gray-900">
                            ₹{deal.currentPrice.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                            ₹{deal.originalPrice.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>

            {/* CTA Button */}
            <div className="mt-5">
                <Link
                    href={deal.affiliateLink}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-200"
                >
                    Get Deal
                </Link>
            </div>
        </article>
    );
}
