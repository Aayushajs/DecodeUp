import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Zap } from 'lucide-react';
import { useGetCartQuery } from '../features/cart/cartApi';
import './Navbar.css';

const Navbar: React.FC = () => {
  const { data: cart, isFetching } = useGetCartQuery();
  const location = useLocation();
  const totalItems = cart?.totalItems ?? 0;
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-inner">

        {/* Brand */}
        <Link to="/" className="navbar-brand">
          <div className="brand-dot" />
          <span className="brand-text">DecodeUp</span>
        </Link>

        {/* Center Nav */}
        <div className="navbar-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
            About
          </Link>
          <Link to="/offers" className={`nav-link ${location.pathname === '/offers' ? 'active' : ''}`}>
            Offers
          </Link>
        </div>

        {/* Right Section */}
        <div className="navbar-right">
          {/* Global Loader */}
          {isFetching && (
            <div className="navbar-loader">
              <div className="nav-spinner" />
            </div>
          )}

          {/* Search container */}
          <div className="search-container">
            <Search size={16} className="search-icon" />
            <input type="text" placeholder="Search..." className="search-input" />
          </div>

          <span className="navbar-delivery">
            <Zap size={12} style={{ marginRight: '4px' }} />
            Free over <strong>$99</strong>
          </span>

          <Link to="/cart" className="cart-link" aria-label="Shopping cart">
            <ShoppingCart size={18} strokeWidth={1.8} />
            {totalItems > 0 && (
              <span className="cart-badge">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
