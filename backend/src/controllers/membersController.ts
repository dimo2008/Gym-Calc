import { Request, Response } from 'express';
import pool from '../db';

export interface Member {
  id?: number;
  name: string;
  email?: string;
  phone?: string;
  membership_type?: string;
  start_date?: string;
  status?: string;
}

export const getAllMembers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query('SELECT * FROM members ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getMemberById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM members WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Member not found' });
      return;
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const createMember = async (req: Request, res: Response): Promise<void> => {
  const { name, email, phone, membership_type, start_date, status } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO members (name, email, phone, membership_type, start_date, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, email, phone, membership_type, start_date, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateMember = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, email, phone, membership_type, start_date, status } = req.body;
  try {
    const result = await pool.query(
      'UPDATE members SET name = $1, email = $2, phone = $3, membership_type = $4, start_date = $5, status = $6 WHERE id = $7 RETURNING *',
      [name, email, phone, membership_type, start_date, status, id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Member not found' });
      return;
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteMember = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM members WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Member not found' });
      return;
    }
    res.json({ message: 'Member deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
