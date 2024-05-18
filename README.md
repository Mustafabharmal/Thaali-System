# Thaali Center 🍽️

## Overview

Welcome to the Thaali Center, your comprehensive platform for managing users, communities, and menus seamlessly. Powered by cutting-edge technologies like React, Express, MongoDB, and Java Spring Boot, our system ensures efficiency, security, and user satisfaction. This project aims to streamline operations, enhance productivity, and drive growth for businesses and communities.

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **Bootstrap**: A CSS framework for responsive design.
- **Axios**: A promise-based HTTP client for making API requests.

### Backend

- **Node.js**: A JavaScript runtime for server-side development.
- **Express**: A web application framework for Node.js.
- **MongoDB**: A NoSQL database for storing data.
- **Litepicker**: A lightweight date picker library for selecting dates.

### Additional Backend (Java)

- **Java Spring Boot**: A framework for building Java-based backend applications.
- **Spring Security**: A framework for securing Java applications.
- **Spring Data JPA**: A framework for data access in Java applications.


## Installation

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB installed and running.
- Java Development Kit (JDK) installed for Java backend.

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/thaali-center.git
   cd thaali-center
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the `backend` directory with the following content:

   ```
   MONGODB_URI=mongodb://localhost:27017/thaalicenter
   ```

   Start the backend server:

   ```bash
   node app.js
   ```

3. **Frontend Setup**

   ```bash
   cd ../frontend
   npm install
   ```

   Start the frontend server:

   ```bash
   npm start
   ```

4. **Java Backend Setup**

   ```bash
   cd ../java-backend
   mvn clean install
   ```

   Start the Java backend server:

   ```bash
   mvn spring-boot:run
   ```

## Features

- **User Management**: Add, update, and delete user profiles.
- **Community Management**: Add new communities, update existing ones, and maintain community data.
- **Menu Management**: Create, update, and delete menus with support for Gujarati language.
- **Feedback and Complaint Module**: Manage user feedback and complaints efficiently.
- **Variety Module**: Translate English menu items to Gujarati, providing 5 relevant words for selection.
- **Security**: Robust security measures to protect user, community, and menu information.
- **Responsive Design**: Access the system from any device with optimal performance.

## Usage

### Running the Application

1. **Start MongoDB**:

   ```bash
   mongod
   ```

2. **Start the Backend Server**:

   ```bash
   cd backend
   node app.js
   ```

3. **Start the Frontend Server**:

   ```bash
   cd frontend
   npm start
   ```

4. **Start the Java Backend Server**:

   ```bash
   cd java-backend
   mvn spring-boot:run
   ```

### Accessing the Application

- Open your browser and navigate to `http://localhost:3000` to access the frontend.
- The backend API is available at `http://localhost:5000`.

## API Endpoints

### User Endpoints

- `GET /users` - Retrieve all users.
- `POST /users` - Add a new user.
- `PUT /users/:id` - Update a user.
- `DELETE /users/:id` - Delete a user.

### Community Endpoints

- `GET /communities` - Retrieve all communities.
- `POST /communities` - Add a new community.
- `PUT /communities/:id` - Update a community.
- `DELETE /communities/:id` - Delete a community.

### Menu Endpoints

- `GET /menus` - Retrieve all menus.
- `POST /menus` - Add a new menu.
- `PUT /menus/:id` - Update a menu.
- `DELETE /menus/:id` - Delete a menu.

### Feedback Endpoints

- `GET /feedbacks` - Retrieve all feedbacks.
- `POST /feedbacks` - Add a new feedback.
- `PUT /feedbacks/:id` - Update a feedback.
- `DELETE /feedbacks/:id` - Delete a feedback.

### Variety Endpoints

- `GET /variety` - Retrieve all varieties.
- - `POST /variety` - Add a new feedback.
- `PUT /variety/:id` - Update a feedback.
- `DELETE /variety/:id` - Delete a feedback.

## Future Enhancements

- **Enhanced Reporting**: Advanced analytics and reporting features for better decision-making.
- **Mobile App**: Develop a mobile application for even more accessible management.
- **Multilingual Support**: Support for multiple languages to cater to a broader audience.
- **AI Integration**: Implement AI to analyze user feedback and improve system functionalities.
- **Enhanced Feedback Module**: Additional features for categorizing and prioritizing feedback and complaints.

## Contributing

We welcome contributions to enhance the Thaali Center. If you have suggestions or improvements, please create a pull request or submit an issue on GitHub.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
