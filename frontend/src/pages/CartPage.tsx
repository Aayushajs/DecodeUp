import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import {
  useGetCartQuery,
  useRemoveFromCartMutation,
  useAddToCartMutation,
} from '../features/cart/cartApi';
import CartItemComponent from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import './CartPage.css';

const CartPage: React.FC = () => {
  const { data: cart, isLoading, isError, error, refetch } = useGetCartQuery();
  const [removeFromCart] = useRemoveFromCartMutation();
  const [addToCart] = useAddToCartMutation();
  const [removingId, setRemovingId] = useState<number | null>(null);

  const handleRemove = useCallback(
    async (id: number) => {
      try {
        setRemovingId(id);
        await removeFromCart(id).unwrap();
      } catch (err) {
        console.error('Failed to remove from cart:', err);
      } finally {
        setRemovingId(null);
      }
    },
    [removeFromCart],
  );

  const handleUpdateQuantity = useCallback(
    async (productId: number, quantityChange: number) => {
      try {
        await addToCart({ productId, quantity: quantityChange }).unwrap();
      } catch (err) {
        console.error('Failed to update quantity:', err);
      }
    },
    [addToCart],
  );

  if (isLoading) {
    return <Loader text="Loading your cart..." />;
  }

  if (isError) {
    const errorMsg =
      error && 'status' in error
        ? `Server error (${error.status}). Please check if the backend is running.`
        : 'Failed to load cart. Please try again.';
    return <ErrorMessage message={errorMsg} onRetry={refetch} />;
  }

  const isEmpty = !cart || cart.items.length === 0;

  return (
    <div className="cart-page">
      <div className="cart-page-header">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} strokeWidth={2.5} />
          Continue Shopping
        </Link>
        <h1 className="cart-page-title">Shopping Cart</h1>
        {!isEmpty && (
          <p className="cart-page-count">
            {cart.totalItems} {cart.totalItems === 1 ? 'item' : 'items'}
          </p>
        )}
      </div>

      {isEmpty ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">
            <ShoppingBag size={72} strokeWidth={1.5} />
          </div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/" className="shop-now-btn">
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items-list">
            {cart.items.map((item) => (
              <CartItemComponent
                key={item.id}
                item={item}
                onRemove={handleRemove}
                onUpdateQuantity={handleUpdateQuantity}
                isRemoving={removingId === item.id}
              />
            ))}
          </div>
          <div className="cart-summary-wrapper">
            <CartSummary
              totalItems={cart.totalItems}
              totalPrice={cart.totalPrice}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
