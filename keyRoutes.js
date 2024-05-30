const express = require('express');
const router = express.Router();
const connection = require('../db');

router.get('/', (req, res) => {
    const query = 'SELECT * FROM KeyEntries';
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM KeyEntries WHERE id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Key entry not found' });
        }
        res.json(results[0]);
    });
});

module.exports = router;
