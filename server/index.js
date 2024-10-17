import express from "express";
import sqlite from "sqlite3";
import cors from "cors";


const sqlite3 = sqlite.verbose();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('employee_management.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS departments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      department_id INTEGER,
      address TEXT,
      FOREIGN KEY (department_id) REFERENCES departments (id)
    )
  `);
});

app.get('/api/departments', (req, res) => {
  db.all('SELECT * FROM departments', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/departments', (req, res) => {
  const { name, description } = req.body;
  db.run(
    'INSERT INTO departments (name, description) VALUES (?, ?)',
    [name, description],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

app.get('/api/employees', (req, res) => {
  const { name, department_id } = req.query;
  let query = 'SELECT e.*, d.name as department_name FROM employees e LEFT JOIN departments d ON e.department_id = d.id';
  const params = [];

  if (name || department_id) {
    query += ' WHERE';
    if (name) {
      query += ' e.name LIKE ?';
      params.push(`%${name}%`);
    }
    if (department_id) {
      if (name) query += ' AND';
      query += ' e.department_id = ?';
      params.push(department_id);
    }
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/employees', (req, res) => {
  const { name, department_id, address } = req.body;
  db.run(
    'INSERT INTO employees (name, department_id, address) VALUES (?, ?, ?)',
    [name, department_id, address],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
