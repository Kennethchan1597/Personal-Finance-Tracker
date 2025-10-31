# Personal Finance Tracker App

- 💸 **Introduction**
- Built with a React Native front-end and Java Spring Boot back-end services
- Main Functions:
  - Track income and expenses
  - View transaction history
  - Provide account security with JWT authentication

- 🔥 **Repository Structure**
  - 1. Finance-Tracker-App
    - A **React Native** mobile application
    - Communicates with the backend Java Spring APIs via **Axios HTTP requests**
  - 2. Finance-Service
    - Java Spring Boot RESTful API handling all transaction logic:
      - Create, Read, Update, Delete (CRUD) transactions
      - Persist data to a database
      - JWT authentication for secure API access
  - 3. Login-Service
    - Java Spring Boot RESTful API for user authentication
      - User registration and login
      - Password forgot and reset
      - JWT-based authentication
      - Persist user data to a database
  
- **Setup Instructions**
  - Backend Setup
    - Login-Service and Finance-Service:
      - Run both Spring Boot applications on your local machine or server
      - Ensure each service is connected to a database (H2, MySQL, or PostgreSQL)
  - Frontend Setup
    - Navigate to Finance-Tracker-App and install dependencies:
      - npm install
    - Update API endpoints in the following files before running the app:
      - Finance-Tracker-App/api/api/authApi.js
      - Finance-Tracker-App/api/api/transactionApi.js
      - Replace **localhost** with the **IP Adress** that host the backend services
      <p align="center">
          <img src="images/System-Architecture.png" alt="System Architecture" />
      </p>
    - Start the React Native app(Expo):
      - npm start

- **Feature Demonstration**

  - 
  - Uses **Spring Security** and **JWT** for authentication
  - Connected to a **MySQL** database
  - Backend handles **password encryption**
  - Sends automatic registration emails via **Gmail SMTP**
  
- 📈 **Front-end Stack tech**
  - Built with **React.js**
  - Styled using **Tailwind CSS and Shadcn UI**
  - **Axios** used for API calls
  - **React Router** for page navigation

## Architecture Diagram

<p align="center">
  <img src="images/System-Architecture.png" alt="System Architecture" />
</p>
<p align="center">
  <img src="images/System-Flow-Chart.png" alt="System Flow Chart"/>
</p>

## UI Preview

![UI Screenshot](images/ui-screenshot.png)
