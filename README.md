# Couture AI - Inventory Management Portal

A modern, responsive web application designed for store managers to efficiently manage and view product inventory without relying on Excel sheets.

## Live Demo

The application is deployed and accessible online:

👉 **Live Application**: https://store-admin-nine-ivory.vercel.app/

This deployment showcases all core features including inventory browsing, catalogue drill-down, product details, and responsive design.

## Overview

This application provides an intuitive interface for:
- Viewing comprehensive product inventory
- Searching and filtering products by various criteria
- Browsing products by category hierarchy
- Viewing detailed product information with similar product recommendations

## Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **API**: DummyJSON API ((https://dummyjson.com/products))

## Features

### 1. Welcome Home Page
- Clean landing page with application overview
- Two main navigation options:
  - Inventory Overview
  - Catalogue Overview

### 2. Inventory Overview
- **Product Table**: Displays products with columns for image, name, price, brand, category, stock status, and rating
- **Search**: Fast, debounced search functionality to find products by name
- **Filtering**: Filter products by category
- **Sorting**: Sort products by:
  - Name (A-Z or Z-A)
  - Price (Low to High or High to Low)
- **Pagination**: Loads 30 products initially for optimal performance
- **Interactive**: Click any product to view detailed information

### 3. Product Details
- Full product information including:
  - Multiple product images with image selector
  - Product name, brand, and description
  - Price with discount percentage
  - Star rating
  - Stock availability
  - Category information
- **Similar Products**: Displays 6 similar products from the same category as cards
- Click on similar products to navigate to their details

### 4. Catalogue Overview
- **Category Grid**: Displays all available categories as visual cards
- **Drill-Down**: Click any category to view all products in that category
- **Reusable UI**: Uses the same inventory overview interface for category products

## Design Highlights

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Loading States**: Skeleton loaders and spinners for better user experience
- **Error Handling**: Clear error messages with retry functionality
- **Visual Feedback**: Hover effects, transitions, and interactive elements
- **Consistent UI**: Unified color scheme and spacing throughout the application
- **Performance**: Optimized image loading and debounced search

## Installation & Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd couture-ai-inventory
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

The production build will be created in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CategoryCard.tsx
│   ├── ErrorMessage.tsx
│   ├── Loader.tsx
│   ├── ProductCard.tsx
│   └── ProductTable.tsx
├── context/            # React context for state management
│   └── NavigationContext.tsx
├── hooks/              # Custom React hooks
│   └── useDebounce.ts
├── pages/              # Main application pages
│   ├── CataloguePage.tsx
│   ├── HomePage.tsx
│   ├── InventoryPage.tsx
│   └── ProductDetailPage.tsx
├── services/           # API service layer
│   └── api.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## Code Quality

- **TypeScript**: Fully typed for better development experience and fewer runtime errors
- **Reusable Components**: Modular component architecture for maintainability
- **Clean Code**: Consistent formatting and naming conventions
- **Error Boundaries**: Proper error handling throughout the application
- **Performance**: Optimized rendering and lazy loading where applicable

## Assumptions Made

1. **Pagination**: Initial load shows 30 products (instead of minimum 20) for better user experience
2. **Search Debounce**: 300ms delay for search input to balance responsiveness and API calls
3. **Similar Products**: Shows up to 6 similar products from the same category
4. **Image Display**: Product detail page shows up to 4 thumbnail images for selection
5. **Category Filtering**: "All Categories" option shows all products without category filter
6. **Navigation**: Built custom navigation context instead of React Router for simplicity
7. **No Authentication**: Public inventory system, no user authentication required

## API Endpoints Used

- `GET /products` - Fetch all products
- `GET /products/:id` - Fetch single product by ID
- `GET /products/search?q={query}` - Search products
- `GET /products/categories` - Fetch all categories
- `GET /products/category/{categoryName}` - Fetch products by category

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Add product comparison feature
- Implement advanced filtering (price range, rating)
- Add export functionality (CSV, PDF)
- Implement user favorites/bookmarks
- Add dark mode support
- Include analytics dashboard

## License

This project is created as part of the Couture AI Frontend Assignment.

## Contact

For any questions or issues, please refer to the assignment documentation.
