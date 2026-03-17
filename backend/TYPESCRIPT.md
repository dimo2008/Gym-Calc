# TypeScript Migration Guide

## Overview

The backend has been successfully migrated from JavaScript to TypeScript. All source files are now in the `src/` folder and compiled JavaScript files are generated in the `dist/` folder.

## Project Structure

```
backend/
├── src/                      # TypeScript source files
│   ├── controllers/
│   │   ├── membersController.ts
│   │   ├── paymentsController.ts
│   │   └── expensesController.ts
│   ├── routes/
│   │   ├── members.ts
│   │   ├── payments.ts
│   │   └── expenses.ts
│   ├── db.ts                 # Database connection
│   └── server.ts             # Main application file
├── dist/                     # Compiled JavaScript (auto-generated)
│   └── [JavaScript files]
├── sql/                      # Database scripts
├── tsconfig.json             # TypeScript configuration
├── tsconfig.dev.json         # Development TypeScript config
├── package.json
├── .env                      # Environment variables
└── .gitignore
```

## Key Features

### 1. **Strong Type Safety**
- All functions have proper type annotations
- Request/Response types from Express
- Database queries with typed results
- Interface definitions for data models

### 2. **Build Process**
```bash
npm run build    # Compiles src/ → dist/
npm run dev      # Runs with ts-node-dev (watches for changes)
npm start        # Runs compiled JavaScript from dist/
```

### 3. **Development Experience**
- `npm run dev` uses ts-node-dev for instant reloads
- Source maps included for easy debugging
- Type checking during development and build
- Strict mode enabled for better code quality

## Development Workflow

### Getting Started

```bash
# Install dependencies (first time only)
npm install

# Run in development mode (watches for changes)
npm run dev
```

### Before Deployment

```bash
# Build TypeScript
npm run build

# Start production server
npm start
```

## TypeScript Configuration

### `tsconfig.json` - Production Settings
- **Target:** ES2020
- **Module:** commonjs
- **Strict Mode:** Enabled
- **Source Maps:** Enabled
- **Out Dir:** `dist/`
- **Root Dir:** `src/`

### Key Compiler Options
- `strict: true` - All strict type-checking options enabled
- `noUnusedLocals: true` - Warn about unused local variables
- `noUnusedParameters: true` - Warn about unused parameters
- `noImplicitReturns: true` - Check all function paths return a value
- `noFallthroughCasesInSwitch: true` - Report errors in switch statements

## Adding New Features

### Creating a New Controller

```typescript
// src/controllers/newController.ts
import { Request, Response } from 'express';
import pool from '../db';

export interface NewItem {
  id?: number;
  name: string;
  // ... other fields
}

export const getAll = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query('SELECT * FROM new_table ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// ... other functions
```

### Creating a New Route

```typescript
// src/routes/new.ts
import { Router } from 'express';
import * as newController from '../controllers/newController';

const router = Router();

router.get('/', newController.getAll);
router.post('/', newController.create);

export default router;
```

### Registering the Route

```typescript
// src/server.ts
import newRoutes from './routes/new';

app.use('/api/new', newRoutes);
```

## Type Definitions

### Shared Interfaces

Interfaces are defined in their respective controller files:

```typescript
export interface Member {
  id?: number;
  name: string;
  email?: string;
  phone?: string;
  membership_type?: string;
  start_date?: string;
  status?: string;
}
```

To use in other files:
```typescript
import { Member } from '../controllers/membersController';
```

## Error Handling

### Database Errors
```typescript
try {
  const result = await pool.query(sql, params);
  res.json(result.rows);
} catch (error) {
  // Cast error to Error type for message access
  res.status(500).json({ error: (error as Error).message });
}
```

### Express Error Middleware
```typescript
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
```

## Compilation Targets

The code compiles to ES2020 with CommonJS modules:
- Uses `import/export` syntax in TypeScript
- Outputs `require/module.exports` in JavaScript
- Compatible with Node.js 14+

## Source Maps

Generated `.js.map` files in `dist/` folder enable:
- Step-through debugging
- Error stack traces pointing to original TypeScript
- Better development experience

## Dependencies

### Production
- `express` - Web framework
- `pg` - PostgreSQL client
- `cors` - CORS middleware
- `body-parser` - Request parsing
- `dotenv` - Environment variables

### Development
- `typescript` - TypeScript compiler
- `ts-node-dev` - Development runner with hot reload
- `@types/express` - Express type definitions
- `@types/node` - Node.js type definitions
- `@types/pg` - PostgreSQL type definitions
- `@types/cors` - CORS type definitions

## Tips & Best Practices

### Naming Conventions
- **Files:** `camelCase.ts` (e.g., `membersController.ts`)
- **Classes:** `PascalCase`
- **Functions:** `camelCase`
- **Interfaces:** `PascalCase` with `I` prefix or without
- **Constants:** `UPPER_SNAKE_CASE`

### Unused Variables
Prefix with underscore to suppress warnings:
```typescript
// Unused parameter
export const handler = async (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
};
```

### Type Annotations
Always annotate function parameters and return types:
```typescript
// Good
export const getData = async (id: number): Promise<DataType[]> => {
  // ...
};

// Avoid
export const getData = async (id) => {
  // ...
};
```

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change PORT in .env
echo "PORT=3001" >> .env
```

### Module Not Found Errors
```bash
# Ensure all imports have correct paths
# src/controllers/file.ts
import pool from '../db';  // Correct

// Clean and rebuild
rm -r dist
npm run build
```

### TypeScript Errors
```bash
# Check strict errors
npm run build

# Fix type issues before running
# Look for red squiggles in VS Code
```

## Migration from JavaScript

If you encounter `.js` files in the `src/` folder:
1. The compiler has not been run
2. Run `npm run build`
3. Always edit `.ts` files, not `.js`
4. Delete old `.js` files from `src/`

## Deployment

### Build for Production
```bash
npm run build
npm start
```

### Docker
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Express TypeScript Guide](https://expressjs.com/)
- [Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
