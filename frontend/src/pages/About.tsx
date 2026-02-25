import React from 'react';
import { Sparkles, Heart, Globe, Shield } from 'lucide-react';
import './About.css';

const About: React.FC = () => {
    return (
        <div className="about-page">
            <section className="about-hero">
                <h1 className="about-title">Our Story</h1>
                <p className="about-subtitle">
                    Crafting a better way to shop, with quality at the heart of everything we do.
                </p>
            </section>

            <section className="about-content">
                <div className="about-grid">
                    <div className="about-card">
                        <Sparkles className="about-icon" />
                        <h3>Our Mission</h3>
                        <p>To provide high-quality, handpicked products that enhance your daily life without the clutter.</p>
                    </div>
                    <div className="about-card">
                        <Heart className="about-icon" />
                        <h3>Our Values</h3>
                        <p>Transparency, sustainability, and human-centric design are the pillars of our brand identity.</p>
                    </div>
                    <div className="about-card">
                        <Globe className="about-icon" />
                        <h3>Global Reach</h3>
                        <p>Working with partners worldwide to bring you the best craftsmanship from every corner of the globe.</p>
                    </div>
                    <div className="about-card">
                        <Shield className="about-icon" />
                        <h3>Trust & Safety</h3>
                        <p>Your security is our priority. We ensure encrypted transactions and guaranteed product quality.</p>
                    </div>
                </div>
            </section>

            <section className="about-philosophy">
                <div className="philosophy-text">
                    <h2>The Editorial Approach</h2>
                    <p>
                        We don't believe in "more." We believe in "better." Every item in our collection is
                        vetted for durability, aesthetic value, and practical utility. We bridge the gap
                        between high-end luxury and everyday accessibility.
                    </p>
                </div>
                <div className="philosophy-image">
                    <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" alt="Studio" />
                </div>
            </section>
        </div>
    );
};

export default About;
