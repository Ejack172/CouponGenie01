const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
    console.log('Seeding Expanded Database...');

    // 1. Seed Users (Admin + Normal Users)
    const passwordHash = await bcrypt.hash('password123', 10);

    const admin = await prisma.user.upsert({
        where: { email: 'admin@coupongenie.in' },
        update: {},
        create: {
            username: 'admin',
            email: 'admin@coupongenie.in',
            passwordHash,
            role: 'ADMIN',
            avatarURL: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
        }
    });

    const users = await Promise.all([
        prisma.user.upsert({
            where: { email: 'user1@example.com' },
            update: {},
            create: { username: 'RahulG', email: 'user1@example.com', passwordHash, role: 'USER' }
        }),
        prisma.user.upsert({
            where: { email: 'user2@example.com' },
            update: {},
            create: { username: 'PriyaS', email: 'user2@example.com', passwordHash, role: 'USER' }
        })
    ]);

    console.log('Users seeded');

    // 2. Seed Categories (10 Main Categories)
    const categoryNames = [
        { name: 'Fashion & Clothing', slug: 'fashion-clothing', iconURL: 'shirt' },
        { name: 'Electronics', slug: 'electronics', iconURL: 'smartphone' },
        { name: 'Home & Kitchen', slug: 'home-kitchen', iconURL: 'home' },
        { name: 'Groceries', slug: 'groceries', iconURL: 'shopping-cart' },
        { name: 'Beauty & Health', slug: 'beauty-health', iconURL: 'heart' },
        { name: 'Mobiles & Accessories', slug: 'mobiles-accessories', iconURL: 'headphones' },
        { name: 'Appliances', slug: 'appliances', iconURL: 'tv' },
        { name: 'Travel & Flights', slug: 'travel-flights', iconURL: 'plane' },
        { name: 'Toys & Baby', slug: 'toys-baby', iconURL: 'smile' },
        { name: 'Books & Media', slug: 'books-media', iconURL: 'book' },
    ];

    const createdCategories = [];
    for (const cat of categoryNames) {
        const created = await prisma.category.upsert({
            where: { slug: cat.slug },
            update: {},
            create: cat
        });
        createdCategories.push(created);
    }

    // 3. Seed Stores
    const storeNames = [
        { name: 'Amazon', slug: 'amazon', logoURL: 'https://logo.clearbit.com/amazon.in', isPopular: true },
        { name: 'Flipkart', slug: 'flipkart', logoURL: 'https://logo.clearbit.com/flipkart.com', isPopular: true },
        { name: 'Myntra', slug: 'myntra', logoURL: 'https://logo.clearbit.com/myntra.com', isPopular: true },
        { name: 'Ajio', slug: 'ajio', logoURL: 'https://logo.clearbit.com/ajio.com', isPopular: true },
        { name: 'JioMart', slug: 'jiomart', logoURL: 'https://logo.clearbit.com/jiomart.com', isPopular: true },
        { name: 'Croma', slug: 'croma', logoURL: 'https://logo.clearbit.com/croma.com', isPopular: false },
        { name: 'Nykaa', slug: 'nykaa', logoURL: 'https://logo.clearbit.com/nykaa.com', isPopular: true },
        { name: 'MakeMyTrip', slug: 'makemytrip', logoURL: 'https://logo.clearbit.com/makemytrip.com', isPopular: false },
        { name: 'Swiggy', slug: 'swiggy', logoURL: 'https://logo.clearbit.com/swiggy.com', isPopular: true },
        { name: 'Zomato', slug: 'zomato', logoURL: 'https://logo.clearbit.com/zomato.com', isPopular: true },
    ];

    const createdStores = [];
    for (const store of storeNames) {
        const created = await prisma.store.upsert({
            where: { slug: store.slug },
            update: {},
            create: store
        });
        createdStores.push(created);
    }

    // 4. Seed Tags
    const tagNames = ['Loot', 'Bank Offer', 'Sale', 'Coupon', 'Free Delivery', 'BOGO', 'Limited Time'];
    const createdTags = [];
    for (const t of tagNames) {
        const slug = t.toLowerCase().replace(' ', '-');
        const created = await prisma.tag.upsert({
            where: { slug },
            update: {},
            create: { name: t, slug }
        });
        createdTags.push(created);
    }

    // 5. Seed 50+ Deals
    console.log('Seeding Deals...');
    const dealsData = [];
    for (let i = 1; i <= 50; i++) {
        const store = createdStores[i % createdStores.length];
        const category = createdCategories[i % createdCategories.length];
        const isLoot = i % 5 === 0;
        const discount = Math.floor(Math.random() * 80) + 10;
        const originalPrice = Math.floor(Math.random() * 5000) + 500;
        const discountedPrice = Math.floor(originalPrice * (1 - discount / 100));

        // Pick 2 random tags
        const randomTags = [
            { id: createdTags[i % createdTags.length].id },
            { id: createdTags[(i + 1) % createdTags.length].id }
        ];

        dealsData.push({
            title: `${category.name} Deal ${i} from ${store.name} - Up to ${discount}% OFF`,
            description: `Unbelievable discounts on ${category.name} from ${store.name}. Grab it before the offer expires!`,
            originalPrice,
            discountedPrice,
            discountPercentage: discount,
            couponCode: i % 3 === 0 ? `SAVE${discount}` : null,
            expiryDate: new Date(new Date().getTime() + (Math.random() * 10 - 2) * 24 * 60 * 60 * 1000), // Some might be expired (-2)
            affiliateLink: `https://${store.slug}.com/aff/${i}`,
            isLootDeal: isLoot,
            clickCount: Math.floor(Math.random() * 1000),
            viewsCount: Math.floor(Math.random() * 5000),
            likesCount: Math.floor(Math.random() * 500),
            status: i % 15 === 0 ? 'PENDING' : 'APPROVED',
            submitterId: admin.id,
            storeId: store.id,
            categoryId: category.id,
            tags: { connect: randomTags }
        });
    }

    const createdDeals = [];
    for (const d of dealsData) {
        const deal = await prisma.deal.create({ data: d });
        createdDeals.push(deal);
    }

    // 6. Seed Comments & Wishlists
    console.log('Seeding Comments and Wishlists...');
    for (let i = 0; i < 15; i++) {
        const user = users[i % users.length];
        const deal = createdDeals[i];

        await prisma.comment.create({
            data: {
                content: `Wow! This ${deal.title} deal is absolute steal. Ordered!`,
                userId: user.id,
                dealId: deal.id
            }
        });

        await prisma.wishlist.create({
            data: {
                userId: user.id,
                dealId: deal.id
            }
        });
    }

    console.log('Database Seeding Completed Successfully! You can now start the frontend integration.');
}

main()
    .catch((e) => {
        console.error('Seeding error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
