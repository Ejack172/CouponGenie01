import Navbar from '@/components/Navbar';
import HeroCarousel from '@/components/HeroCarousel';
import DealCard from '@/components/DealCard';

async function fetchDeals() {
  // Using localhost API (Ensure Express is running)
  try {
    const res = await fetch('http://localhost:4000/api/deals?limit=24', {
      next: { revalidate: 60 } // Revalidate every 60 seconds (ISR)
    });
    if (!res.ok) throw new Error('API down');
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Home() {
  const deals = await fetchDeals();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 border-t-4 border-blue-600">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroCarousel />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6 border-b border-slate-200 pb-4">
              <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                <span className="w-2 h-6 bg-blue-600 rounded-sm"></span> Let's Grab Today's Best Deals
              </h2>

              <select className="bg-white border border-slate-300 text-sm font-semibold rounded-md p-2 text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Sort by: Newest</option>
                <option>Sort by: Highest Discount</option>
                <option>Sort by: Popularity</option>
              </select>
            </div>

            {deals.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                <p className="text-slate-500 font-medium">No deals found or API server is down.</p>
                <p className="text-sm text-slate-400 mt-2">Make sure Express is running on port 4000.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {deals.map((deal: any) => (
                  <DealCard key={deal.id} deal={deal} />
                ))}
              </div>
            )}

            <div className="mt-12 text-center">
              <button className="bg-white border-2 border-blue-600 text-blue-700 font-bold px-8 py-3 rounded-full hover:bg-blue-50 transition shadow-sm hover:shadow-md">
                Load More Deals (Infinite Scroll)
              </button>
            </div>
          </div>

          {/* Sidebar Area */}
          <aside className="w-full lg:w-80 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
              <h3 className="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2">🔥 Trending Tags</h3>
              <div className="flex flex-wrap gap-2">
                {['Loot', 'Bank Offer', 'Free Delivery', 'BOGO', 'Sale', 'Limited Time'].map(tag => (
                  <span key={tag} className="bg-slate-100 hover:bg-blue-100 hover:text-blue-700 cursor-pointer text-slate-600 text-sm font-medium py-1.5 px-3 rounded-md transition">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl shadow-sm p-6 border border-blue-100 text-center">
              <h3 className="font-black text-blue-900 text-lg mb-2">Join CouponGenie Community</h3>
              <p className="text-sm text-slate-600 mb-4">Never miss a loot deal! Subscribe to our newsletter or join our Telegram channel.</p>
              <button className="w-full bg-[#0088cc] hover:bg-[#0077b5] text-white font-bold py-2.5 rounded-lg shadow-sm transition flex items-center justify-center gap-2">
                Join Telegram
              </button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
