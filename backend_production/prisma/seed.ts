import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Clear existing data
    await prisma.cartItem.deleteMany();
    await prisma.product.deleteMany();

    // Seed sample products
    const products = [
        {
            name: 'Wireless Bluetooth Headphones',
            price: 59.99,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        },
        {
            name: 'Smart Watch Pro',
            price: 199.99,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        },
        {
            name: 'Running Shoes',
            price: 89.99,
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
        },
        {
            name: 'Laptop Backpack',
            price: 49.99,
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
        },
        {
            name: 'Mechanical Keyboard',
            price: 129.99,
            image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400',
        },
        {
            name: 'USB-C Hub Adapter',
            price: 34.99,
            image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400',
        },
        {
            name: 'Portable Speaker',
            price: 44.99,
            image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
        },
        {
            name: 'Gaming Mouse',
            price: 69.99,
            image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
        },
    ];

    for (const product of products) {
        await prisma.product.create({ data: product });
    }

    console.log(`✅ Seeded ${products.length} products successfully!`);
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
