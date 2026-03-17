# Gym Calc Dashboard - Full Stack Application

A complete full-stack application built with Node.js (TypeScript), Angular, and PostgreSQL for managing gym members, payments, and expenses.

## Project Structure

```
Gym Calc/
├── backend/
│   ├── src/                  # TypeScript source files
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── db.ts
│   │   └── server.ts
│   ├── dist/                 # Compiled JavaScript (generated)
│   ├── sql/
│   ├── tsconfig.json
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   └── app.component.ts
│   │   └── index.html
│   ├── package.json
│   ├── angular.json
│   └── README.md
└── README.md
```

## Prerequisites

- **Node.js** (v16 or higher)
- **PostgreSQL** (v12 or higher)
- **npm** (comes with Node.js)
- **Angular CLI** (optional, will use npx)

## Installation & Setup

### 1. Database Setup

**For Windows Users (PowerShell - Recommended):**
```powershell
cd backend
.\setup-db.ps1
```
The script will automatically find PostgreSQL and initialize the database.

**For Windows Users (Command Prompt):**
```cmd
cd backend
setup-db.bat
```

**For macOS/Linux Users:**
```bash
# Create the database
createdb -U postgres gym_calc

# Run the initialization script
psql -U postgres -d gym_calc -f backend/sql/init.sql
```

**If you get "psql not found" error:**
1. Install PostgreSQL from https://www.postgresql.org/download/
2. During installation:
   - Set a password for the `postgres` user
   - Make sure to check "Add PostgreSQL to PATH" during installation
3. Restart your computer/terminal
4. Try the setup script again

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Build TypeScript to JavaScript
npm run build

# Configure environment variables
# Edit .env file with your database credentials:
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=gym_calc
# DB_USER=postgres
# DB_PASSWORD=your_password_here
# PORT=3000

# Start the backend server (development with hot reload)
npm run dev

# Or build and start in production
npm run build
npm start
```

The backend will run on `http://localhost:3000`

**Note:** 
- TypeScript source files are in `src/` folder
- Compiled JavaScript files are generated in `dist/` folder (auto-generated, don't edit)
- `npm run build` compiles TypeScript to JavaScript
- `npm run dev` uses ts-node-dev for development and watches for changes

### 3. Frontend Setup (in a new terminal)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start

# The application opens at http://localhost:4200
```

## Features

### Dashboard
- View total members count
- Display total income from payments
- Display total expenses
- Calculate and show net profit
- Recent payments and expenses data

### Members Management
- Add new members
- Edit member information
- Delete members
- Filter by status
- Track membership types

### Payments Management
- Record member payments
- Track payment dates and methods
- Monitor payment status
- View payment history

### Expenses Management
- Record gym expenses
- Categorize expenses (Utilities, Maintenance, Salary, Equipment, Rent, Supplies, Other)
- Track expense status
- Add descriptions for expenses

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

## Database Schema

### members table
- id (Primary Key)
- name (String)
- email (String)
- phone (String)
- membership_type (String: basic, premium, vip)
- start_date (Date)
- status (String: active, inactive, suspended)
- created_at (Timestamp)
- updated_at (Timestamp)

### payments table
- id (Primary Key)
- member_id (Foreign Key)
- amount (Decimal)
- date (Date)
- payment_method (String: cash, credit_card, bank_transfer, online)
- status (String: completed, pending, failed)
- created_at (Timestamp)
- updated_at (Timestamp)

### expenses table
- id (Primary Key)
- category (String)
- amount (Decimal)
- date (Date)
- description (Text)
- status (String: pending, approved, paid)
- created_at (Timestamp)
- updated_at (Timestamp)

## Customization

### Adding New Fields to Members
1. Update the database schema in `backend/sql/init.sql`
2. Update the Member interface in `frontend/src/app/services/api.service.ts`
3. Update the form in `frontend/src/app/components/members/members.component.ts`
4. Update the controller in `backend/controllers/membersController.js`

### Adding New Expense Categories
Edit the expense categories in both:
- `frontend/src/app/components/expenses/expenses.component.ts` (form dropdown)
- Backend validation if needed

## Troubleshooting

### Backend Connection Error
- Make sure PostgreSQL is running
- Verify database credentials in `.env` file
- Check if the database and tables are created

### Frontend can't reach backend
- Ensure backend is running on port 4000
- Check browser console for CORS errors
- Verify API_URL in `frontend/src/app/services/api.service.ts`

### Port already in use
- Backend: Change PORT in `.env` file
- Frontend: Run `ng serve --port 4300` for different port

## Production Deployment

### Backend
```bash
cd backend
npm install --production
npm start
```

### Frontend
```bash
cd frontend
npm run build
```

The built files will be in `frontend/dist/` directory.

## License

MIT

## Support

For issues or questions, please check the individual README files in backend and frontend folders.
