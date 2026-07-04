require('dotenv').config();
const express = require('express');
const cors = require('cors');
const notes = require('./routes/notes');
const billing = require('./routes/billing');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static('public'));

app.use('/api/notes', notes);
app.use('/api/billing', billing);

app.get('/healthz', (req, res) => res.json({ ok: true }));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Stickr listening on :${port}`));
