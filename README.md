Here’s a README file for your CodeTribe Marketplace MVP:

---

# SpazaHub - CodeTribe Marketplace MVP

Welcome to **SpazaHub**, an online marketplace built as an MVP for CodeTribe Academy. SpazaHub allows users to register, log in, view available products, list new products for sale, manage their product listings, and purchase items from the marketplace. 

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
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
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

The **CodeTribe Marketplace MVP** is a full-stack application developed to showcase essential e-commerce features. The backend was built with Node.js and MongoDB, handling authentication, product management, and cart functionalities. The frontend, developed with React, provides a user-friendly interface for browsing, managing, and purchasing products.

## Features

### Backend
- **User Authentication**: Register and log in with JWT authentication.
- **Product Management**: CRUD operations for products, including adding, updating, deleting, hiding, and viewing product listings.
- **Cart and Checkout**: Add items to cart and proceed to checkout.

### Frontend
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **User Registration and Login**: Secure forms for user authentication.
- **Product Listing**: Browse available products, with options to filter and search.
- **Add a Product**: For sellers to list new products.
- **Update/Delete Product**: Manage product availability and details.
- **Cart and Checkout**: Add products to cart and proceed to checkout.

## Tech Stack

- **Backend**: Node.js, Express, MongoDB, JWT for authentication
- **Frontend**: React.js, Redux for state management, Axios for API requests
- **Database**: MongoDB
- **Deployment**: Hosted on platforms (e.g., Heroku for backend, Vercel/Netlify for frontend)

---

## Getting Started

### Prerequisites
- Node.js
- MongoDB (local or cloud instance)
- NPM or Yarn

### Backend Setup

1. **Clone the Repository**: 
   ```bash
   git clone https://github.com/yourusername/SpazaHub.git
   cd SpazaHub/backend
   ```

2. **Install Dependencies**: 
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Set up a `.env` file in the `backend` folder with the following variables:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the Server**:
   ```bash
   npm start
   ```
   Your backend server should now be running on `http://localhost:5000`.

### Frontend Setup

1. **Navigate to the Frontend Directory**:
   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the `frontend` folder with the following variable:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

4. **Run the Frontend**:
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000`.

---

## API Documentation

### Authentication
- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Log in an existing user.

### Product Management
- **GET /api/products**: Retrieve all products.
- **POST /api/products**: Add a new product (requires authentication).
- **PUT /api/products/:id**: Update an existing product (requires authentication).
- **DELETE /api/products/:id**: Delete a product (requires authentication).
- **PUT /api/products/:id/hide**: Hide a product from the listing (requires authentication).

### Cart and Checkout
- **POST /api/cart**: Add a product to the cart.
- **GET /api/cart**: View items in the cart.
- **POST /api/checkout**: Proceed with the checkout process.

Full API documentation with request and response examples is available in the [API Documentation](./API_DOCUMENTATION.md) file.

---

## Environment Variables

To run this project, you will need to set up the following environment variables in the `.env` files for both the backend and frontend:

### Backend (.env)
- `PORT`: Port number for backend (default: 5000).
- `MONGODB_URI`: MongoDB connection URI.
- `JWT_SECRET`: Secret key for JWT authentication.

### Frontend (.env)
- `REACT_APP_API_URL`: Base URL for backend API (default: `http://localhost:5000`).

---

## Deployment

The backend API is deployed on [Heroku](https://spazahub-backend.herokuapp.com), and the frontend is hosted on [Vercel](https://spazahub-frontend.vercel.app).

1. **Backend**: Configure environment variables in your Heroku dashboard, then deploy from your GitHub repository.
2. **Frontend**: Configure environment variables on Vercel or Netlify, and connect it to your GitHub repository for deployment.

---

## Author

Built by [Your Name](https://github.com/yourusername) for CodeTribe Academy.

---