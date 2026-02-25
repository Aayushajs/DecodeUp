import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { Package, ArrowUp, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../features/products/productsApi';
import { useAddToCartMutation } from '../features/cart/cartApi';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import './Home.css';

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Home', 'Beauty', 'Sports'];

const Home: React.FC = () => {
  const { data: products, isLoading, isError, error, refetch } = useGetProductsQuery();
  const [addToCart] = useAddToCartMutation();
  const [addingProductId, setAddingProductId] = useState<number | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();

  // Randomize products on load
  const randomizedProducts = useMemo(() => {
    if (!products) return [];
    return [...products].sort(() => Math.random() - 0.5);
  }, [products]);

  // Randomize stats
  const randomRating = useMemo(() => (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1), []);
  const randomShipping = useMemo(() => Math.random() > 0.5 ? 'Free' : '$5.00', []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = useCallback(
    async (productId: number) => {
      try {
        setAddingProductId(productId);
        await addToCart({ productId, quantity: 1 }).unwrap();
        navigate('/cart');
      } catch (err) {
        console.error('Failed to add to cart:', err);
      } finally {
        setAddingProductId(null);
      }
    },
    [addToCart, navigate],
  );

  if (isLoading) return <Loader text="Loading products…" />;

  if (isError) {
    const errorMsg =
      error && 'status' in error
        ? `Server error (${error.status}). Please check if the backend is running.`
        : 'Failed to load products. Please try again.';
    return <ErrorMessage message={errorMsg} onRetry={refetch} />;
  }

  if (!products || products.length === 0) {
    return (
      <div className="empty-products">
        <Package size={64} strokeWidth={1.2} />
        <h2>No Products Found</h2>
        <p>There are no products available right now.</p>
      </div>
    );
  }

  return (
    <div className="home-page">

      {/* ── Hero ── */}
      <section className="home-hero">
        <div className="hero-left">
          <p className="hero-eyebrow">New arrivals</p>
          <h1 className="hero-title">
            <span className="typing-text">Everything you need,</span><br />
            <em className="typing-text-delayed">nothing you don't.</em>
          </h1>
          <p className="hero-sub">
            A curated selection of {products.length} products — quality-checked,
            fairly priced, and delivered to your door.
          </p>
        </div>


      </section>

      {/* ── Filter Bar ── */}
      <div className="filter-bar">
        <div className="filter-categories">
          {CATEGORIES.map(category => (
            <button
              key={category}
              className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              <span>{category}</span>
            </button>
          ))}
        </div>
        <button className="advanced-filter-btn">
          <Filter size={18} />
          <span>Filters</span>
        </button>
      </div>

      {/* ── Products ── */}
      <div className="products-header">
        <h2 className="products-heading">All Products</h2>
        <span className="products-count">{randomizedProducts.length} items</span>
      </div>

      <div className="products-grid">
        {randomizedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            isAdding={addingProductId === product.id}
          />
        ))}
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button className="scroll-to-top" onClick={scrollToTop} aria-label="Scroll to top">
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

export default Home;
