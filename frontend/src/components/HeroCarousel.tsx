'use client';

export default function HeroCarousel() {
    return (
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-2xl overflow-hidden shadow-xl mb-8 relative flex items-center h-64 sm:h-80">
            <div className="p-8 sm:p-12 z-10 w-full md:w-2/3">
                <span className="inline-block py-1 px-3 rounded-full bg-emerald-500 text-xs font-bold uppercase tracking-wider mb-4">
                    Great Indian Festival
                </span>
                <h2 className="text-3xl sm:text-5xl font-black mb-4 leading-tight">
                    Up to <span className="text-yellow-400">90% OFF</span> on Fashion & Electronics
                </h2>
                <p className="text-blue-100 mb-6 max-w-lg text-sm sm:text-base">
                    Exclusive loot deals verified hourly. Grab massive cashback and bank discounts using our latest verified promo codes.
                </p>
                <button className="bg-white text-blue-800 font-bold px-6 py-3 rounded-full hover:bg-blue-50 transition-colors shadow-lg">
                    Explore Live Offers
                </button>
            </div>
            {/* Decorative Blob */}
            <div className="absolute top-0 right-0 h-full w-1/2 bg-blue-500 opacity-20 transform skew-x-12 hidden md:block" />
        </div>
    );
}
