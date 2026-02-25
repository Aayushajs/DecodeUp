import React from 'react';
import { ShoppingBag, Tag } from 'lucide-react';
import { formatPrice } from '../utils/helpers';
import './CartSummary.css';

interface CartSummaryProps {
  totalItems: number;
  totalPrice: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ totalItems, totalPrice }) => {
  return (
    <div className="cart-summary">
      <h3 className="cart-summary-title">Order Summary</h3>
      <div className="cart-summary-rows">
        <div className="summary-row">
          <span className="summary-label">
            <ShoppingBag size={16} strokeWidth={2.5} />
            Items
          </span>
          <span className="summary-value">{totalItems}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">
            <Tag size={16} strokeWidth={2.5} />
            Subtotal
          </span>
          <span className="summary-value">{formatPrice(totalPrice)}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Shipping</span>
          <span className="summary-value summary-free">Free</span>
        </div>
        <div className="summary-divider"></div>
        <div className="summary-row summary-total">
          <span className="summary-label">Total</span>
          <span className="summary-value">{formatPrice(totalPrice)}</span>
        </div>
      </div>
      <button className="checkout-btn" disabled>
        Proceed to Checkout
      </button>
      <p className="checkout-note">Free shipping on all orders</p>
    </div>
  );
};

export default React.memo(CartSummary);
