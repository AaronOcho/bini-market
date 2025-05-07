const pool = require('../config/db');

const getPosts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

const createPost = async (req, res) => {
    const { title, description, price, stock, payment_methods } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO posts (title, description, price, stock, payment_methods) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, description, price, stock, payment_methods]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

const deletePost = async (req, res) => {
    try {
        await pool.query('DELETE FROM posts WHERE id = $1', [req.params.id]);
        res.json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    getPosts,
    createPost,
    deletePost
};
