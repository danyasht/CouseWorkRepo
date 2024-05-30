const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/keys', (req, res) => {
    connection.query('SELECT * FROM KeyEntries', (error, results) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(200).json(results);
        }
    });
});

app.get('/keys/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM KeyEntries WHERE id = ?', [id], (error, results) => {
        if (error) {
            res.status(500).send(error);
        } else if (results.length === 0) {
            res.status(404).send('Key not found');
        } else {
            res.status(200).json(results[0]);
        }
    });
});

app.delete('/keys/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM KeyEntries WHERE id = ?', [id], (error, results) => {
        if (error) {
            res.status(500).send(error);
        } else if (results.affectedRows === 0) {
            res.status(404).send('Key not found');
        } else {
            res.status(200).send('Key deleted successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
