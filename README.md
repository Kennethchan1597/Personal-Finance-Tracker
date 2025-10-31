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
    - Start the React Native app(Expo):
      - npm start
<p align="center">
  <img src="/README_images/transactionAxios.png" alt="transactionAxios" width="50%" />
</p>
<p align="center">
  <img src="/README_images/authAxios.png" alt="authAxios" width="50%" />
</p>

## Architecture Diagram

## Feature Demonstration

## UI Preview

![UI Screenshot](images/ui-screenshot.png)

