# E-commerce Platform for Plant Products

A complete e-commerce platform developed with Next.js for selling plant products. The project includes both a customer portal and an administrator panel for product management.

## Features

### Customer Portal
- Product display categorized by indoor plants, outdoor plants, and gardening products
- Shopping cart functionality
- Checkout process

### Administrator Panel
- **Product Management**
  - List all products
  - Search for products
  - Add new products
  - Edit existing products
  - Delete products
- Order review and management

## Technical Stack

- **Frontend:** Next.js, React, TailwindCSS
- **Backend:** Next.js API routes
- **Database:** MongoDB with Mongoose
- **Form Handling:** React Hook Form with Zod validation
- **UI Components:** shadcn/ui

## Getting Started

### Prerequisites

- Node.js (version 16.x or later)
- npm or yarn
- MongoDB (local or cloud-based)

### Installation

1. Clone the project:
   ```bash
   git clone <repository-url>
   cd fsu24d-systemutveckling-uppgift-1-e-handel-for-produkter-innoveraz
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the project root with the following content:
   ```
   MONGODB_URI=mongodb://your-mongodb-uri
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or 
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the customer portal.

### Generate Administrator Account

To access the admin panel, you need an administrator account.

1. Run the seed script to create an admin account:
   ```bash
   npm run seed-admin
   # or
   yarn seed-admin
   ```

2. Log in with the generated credentials at [http://localhost:3000/admin](http://localhost:3000/admin)

## Usage

### Customer Portal

1. Visit the homepage at [http://localhost:3000](http://localhost:3000) to see available product categories
2. Click on a product category to view products
3. Add products to your cart by clicking "Add to Cart" on the products
4. Click on the cart icon to view your cart and proceed to checkout

### Admin Panel

1. Log in at [http://localhost:3000/admin](http://localhost:3000/admin)
2. Go to Product Management via the menu to manage products:
   - **Product List** - View, search, and delete products
   - **Add New Product** - Create new products
   - **Edit Product** - Appears when you click "Edit" on a product

3. Manage orders via Order Management in the menu

## Project Structure

- `/src/app` - Next.js App Router structure
- `/src/components` - Reusable UI components
- `/src/features` - Feature-oriented modules
  - `/auth` - Authentication and users
  - `/cart` - Shopping cart functionality
  - `/products` - Product-related components and functions
  - `/orders` - Order management
- `/src/lib` - Helper functions, database connection, etc.

## License

[MIT](https://choosealicense.com/licenses/mit/)
