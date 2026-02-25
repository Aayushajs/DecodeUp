import React, { useCallback, useState } from 'react';
import { ShoppingCart, Check, Heart, Package } from 'lucide-react';
import { formatPrice } from '../utils/helpers';
import type { Product } from '../features/products/types';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: number) => void;
  isAdding: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, isAdding }) => {
  const [imgError, setImgError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const handleAdd = useCallback(() => {
    onAddToCart(product.id);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  }, [onAddToCart, product.id]);

  const handleImgError = useCallback(() => setImgError(true), []);

  const toggleWishlist = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlisted(v => !v);
  }, []);

  return (
    <div className="product-card">

      {/* Image */}
      <div className="product-image-wrapper">
        {imgError ? (
          <div className="product-image-fallback">
            <Package size={40} strokeWidth={1.2} />
            <span>No image</span>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
            loading="lazy"
            onError={handleImgError}
          />
        )}

        {/* Wishlist */}
        <button
          className={`wishlist-btn ${wishlisted ? 'active' : ''}`}
          onClick={toggleWishlist}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={15} fill={wishlisted ? 'currentColor' : 'none'} strokeWidth={2} />
        </button>
      </div>

      {/* Info */}
      <div className="product-info">
        <p className="product-name">{product.name}</p>

        <div className="product-footer">
          <span className="product-price">{formatPrice(product.price)}</span>

          <button
            className={`add-to-cart-btn ${justAdded ? 'added' : ''}`}
            onClick={handleAdd}
            disabled={isAdding}
          >
            {justAdded ? (
              <>
                <Check size={14} strokeWidth={2.5} />
                Added
              </>
            ) : isAdding ? (
              <>
                <span className="btn-spinner" />
                Adding
              </>
            ) : (
              <>
                <ShoppingCart size={14} strokeWidth={2.5} />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
