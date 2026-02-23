import DealCard, { DealProps } from "@/components/frontend/DealCard";

// Mock Data
const dummyDeals: DealProps[] = [
    {
        id: "1",
        title: "Apple iPhone 15 Pro Max (256GB) - Natural Titanium",
        originalPrice: 159900,
        currentPrice: 148900,
        discountPercentage: 7,
        storeName: "Amazon",
        storeLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        imageUrl: "https://m.media-amazon.com/images/I/81Os1SDWpcL._SX679_.jpg",
        affiliateLink: "#",
        expiresIn: "Ending soon",
    },
    {
        id: "2",
        title: "Adda247 Maha Pack - Bank Exams preparation bundle",
        originalPrice: 14999,
        currentPrice: 3499,
        discountPercentage: 76,
        storeName: "Adda247",
        storeLogoUrl: "/images/adda-logo.png",
        imageUrl: "https://www.adda247.com/jobs/wp-content/uploads/2023/12/30122934/Adda247-logo.png",
        affiliateLink: "#",
        expiresIn: "Today only",
    },
    {
        id: "3",
        title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
        originalPrice: 34990,
        currentPrice: 26990,
        discountPercentage: 23,
        storeName: "Flipkart",
        storeLogoUrl: "https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo.png",
        imageUrl: "https://m.media-amazon.com/images/I/51aXvjzcukL._SX522_.jpg",
        affiliateLink: "#",
    },
    {
        id: "4",
        title: "Unacademy Plus Subscription - UPSC CSE 1 Year",
        originalPrice: 74999,
        currentPrice: 48749,
        discountPercentage: 35,
        storeName: "Unacademy",
        storeLogoUrl: "/images/unacademy-logo.png",
        imageUrl: "https://static.uacdn.net/production/_next/static/images/logo.svg?q=75&w=256",
        affiliateLink: "#",
        expiresIn: "2 days left"
    },
    {
        id: "5",
        title: "Nike Air Force 1 '07 Men's Sneakers",
        originalPrice: 8495,
        currentPrice: 5946,
        discountPercentage: 30,
        storeName: "Myntra",
        storeLogoUrl: "/images/myntra.png",
        imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-shoes-WrLlWX.png",
        affiliateLink: "#",
    },
    {
        id: "6",
        title: "Samsung 108 cm (43 inches) Crystal iQ Series 4K Ultra HD Smart LED TV",
        originalPrice: 52900,
        currentPrice: 28990,
        discountPercentage: 45,
        storeName: "Amazon",
        storeLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        imageUrl: "https://m.media-amazon.com/images/I/81I2c-kH9wL._SX679_.jpg",
        affiliateLink: "#",
    }
];

export default function Home() {
    return (
        <div className="flex flex-col gap-8">
            {/* Hero / Page Title */}
            <div className="flex flex-col gap-2 pt-4">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    Today's Top Deals
                </h1>
                <p className="text-lg text-gray-500">
                    Handpicked offers and absolute loots from your favorite stores.
                </p>
            </div>

            {/* Grid Layout for Deal Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {dummyDeals.map((deal) => (
                    <DealCard key={deal.id} deal={deal} />
                ))}
            </div>

            {/* Load More section */}
            <div className="flex justify-center mt-8 pb-12">
                <button className="rounded-full bg-white px-8 py-3 text-sm font-medium text-gray-900 ring-1 ring-inset ring-gray-200 hover:bg-gray-50 transition-colors shadow-sm">
                    Load More Deals
                </button>
            </div>
        </div>
    );
}
