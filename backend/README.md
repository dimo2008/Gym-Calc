# Gym Calc Backend

Backend API for the Gym Calc Dashboard built with Node.js, Express, and TypeScript.

## Project Structure

```
backend/
├── src/
│   ├── controllers/      # Business logic
│   │   ├── membersController.ts
│   │   ├── paymentsController.ts
│   │   └── expensesController.ts
│   ├── routes/          # API routes
│   │   ├── members.ts
│   │   ├── payments.ts
│   │   └── expenses.ts
│   ├── db.ts            # Database connection
│   └── server.ts        # Main server file
├── dist/                # Compiled JavaScript (generated)
├── sql/                 # Database initialization scripts
├── tsconfig.json        # TypeScript configuration
├── package.json
└── .env                 # Environment variables
```

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Database Setup**

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
   psql -U postgres -d gym_calc -f sql/init.sql
   ```

   **If psql is not found:**
   - Make sure PostgreSQL is installed from https://www.postgresql.org/download/
   - During installation, remember your password and ensure you selected "Add PostgreSQL to PATH"
   - Or add PostgreSQL to your PATH: `C:\Program Files\PostgreSQL\15\bin` (adjust version as needed)

3. **Configure Environment**
   - Edit `.env` file with your database credentials:
     ```
     DB_HOST=localhost
     DB_PORT=5432
     DB_NAME=gym_calc
     DB_USER=postgres
     DB_PASSWORD=your_password_here
     PORT=3000
     NODE_ENV=development
     ```

4. **Build TypeScript**
   ```bash
   npm run build
   ```

5. **Run the Server**
   - Development with hot reload (watches for changes):
     ```bash
     npm run dev
     ```
   - Production:
     ```bash
     npm run build
     npm start
     ```

The server will run on `http://localhost:3000`

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Database Setup**
   - Create a PostgreSQL database named `gym_calc`
   - Run the initialization script:
     ```bash
     psql -U postgres -d gym_calc -f sql/init.sql
     ```

3. **Configure Environment**
   - Edit `.env` file with your database credentials:
     ```
     DB_HOST=localhost
     DB_PORT=5432
     DB_NAME=gym_calc
     DB_USER=postgres
     DB_PASSWORD=postgres123
     PORT=4000
     ```

4. **Run the Server**
   - Development with hot reload:
     ```bash
     npm run dev
     ```
   - Production:
     ```bash
     npm start
     ```

The server will run on `http://localhost:4000`

## API Endpoints

### Members
- `GET /api/members` - Get all members
- `GET /api/members/:id` - Get member by ID
- `POST /api/members` - Create new member
- `PUT /api/members/:id` - Update member
- `DELETE /api/members/:id` - Delete member

### Payments
- `GET /api/payments` - Get all payments
- `GET /api/payments/:id` - Get payment by ID
- `POST /api/payments` - Create new payment
- `PUT /api/payments/:id` - Update payment
- `DELETE /api/payments/:id` - Delete payment

### Expenses
- `GET /api/expenses` - Get all expenses
- `GET /api/expenses/:id` - Get expense by ID
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense
