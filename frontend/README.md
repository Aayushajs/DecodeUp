# DecodeUp E-commerce Frontend

A premium, human-crafted e-commerce platform built with **React 19**, **Vite**, and **Redux Toolkit**. This project focuses on an editorial aesthetic—eschewing generic AI templates for a clean, confident, and sophisticated user experience.

---

## ✨ Features

- **Premium Editorial Design**: A minimalist, high-end look with glassmorphism, restrained typography, and intentional whitespace.
- **Dynamic Hero Section**: Randomized live stats (Review ratings, Stock count, Shipping states) on mount for a dynamic "live" feel.
- **Real-time Cart Management**: Full integration with the backend via RTK Query, featuring instant updates and persistence.
- **Fast Navigation**: Pre-configured routes for Home, About, Offers, and Cart.
- **Direct Checkout Flow**: Added-to-cart actions immediately guide users to the cart for a frictionless experience.
- **Responsive Perfection**: Fully optimized for Desktop, Tablet, and Mobile devices.
- **Responsive Feed**: Floating "Back to Top" functionality for seamless browsing.

---

## 🛠️ Tech Stack

- **Core Library**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **State Management**: [@reduxjs/toolkit](https://redux-toolkit.js.org/) (RTK Query)
- **Persistence**: [Redux Persist](https://github.com/rt2zz/redux-persist)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Vanilla CSS (Modern Design Tokens & Glassmorphism)

---

## 📂 Project Structure

```text
src/
├── app/            # Redux store configuration
├── components/     # Reusable UI components (Navbar, ProductCard, etc.)
├── features/       # API services (RTK Query) and slices
├── hooks/          # Custom React hooks
├── pages/          # Full page components (Home, About, Offers, Cart)
├── types/          # TypeScript definitions
├── utils/          # Helper functions (Formatting, API Base URL)
└── index.css       # Global design tokens and foundation styles
```

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18+) and [npm](https://www.npmjs.com/) installed.

### 2. Installation
Clone the repository and install dependencies:
```bash
cd frontend
npm install
```

### 3. Environment Setup
Create a `.env.development` file in the root:
```env
VITE_API_URL=http://localhost:5000
```
Create a `.env.production` file for live environments:
```env
VITE_API_URL=http://localhost:3000
```

### 4. Running Locally
Start the development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Build & Deployment

To create a production-ready bundle:
```bash
npm run build
```
The output will be in the `dist/` folder. You can preview the build locally using:
```bash
npm run preview
```

---

## 🎨 Design Philosophy

This project follows an **Editorial E-commerce** approach:
1. **Restraint**: We use one primary accent color (`#e05a1e`) sparingly to guide the eye.
2. **Typography**: Large, confident headings using *Plus Jakarta Sans* and *Inter*.
3. **Glassmorphism**: Floating elements like the Navbar utilize frosted glass effects for depth.
4. **Hierarchy**: Clear visual paths from product discovery to checkout.

---

## 🤝 Contribution

1. Fork the project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

Designed with ❤️ for **DecodeUp**.
