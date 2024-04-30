## Introduction to E-MERN (Dickies Store)

### Authorship and Credits

- **Author**: thuangg0123 (Me)
- **Guidance**: hip06
- **UI Design Inspiration**: [Dickies](https://www.dickies.com/)
- **Time Taken**: Approximately 3 months

### Overview

E-MERN is an online shopping website designed to provide customers with a convenient and diverse selection of fashion products. The website is built with a user-friendly interface, making it easy to navigate and packed with useful features such as authentication, registration, login, logout, pagination, and online payment.

### Technologies Used

#### Frontend

- **React**: The frontend of E-MERN is built using React, a popular JavaScript library for building user interfaces.
- **Tailwind CSS**: Tailwind CSS is used for styling the components, providing a utility-first approach to styling.
- **Material-UI**: Material-UI components are utilized for creating interactive and responsive UI elements.
- **React Router**: React Router is used for managing navigation within the application.
- **Redux Toolkit**: Redux Toolkit is employed for state management, ensuring efficient handling of application state.
- **axios**: Axios is used for making HTTP requests to the backend server.

#### Backend

- **Express**: The backend server of E-MERN is built using Express, a fast and minimalist web framework for Node.js.
- **MongoDB**: MongoDB is used as the database management system for storing user data, product information, and order details.
- **Cloudinary**: Cloudinary is utilized for storing and managing product images, providing seamless integration for image hosting.
- **jsonwebtoken**: Jsonwebtoken is used for generating and verifying JSON Web Tokens (JWT) for user authentication.
- **bcrypt**: Bcrypt is employed for hashing user passwords, ensuring secure storage of sensitive information.

### Features

#### User Features

- **Browsing Products**: Users can view and filter products based on gender, category, and price.
- **User Authentication**: Secure user authentication system using JWT tokens.
- **User Profile Management**: Users can edit their personal information and view their order history.
- **Shopping Cart**: Users can add products to their shopping cart and proceed to checkout.
- **Wishlist**: Users can add products to their wishlist for future reference.
- **Payment Integration**: Integration with PayPal for secure online payments.

#### Admin Features

- **User Management**: Admins can manage users, including blocking/unblocking user accounts.
- **Order Management**: Admins can view and update order statuses, view order details, and generate PDF invoices.
- **Product Management**: Admins can perform CRUD operations on products, including image uploads using Cloudinary.

### Strengths

- **Comprehensive Functionality**: E-MERN offers essential features expected from an e-commerce platform, including user authentication, product management, and order processing.
- **Modular and Reusable Components**: The use of Higher Order Components (HOCs) and component reuse reduces code duplication and enhances maintainability.
- **Role-based Authorization**: The application implements role-based authorization, ensuring that only authorized users can access certain features.
- **Secure Authentication and Data Handling**: User passwords and sensitive information are encrypted using industry-standard encryption algorithms, ensuring data security.

### Weaknesses

- **Code Cleanliness**: Some areas of the codebase may not adhere to best practices, requiring further refactoring for improved readability and maintainability.
- **Performance Optimization**: Performance optimization measures can be implemented to enhance the overall speed and responsiveness of the application.
- **Dependency on External Image Sources**: Dependency on third-party image sources may result in slow loading times for certain product images.
- **Limited Payment Options**: Currently, the application only supports PayPal for online payments, limiting payment options for users.
- ** etc ...

### Conclusion

E-MERN (Dickies Store) is a fully functional e-commerce platform built with modern technologies and packed with essential features for both users and administrators. While the application offers a robust set of features, there is room for improvement in terms of code quality, performance optimization, and expansion of payment options. Overall, E-MERN provides a seamless shopping experience for customers and efficient management tools for administrators.
