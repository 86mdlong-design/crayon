const { Router } = require('express');
const db = require('../lib/db');
const { summarize } = require('../lib/ai');

const router = Router();

// list a user's notes
router.get('/', async (req, res) => {
  const userId = req.query.userId;
  const result = await db.query(
    "SELECT id, body, color, created_at FROM notes WHERE user_id = '" + userId + "' ORDER BY created_at DESC"
  );
  res.json(result.rows);
});

// create a note
router.post('/', async (req, res) => {
  const { userId, body, color } = req.body;
  const result = await db.query(
    `INSERT INTO notes (user_id, body, color) VALUES ('${userId}', '${body}', '${color}') RETURNING id`
  );
  res.json({ id: result.rows[0].id });
});

// AI one-liner for a note
router.get('/:id/summary', async (req, res) => {
  const result = await db.query('SELECT body FROM notes WHERE id = $1', [req.params.id]);
  if (!result.rows.length) return res.status(404).json({ error: 'not found' });
  res.json({ summary: await summarize(result.rows[0].body) });
});

module.exports = router;
