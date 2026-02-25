import { DataSource } from 'typeorm';
import { Product } from './products/entities/product.entity';
import { CartItem } from './cart/entities/cart-item.entity';
import * as dotenv from 'dotenv';

dotenv.config();

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'shopping_cart',
  entities: [Product, CartItem],
  synchronize: true,
});

const sampleProducts: Partial<Product>[] = [
  {
    name: 'Wireless Bluetooth Headphones',
    price: 79.99,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
  },
  {
    name: 'Premium Leather Backpack',
    price: 129.99,
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
  },
  {
    name: 'Smart Watch Pro',
    price: 249.99,
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
  },
  {
    name: 'Running Shoes Elite',
    price: 159.99,
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
  },
  {
    name: 'Organic Cotton T-Shirt',
    price: 34.99,
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
  },
  {
    name: 'Stainless Steel Water Bottle',
    price: 24.99,
    image:
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80',
  },
  {
    name: 'Portable Bluetooth Speaker',
    price: 59.99,
    image:
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80',
  },
  {
    name: 'Minimalist Desk Lamp',
    price: 44.99,
    image:
      'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400&q=80',
  },
  {
    name: 'Vintage Sunglasses',
    price: 89.99,
    image:
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80',
  },
  {
    name: 'Ceramic Coffee Mug Set',
    price: 29.99,
    image:
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80',
  },
  {
    name: 'Mechanical Keyboard RGB',
    price: 139.99,
    image:
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80',
  },
  {
    name: 'Yoga Mat Premium',
    price: 49.99,
    image:
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&q=80',
  },
];

async function seed() {
  try {
    await dataSource.initialize();
    console.log('📦 Database connected');

    const productRepo = dataSource.getRepository(Product);
    const cartRepo = dataSource.getRepository(CartItem);

    // Clear existing data
    await cartRepo.delete({});
    await productRepo.delete({});
    console.log('🗑️  Cleared existing data');

    // Insert sample products
    for (const product of sampleProducts) {
      await productRepo.save(productRepo.create(product));
    }
    console.log(`✅ Inserted ${sampleProducts.length} sample products`);

    // Verify
    const count = await productRepo.count();
    console.log(`📊 Total products in DB: ${count}`);

    await dataSource.destroy();
    console.log('🎉 Seeding complete!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();
