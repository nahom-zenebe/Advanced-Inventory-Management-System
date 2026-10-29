# 📦 Inventory Management System (MERN Stack)

A full-stack Inventory Management System built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This application allows users to manage products, track stock levels, handle sales and orders, update in real-time using WebSockets, and maintain user profiles.

---

## 🚀 Features

### ✅ Core Functionalities
- 🔄 **Real-Time Data Sync** via WebSockets (Socket.IO)
- 📦 **Product Management**: Add, edit, delete, and view products with categories and stock tracking
- 🧾 **Order Management**: Create and manage customer orders
- 💰 **Sales Tracking**: View daily/weekly/monthly sales and revenue
- 📊 **Stock Monitoring**: Low-stock alerts, live inventory levels
- 👤 **User Profile Pages**: Update profile info, view activity and role
- 🔐 **Authentication & Authorization**: Secure login, JWT-based auth, admin vs staff roles
- 📈 **Dashboard Analytics**: Key performance indicators (KPIs), charts, and summaries

---

## 🧰 Tech Stack

| Tech             | Description                       |
|------------------|-----------------------------------|
| MongoDB          | NoSQL database                    |
| Express.js       | Backend framework for Node.js     |
| React.js         | Frontend UI library               |
| Node.js          | Backend runtime                   |
| Socket.IO        | Real-time communication           |
| Mongoose         | ODM for MongoDB                   |
| Redux Toolkit    | State management on frontend      |
| Tailwind CSS     | Modern, utility-first CSS         |
| JWT              | Authentication & session management |

---
## 📦 Installation

### Docker Compose

To run MongoDB, the backend, and the production frontend together:

```bash
docker compose up --build
```

The frontend is available at `http://localhost:3000` and the API at `http://localhost:3003`.

Stop the services with:

```bash
docker compose down
```

### Local development

Install the backend dependencies and configure the backend environment:

```bash
cd backend
npm install
```

Create `backend/.env`:

```
PORT=3003
MONGODB_URL=mongodb://localhost:27017/inventory
SecretKey=your_jwt_secret
```

Start the backend:

```bash
npm start
```

In a second terminal, install and start the frontend:

```bash
cd frontend
npm install
npm start
```

Run the test suites locally:

```bash
cd backend && npm test
cd ../frontend && CI=true npm test -- --watchAll=false
```

Every push and pull request to `main` or `master` runs the backend tests and the frontend tests/build through GitHub Actions.
