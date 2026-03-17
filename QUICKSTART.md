# Quick Start Guide

## Prerequisites
- Node.js v16+ installed
- PostgreSQL installed and running
- npm or yarn installed

## Setup in 5 Minutes

### Step 1: Install Dependencies

Backend:
```bash
cd backend
npm install
```

Frontend (new terminal):
```bash
cd frontend
npm install
```

### Step 2: Create Database

**Windows (PowerShell):**
```powershell
cd backend
.\setup-windows.bat
```

**Windows (Command Prompt):**
```cmd
cd backend
setup-windows.bat
```

**macOS/Linux:**
```bash
psql -U postgres -c "CREATE DATABASE gym_calc;"
psql -U postgres -d gym_calc -f backend/sql/init.sql
```

### Step 3: Build and Start Backend

```bash
cd backend
npm run build
npm run dev
```

Backend runs on http://localhost:3000

### Step 4: Start Frontend (New Terminal)

```bash
cd frontend
npm start
```

Frontend runs on http://localhost:4200

### Step 5: Access Application

Open your browser: http://localhost:4200
cd frontend
npm install
npm start
```
Frontend runs on http://localhost:4200

### Step 4: Access Application
Open browser: http://localhost:4200

## First Steps in App

1. **Add Members**: Go to Members → Add New Member
   - Name: John Doe
   - Email: john@example.com
   - Phone: 555-1234
   - Membership Type: Premium
   - Status: Active

2. **Record Payments**: Go to Payments → Add New Payment
   - Member ID: 1 (or your created member's ID)
   - Amount: 50
   - Date: Today
   - Method: Cash
   - Status: Completed

3. **Add Expenses**: Go to Expenses → Add New Expense
   - Category: Utilities
   - Amount: 100
   - Date: Today
   - Status: Approved

4. **View Dashboard**: Go to Dashboard to see statistics

## Adjust for Your Data

If you need to match your Excel sheets structure, modify:

**For Members sheet:**
- Edit `backend/controllers/membersController.js` and database schema in `backend/sql/init.sql`

**For Payments sheet:**
- Edit `backend/controllers/paymentsController.js` and database schema

**For Expenses sheet:**
- Edit `backend/controllers/expensesController.js` and database schema

Then restart both servers.

## Environment Configuration

Edit `backend/.env` to configure:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=gym_calc
DB_USER=postgres
DB_PASSWORD=postgres123
PORT=4000
```

## Useful Commands

```bash
# Backend
npm run dev      # Development with hot reload
npm start        # Production mode

# Frontend
npm start        # Development server
npm run build    # Production build
npm test         # Run tests
```

## Stop Services

- Backend: Press Ctrl+C in the terminal
- Frontend: Press Ctrl+C in the terminal

## Next Steps

- Customize the database schema for your specific data
- Add more fields to forms as needed
- Deploy using Docker (see docker-compose.yml)
- Add authentication if needed
