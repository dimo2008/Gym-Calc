import { Request, Response } from 'express';
import pool from '../db';

export interface Expense {
  id?: number;
  category: string;
  amount: number;
  date: string;
  description?: string;
  status?: string;
}

export const getAllExpenses = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query('SELECT * FROM expenses ORDER BY date DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getExpenseById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM expenses WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Expense not found' });
      return;
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const createExpense = async (req: Request, res: Response): Promise<void> => {
  const { category, amount, date, description, status } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO expenses (category, amount, date, description, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [category, amount, date, description, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateExpense = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { category, amount, date, description, status } = req.body;
  try {
    const result = await pool.query(
      'UPDATE expenses SET category = $1, amount = $2, date = $3, description = $4, status = $5 WHERE id = $6 RETURNING *',
      [category, amount, date, description, status, id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Expense not found' });
      return;
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteExpense = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM expenses WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Expense not found' });
      return;
    }
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
