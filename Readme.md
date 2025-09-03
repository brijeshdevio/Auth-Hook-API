# Auth-Hook-API 🔐

A robust, multi-tenant Authentication-as-a-Service (AaaS) API gateway. Provides seamless customer onboarding and end-user authentication management through a simple API.

## ✨ Features

- **Multi-Tenancy:** Serve multiple customers (tenants) from a single API.
- **Secure API Key Management:** Customers can create and manage multiple API keys.
- **JWT-Based End-User Auth:** Secure login for end-users using HTTP-only cookies.
- **Built-in Security:** Powered by Argon2 hashing, CORS, Helmet, and rate limiting.
- **Modern Stack:** Built with Node.js, Express, TypeScript, and MongoDB.

---

## 🚀 API Endpoints Overview

### Base URL

All endpoints are prefixed with `/api/v1`.

---

### 1. Customer Management

_These endpoints allow customers (tenants) to manage their account._

| Method | Endpoint            | Description                                | Auth         |
| :----- | :------------------ | :----------------------------------------- | :----------- |
| `POST` | `/customers/signup` | Register a new customer account.           | None         |
| `POST` | `/customers/login`  | Log in a customer using their API Key.     | None         |
| `GET`  | `/customers/me`     | Get the profile of the logged-in customer. | Customer JWT |

---

### 2. API Key Management

_Authenticated customers can manage their API keys here._

| Method   | Endpoint    | Description                                  | Auth         |
| :------- | :---------- | :------------------------------------------- | :----------- |
| `POST`   | `/keys`     | Generate a new API key.                      | Customer JWT |
| `GET`    | `/keys`     | Get a list of all API keys for the customer. | Customer JWT |
| `GET`    | `/keys/:id` | Get a single API key by its ID.              | Customer JWT |
| `PATCH`  | `/keys/:id` | Update an API key's name or status.          | Customer JWT |
| `DELETE` | `/keys/:id` | Permanently delete an API key.               | Customer JWT |

---

### 3. End-User Management

_These endpoints are for the end-users of your customer's applications. Protected by the customer's API Key._

| Method   | Endpoint        | Description                                  | Auth                   |
| :------- | :-------------- | :------------------------------------------- | :--------------------- |
| `POST`   | `/users/signup` | Register a new end-user.                     | `X-API-Key`            |
| `POST`   | `/users/login`  | Authenticate an end-user.                    | `X-API-Key`            |
| `GET`    | `/users/me`     | Get the authenticated end-user's profile.    | `X-API-Key` + User JWT |
| `PATCH`  | `/users/me`     | Update the authenticated end-user's profile. | `X-API-Key` + User JWT |
| `DELETE` | `/users/me`     | Delete the authenticated end-user's account. | `X-API-Key` + User JWT |

---

## 🛠️ Development & Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/brijeshdevio/Auth-Hook-API.git
    cd Auth-Hook-API
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file based on `.env.example`:

    ```bash
    PORT=3000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_jwt_key
    # ... other variables
    ```

4.  **Run in development:**
    ```bash
    npm run dev
    ```

---

## 🚢 Deployment

This app is ready to be deployed on **Render, Railway, or Heroku**.

1.  Set all required environment variables in your deployment dashboard.
2.  Connect your GitHub repository.
3.  Deploy!

---

## 📝 License

This project is licensed under the MIT License.
