## SpazaHub - CodeTribe Marketplace MVP

Welcome to **SpazaHub**, an online marketplace MVP developed for CodeTribe Academy. This project allows users to register, log in, view products, list new items for sale, manage product listings, and purchase items.

## Table of Contents
- [SpazaHub - CodeTribe Marketplace MVP](#spazahub---codetribe-marketplace-mvp)
- [Table of Contents](#table-of-contents)
- [Project Overview](#project-overview)
- [Features](#features)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation Steps](#installation-steps)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
  - [Product Management](#product-management)
  - [Cart and Checkout](#cart-and-checkout)
- [Environment Variables](#environment-variables)
  - [Backend (.env)](#backend-env)
  - [Frontend (.env)](#frontend-env)
- [Deployment](#deployment)
- [Author](#author)

---

## Project Overview

The **CodeTribe Marketplace MVP** is a full-stack e-commerce application. The backend, built with Node.js and MongoDB, manages authentication, product listings, and cart functionalities. The frontend, developed with React, offers an intuitive user experience for browsing, listing, and buying products.

## Features

### Backend
- **User Authentication**: Register, log in, and log out with JWT authentication.
- **Product Management**: CRUD operations for products, including listing, updating, hiding, and deleting.
- **Cart and Checkout**: Add products to cart and proceed to checkout.

### Frontend
- **Responsive Design**: Compatible with desktop and mobile devices.
- **Product Search and Filter**: Find products by keywords.
- **Add, Update, and Delete Product**: For sellers to manage their listings.
- **Cart and Checkout**: Add products to cart and proceed to checkout.

## Tech Stack

- **Backend**: Node.js, Express, MongoDB, JWT
- **Frontend**: React.js, Redux, Axios
- **Database**: MongoDB
- **Deployment**: Heroku for backend, Vercel/Netlify for frontend

---

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- NPM or Yarn

### Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/SpazaHub.git
   cd SpazaHub
   ```

2. **Install Dependencies for Frontend and Backend**:
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Configure Environment Variables**:
   Set up `.env` files in both `frontend` and `backend` folders (see [Environment Variables](#environment-variables) section below for details).

4. **Run the Project**:
   From the root directory:
   ```bash
   cd ..
   npm start
   ```
   - The backend will run on `http://localhost:6060`
   - The frontend will run on `http://localhost:5173`

---

## API Documentation

### Authentication
- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Log in a user.

### Product Management
- **GET /api/products**: Retrieve all products.
- **POST /api/products**: Add a new product (requires authentication).
- **PUT /api/products/:id**: Update an existing product (requires authentication).
- **DELETE /api/products/:id**: Delete a product (requires authentication).

### Cart and Checkout
- **POST /api/cart**: Add an item to the cart.
- **GET /api/cart**: View cart items.
- **POST /api/checkout**: Checkout with items in the cart.

---

## Environment Variables

### Backend (.env)
Set up the following in the `backend` folder:
```env
PORT=6060
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Frontend (.env)
Set up the following in the `frontend` folder:
```env
REACT_APP_API_URL=http://localhost:6060
```

---

## Deployment

The backend is hosted on Heroku, and the frontend is on Vercel.

1. **Backend**: Configure environment variables on Heroku and deploy from GitHub.
2. **Frontend**: Set environment variables on Vercel and deploy from GitHub.

---

## Author

Built by [Xoli Nxiweni](https://github.com/yourusername) (xolinxiweni@gmail.com) for CodeTribe Academy.

--- 
