'use client';

import { useForm } from 'react-form';
import { useState, useEffect } from 'react';
import { useForm as useRHForm } from 'react-hook-form'; // Note: React-Hook-Form

export default function NewDealForm() {
    const { register, handleSubmit, formState: { errors } } = useRHForm();
    const [stores, setStores] = useState([]);
    const [categories, setCategories] = useState([]);
    const [msg, setMsg] = useState('');

    // Hydrate form dependencies
    useEffect(() => {
        fetch('http://localhost:4000/api/stores').then(res => res.json()).then(data => setStores(data.data || []));
        fetch('http://localhost:4000/api/categories').then(res => res.json()).then(data => setCategories(data.data || []));
    }, []);

    const onSubmit = async (data: any) => {
        try {
            // Mock logic calculating % internally if needed, but passing raw
            data.isLootDeal = data.isLootDeal === "true";
            const res = await fetch('http://localhost:4000/api/admin/deals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-dev-mock-admin': 'true', // Local dev bypass
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error('Failed to create deal.');
            setMsg('Deal published successfully!');
        } catch (err) {
            setMsg('Error saving deal.');
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 max-w-4xl mx-auto">
            <h1 className="text-2xl font-black text-slate-800 mb-6">Create New Deal</h1>

            {msg && <div className="mb-4 bg-emerald-100 text-emerald-800 p-3 rounded-lg font-bold">{msg}</div>}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* Core Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Title *</label>
                        <input
                            {...register('title', { required: true })}
                            className="w-full bg-slate-50 border border-slate-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. iPhone 15 Pro Max at Lowest Price"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Affiliate Link</label>
                        <input
                            {...register('affiliateLink')}
                            className="w-full bg-slate-50 border border-slate-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                            placeholder="https://affiliate..."
                        />
                    </div>
                </div>

                {/* Pricing */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Original ₹</label>
                        <input type="number" {...register('originalPrice')} className="w-full bg-white border border-slate-300 rounded-md px-4 py-2 text-sm focus:ring-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Discounted ₹</label>
                        <input type="number" {...register('discountedPrice')} className="w-full bg-white border border-slate-300 rounded-md px-4 py-2 text-sm focus:ring-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Discount %</label>
                        <input type="number" {...register('discountPercentage')} className="w-full bg-white border border-slate-300 rounded-md px-4 py-2 text-sm focus:ring-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Coupon Code</label>
                        <input {...register('couponCode')} className="w-full font-mono bg-white border border-slate-300 rounded-md px-4 py-2 text-sm focus:ring-2 text-blue-700 uppercase" placeholder="SAVE10" />
                    </div>
                </div>

                {/* Dropdowns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Store Selection</label>
                        <select {...register('storeId')} className="w-full bg-white border border-slate-300 rounded-md px-4 py-2 text-sm">
                            {stores.map((s: any) => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Category</label>
                        <select {...register('categoryId')} className="w-full bg-white border border-slate-300 rounded-md px-4 py-2 text-sm">
                            {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Is Loot Deal?</label>
                        <select {...register('isLootDeal')} className="w-full bg-white border border-slate-300 rounded-md px-4 py-2 text-sm font-bold text-red-600">
                            <option value="false">No (Normal Deal)</option>
                            <option value="true">Yes (Loot Deal)</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Marketing Description</label>
                    <textarea {...register('description')} rows={4} className="w-full bg-slate-50 border border-slate-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500" placeholder="Describe the offer..."></textarea>
                </div>

                <div className="flex gap-4 border-t border-slate-100 pt-6">
                    <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg shadow-sm transition">
                        Publish Deal Instantly
                    </button>
                    <button type="button" className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-3 px-8 rounded-lg transition text-sm">
                        Save as Draft
                    </button>
                </div>
            </form>
        </div>
    );
}
