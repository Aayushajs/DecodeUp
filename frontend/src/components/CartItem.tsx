import React, { useCallback, useState } from 'react';
import { Trash2, Minus, Plus } from 'lucide-react';
import { formatPrice } from '../utils/helpers';
import type { CartItemType } from '../features/cart/types';
import './CartItem.css';

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  isRemoving: boolean;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onRemove,
  onUpdateQuantity,
  isRemoving,
}) => {
  const [imgError, setImgError] = useState(false);

  const handleRemove = useCallback(() => {
    onRemove(item.id);
  }, [onRemove, item.id]);

  const handleIncrease = useCallback(() => {
    onUpdateQuantity(item.productId, 1);
  }, [onUpdateQuantity, item.productId]);

  const handleDecrease = useCallback(() => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.productId, -1);
    }
  }, [onUpdateQuantity, item.productId, item.quantity]);

  return (
    <div className={`cart-item ${isRemoving ? 'removing' : ''}`}>
      <div className="cart-item-image-wrapper">
        {imgError ? (
          <div className="cart-item-image-fallback">📦</div>
        ) : (
          <img
            src={item.product.image}
            alt={item.product.name}
            className="cart-item-image"
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <div className="cart-item-details">
        <h4 className="cart-item-name">{item.product.name}</h4>
        <p className="cart-item-price">
          {formatPrice(item.product.price)}
        </p>
        <div className="cart-item-quantity">
          <button
            className="qty-btn"
            onClick={handleDecrease}
            disabled={item.quantity <= 1}
            aria-label="Decrease quantity"
          >
            <Minus size={16} strokeWidth={2.5} />
          </button>
          <span className="qty-value">{item.quantity}</span>
          <button
            className="qty-btn"
            onClick={handleIncrease}
            aria-label="Increase quantity"
          >
            <Plus size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>
      <div className="cart-item-actions">
        <p className="cart-item-subtotal">
          {formatPrice(item.product.price * item.quantity)}
        </p>
        <button
          className="cart-item-remove-btn"
          onClick={handleRemove}
          disabled={isRemoving}
          aria-label="Remove from cart"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default React.memo(CartItem);
