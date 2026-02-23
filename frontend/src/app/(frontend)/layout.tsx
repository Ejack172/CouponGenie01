import { Inter } from "next/font/google";
import Header from "@/components/frontend/Header";
import CategoryBar from "@/components/frontend/CategoryBar";
import Footer from "@/components/frontend/Footer";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export default function FrontendLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={`${inter.variable} antialiased min-h-screen bg-gray-50/30 flex flex-col`}>
            <Header />
            <CategoryBar />
            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                {children}
            </main>

            <Footer />
        </div>
    );
}
