# PaperNest – Stationery E-Commerce Website

PaperNest is a full-stack stationery e-commerce web application built using React and FastAPI. It provides a convenient platform for browsing stationery products, managing a shopping cart, creating user accounts, and placing orders.

## Features

- **Product Catalogue:** Browse stationery products.
- **Shopping Cart:** Add and manage products in the cart.
- **User Authentication:** User registration and login.
- **Checkout:** Submit customer and order details.
- **Contact Form:** Send messages through the website.
- **REST API:** Backend APIs built with FastAPI.
- **Database Integration:** Store application data using SQLite and SQLAlchemy.

## Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend |
| Vite | Frontend development environment |
| JavaScript | Frontend functionality |
| CSS | Styling |
| Python | Backend |
| FastAPI | REST API |
| SQLAlchemy | Database ORM |
| SQLite | Database |
| Git & GitHub | Version control |

## Project Structure

```text
stationery-ecommerce/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── database.py
│   └── requirements.txt
│
└── README.md
```

## Installation and Setup

### Prerequisites

- Python
- Node.js and npm
- Git

### 1. Clone the Repository

```bash
https://github.com/dev4455256/stationery-ecommerce.git
cd stationery-ecommerce
```

### 2. Run the Backend

```bash
cd backend
python -m venv venv
```

Activate the virtual environment on Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the backend:

```bash
uvicorn main:app --reload
```

Backend: `http://127.0.0.1:8000`

API Documentation: `http://127.0.0.1:8000/docs`

### 3. Run the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite, usually `http://localhost:5173`.

## Database

PaperNest uses SQLite with SQLAlchemy to manage application data. The database is created locally when the backend initializes.

## Future Improvements

- Online payment gateway integration.
- Admin dashboard and product management.
- Production-grade authentication and API security.
- Cloud deployment.
- Order tracking and management.

## Project Purpose

Developed as a hands-on full-stack development project to gain practical experience with frontend development, backend APIs, database integration, and application architecture.

