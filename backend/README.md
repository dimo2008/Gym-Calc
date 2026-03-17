# Gym Calc Backend

Backend API for the Gym Calc Dashboard built with Node.js and Express.

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
     DB_PASSWORD=your_password_here
     PORT=3000
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

The server will run on `http://localhost:3000`

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
