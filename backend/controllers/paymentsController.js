const pool = require('../db');

const getAllPayments = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM payments ORDER BY date DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPaymentById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM payments WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPayment = async (req, res) => {
  const { member_id, amount, date, payment_method, status } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO payments (member_id, amount, date, payment_method, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [member_id, amount, date, payment_method, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePayment = async (req, res) => {
  const { id } = req.params;
  const { member_id, amount, date, payment_method, status } = req.body;
  try {
    const result = await pool.query(
      'UPDATE payments SET member_id = $1, amount = $2, date = $3, payment_method = $4, status = $5 WHERE id = $6 RETURNING *',
      [member_id, amount, date, payment_method, status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePayment = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM payments WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.json({ message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
};
