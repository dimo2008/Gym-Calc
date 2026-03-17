const pool = require('../db');

const getAllMembers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM members ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMemberById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM members WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Member not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createMember = async (req, res) => {
  const { name, email, phone, membership_type, start_date, status } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO members (name, email, phone, membership_type, start_date, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, email, phone, membership_type, start_date, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMember = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, membership_type, start_date, status } = req.body;
  try {
    const result = await pool.query(
      'UPDATE members SET name = $1, email = $2, phone = $3, membership_type = $4, start_date = $5, status = $6 WHERE id = $7 RETURNING *',
      [name, email, phone, membership_type, start_date, status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Member not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteMember = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM members WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Member not found' });
    }
    res.json({ message: 'Member deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
};
