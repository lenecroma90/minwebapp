const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'minapp'
});

app.get('/api/book', (req, res) => {
  db.query('SELECT * FROM book', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/leggtil', (req, res) => {
  const { title, author } = req.body;
  db.query(
    'INSERT INTO book (title, author) VALUES (?, ?)',
    [title, author],
    (err) => {
      if (err) return res.send('Feil i databasen: ' + err.message);
      res.redirect('/booklist.html');
    }
  );
});

app.listen(3000, () => {
  console.log('Server kjører på http://localhost:3000');
});
