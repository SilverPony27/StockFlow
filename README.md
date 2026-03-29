# StockFlow v2.0 — Office Management System

## Features
- **Products** — Full CRUD: Add, Edit, Delete, Search products with stock status
- **Orders & Billing** — Track supplier orders, invoices and delivery status
- **Human Resources** — Employee records with salary, department, contact info
- **Payroll** — Employee salary payments with status tracking
- **Projects** — Project tracking with lead, team size, budget and deadlines
- **Data Assets** — Overview of company data assets
- **Dashboard** — Live stats overview (counts + total payroll)

## Folder Structure
```
stockflow/
├── server.js              ← Express backend (port 3000)
├── package.json
├── models/
│   ├── productModel.js
│   ├── employeeModel.js
│   ├── projectModel.js
│   ├── orderModel.js
│   └── paymentModel.js
└── frontend/
    ├── dashboard.html     ← Main app (open this in browser)
    └── login.html         ← Login page
```

## Setup & Run

### 1. Install dependencies
```bash
npm install
```

### 2. Make sure MongoDB is running
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
# or
mongod
```

### 3. Start the backend server
```bash
npm start
# Server runs on http://localhost:3000
```

### 4. Open the frontend
Open `frontend/login.html` in your browser.

**Demo credentials:**
- Username: `Admin1`
- Password: `Admin@123`

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | `/products` | List / Add product |
| GET/PUT/DELETE | `/products/:id` | Get / Update / Delete |
| GET/POST | `/employees` | List / Add employee |
| GET/PUT/DELETE | `/employees/:id` | Get / Update / Delete |
| GET/POST | `/orders` | List / Add order |
| GET/PUT/DELETE | `/orders/:id` | Get / Update / Delete |
| GET/POST | `/payments` | List / Add payment |
| GET/PUT/DELETE | `/payments/:id` | Get / Update / Delete |
| GET/POST | `/projects` | List / Add project |
| GET/PUT/DELETE | `/projects/:id` | Get / Update / Delete |
| GET | `/stats` | Dashboard summary stats |
