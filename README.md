# NeoDesk: E-Commerce Website

## Project Overview
NeoDesk is a modern e-commerce platform built using the MERN (MongoDB, Express, React, Node.js) stack. The platform provides a seamless shopping experience, integrating features such as authentication, payment processing, an admin dashboard for managing products and orders, and a secure OTP-based password recovery system.

## Technologies Used

### Frontend (React with Vite)
- **React 19** – Efficient UI rendering and component-based architecture.
- **Vite** – Fast development server for optimized frontend performance.
- **Redux Toolkit** – State management for handling global application data.
- **React Router v7** – Navigation and routing across the platform.
- **Tailwind CSS** – Utility-based styling for responsive and sleek UI.
- **Axios** – HTTP client for API communication.
- **React Toastify** – Notification system for user feedback.
- **ApexCharts & React ApexCharts** – Data visualization for analytics.
- **React Slick & Slick Carousel** – Interactive product carousels.
- **Moment.js** – Date and time formatting.
- **PayPal SDK (@paypal/react-paypal-js)** – Secure online payment integration.
- **Flowbite** – UI components built on Tailwind CSS for enhanced design.

### Backend (Node.js with Express)
- **Express.js** – Lightweight backend framework for API handling.
- **Mongoose** – ODM for MongoDB database interaction.
- **JWT (jsonwebtoken)** – Secure authentication mechanism.
- **BcryptJS** – Password hashing for user security.
- **Multer & Formidable** – File upload management.
- **Cookie-Parser** – Handles user authentication sessions.
- **CORS** – Enables secure cross-origin requests.
- **Dotenv** – Environment variable management.
- **Express Async Handler** – Efficient error handling.
- **Express Formidable** – Middleware for form data processing.

### Development Tools
- **Nodemon** – Automatic server reload on code changes.
- **Concurrently** – Runs frontend and backend simultaneously.
- **Postman** – API testing and documentation.
- **ESLint** – Code linting for error-free JavaScript.
- **PostCSS & Autoprefixer** – CSS processing for cross-browser compatibility.

## Features & Implementation

### User Features
- **User Authentication**: Secure login/signup using JWT.
- **Forgot Password**: OTP-based password recovery system.
- **Product Listings**: Browse products with category filters and search functionality.
- **Shopping Cart**: Add, remove, and update cart items.
- **Order Management**: Track order status and history.
- **Payment Integration**: PayPal payment gateway for secure transactions.

### Admin Dashboard
- **Product Management**: Add, update, and delete products.
- **Order Processing**: Manage customer orders efficiently.
- **User Management**: View and control registered users.
- **Analytics**: Dashboard with sales charts using ApexCharts.

## Project Structure & Workflow
1. **Frontend & Backend Separation**
   - Frontend: React (Vite) inside `frontend/`
   - Backend: Express (Node.js) inside `backend/`
2. **Authentication & Security**
   - JWT-based authentication for secure login.
   - Password hashing with `bcryptjs`.
3. **Forgot Password System**
   - OTP-based authentication for password recovery.
4. **State Management**
   - Redux Toolkit for handling UI state across components.
5. **API Development & Testing**
   - REST API using Express.js.
   - Testing and debugging via Postman.
6. **Development Workflow**
   - `concurrently` runs frontend and backend together:
     ```json
     "dev": "concurrently \"npm run frontend\" \"npm run backend\""
     ```
   - ESLint ensures clean and structured code.
   - Hot reloading for efficient development.

## Objectives
- Develop a **fully functional e-commerce platform** with a user-friendly interface.
- Implement **secure authentication** using JWT and password hashing.
- Create an **admin dashboard** to manage products, orders, and users.
- Integrate **payment processing** to allow seamless transactions.
- Implement **OTP-based password recovery** to enhance security.
- Ensure **scalability and performance optimization** for future expansion.

## Challenges
- **Authentication & Security**: Implementing JWT-based authentication securely while preventing vulnerabilities like token theft.
- **Payment Integration**: Ensuring a smooth PayPal payment flow without transaction failures.
- **State Management**: Handling global state efficiently with Redux Toolkit to avoid performance bottlenecks.
- **Database Optimization**: Structuring MongoDB collections for fast queries and minimal redundancy.
- **Frontend Performance**: Maintaining fast loading times and responsiveness using Vite and Tailwind CSS.
- **Error Handling**: Managing API errors, invalid user inputs, and failed transactions gracefully.

## Future Enhancements
- **Mobile Responsiveness**: Improve UI to be fully responsive across all devices.
- **Chatbot Integration**: Implement an AI-powered chatbot for customer support.
- **Advanced Admin Dashboard**: Enhance the admin panel with more analytics and management tools.
- **More Payment Options**: Expand payment gateway support beyond PayPal.
- **AI-driven Recommendations**: Introduce personalized product recommendations using AI.
- **Multi-Vendor Support**: Allow multiple sellers to list products on the platform.

## Conclusion
NeoDesk is a fully functional and scalable e-commerce platform designed with modern technologies. With a robust admin dashboard, secure user authentication, OTP-based password recovery, and a smooth shopping experience, it serves as an efficient solution for online retail businesses. Future enhancements may include AI-driven recommendations, multi-vendor support, and enhanced payment options.

## Installation Guide
```sh
# Clone the repository
git clone https://github.com/shehzab/NeoDesk-Ecommerce.git

# Navigate to project directory
cd NeoDesk-Ecommerce

# Install dependencies for frontend
cd frontend
npm install

# Install dependencies for backend
cd ../backend
npm install

# Create a .env file and add your environment variables

# Run the project
npm run dev
```

## License
This project is licensed under the MIT License.

