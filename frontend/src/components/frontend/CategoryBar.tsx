export default function CategoryBar() {
    const categories = [
        "All Deals",
        "Electronics",
        "Fashion",
        "Adda247",
        "Unacademy",
        "Travel",
        "Food",
        "Health & Beauty",
    ];

    return (
        <div className="w-full bg-white border-b border-gray-100 relative z-40 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex overflow-x-auto py-3 gap-2 no-scrollbar items-center">
                    {categories.map((cat, index) => (
                        <button
                            key={index}
                            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${index === 0
                                    ? "bg-gray-900 text-white shadow-md shadow-gray-200"
                                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
