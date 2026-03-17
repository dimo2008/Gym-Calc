# Gym Calc (Backend + Frontend)

This repository contains a full-stack application:
- **Backend**: Node.js + Express + TypeScript + PostgreSQL
- **Frontend**: Angular (compiled to `frontend/dist`)

---

## Prerequisites

- Node.js (v16+)
- npm (comes with Node.js)
- PostgreSQL (v12+)

---

## Backend Setup (TypeScript)

### 1) Install dependencies
```bash
cd backend
npm install
```

### 2) Configure environment
Edit `backend/.env` and set your PostgreSQL credentials:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=gym_calc
DB_USER=postgres
DB_PASSWORD=postgres123
PORT=3000
```

### 3) Initialize database
Create the database and tables using the provided SQL script:
```bash
# Replace `postgres` and credentials as needed
psql -U postgres -c "CREATE DATABASE gym_calc;"
psql -U postgres -d gym_calc -f backend/sql/init.sql
```

### 4) Run backend (development)
```bash
cd backend
npm run dev
```

### 5) Run backend (production)
```bash
cd backend
npm run build
npm start
```

The backend will start on **http://localhost:3000**.

---

## Frontend Setup (Angular)

### 1) Install dependencies
```bash
cd frontend
npm install
```

### 2) Build the frontend
```bash
cd frontend
npm run build
```

### 3) Run frontend (development)
```bash
cd frontend
npm start
```

The frontend will start on **http://localhost:4200**.

---

## Notes

- The backend code is in `backend/src` (TypeScript). Compiled output is in `backend/dist`.
- The frontend code is in `frontend/src` (Angular). Build output is in `frontend/dist`.
- If you need to reset the database, re-run the SQL script at `backend/sql/init.sql`.

---

## Common Commands

### Backend
```bash
cd backend
npm run dev         # Dev (hot reload)
npm run build       # Compile TypeScript
npm start           # Run compiled js
```

### Frontend
```bash
cd frontend
npm start           # Dev server
npm run build       # Production build
```
