import React from 'react';
import { Tag, Zap, Percent, Gift } from 'lucide-react';
import './Offers.css';

const Offers: React.FC = () => {
    return (
        <div className="offers-page">
            <header className="offers-header">
                <h1 className="offers-title">Exclusive Offers</h1>
                <p className="offers-sub">Curated deals on premium quality items, just for you.</p>
            </header>

            <div className="offers-grid">
                <div className="offer-card featured">
                    <div className="offer-badge">Limited Time</div>
                    <Zap className="offer-icon" />
                    <h2>New Customer Discount</h2>
                    <p className="offer-desc">Get 20% off your first order with code <strong>WELCOME20</strong></p>
                    <div className="offer-disclaimer">*Valid on orders above $50</div>
                </div>

                <div className="offer-card">
                    <Percent className="offer-icon" />
                    <h2>Bulk Savings</h2>
                    <p className="offer-desc">Save 15% when you buy 3 or more items from our tech collection.</p>
                </div>

                <div className="offer-card">
                    <Gift className="offer-icon" />
                    <h2>Free Gift Box</h2>
                    <p className="offer-desc">Complementary premium gift packaging on all orders over $150.</p>
                </div>

                <div className="offer-card">
                    <Tag className="offer-icon" />
                    <h2>Flash Friday</h2>
                    <p className="offer-desc">Every Friday, we pick 5 items for a surprise 40% markdown.</p>
                </div>
            </div>
        </div>
    );
};

export default Offers;
