const express = require("express");
const mysql = require("mysql");
const app = express();

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'user_login',
});

// Set the EJS view engine
app.set('view engine', 'ejs');

// Define a route to fetch student data and render the webpage
app.get('/', (req, res) => {
  const query = 'SELECT user_rollnumber, username FROM user_login';
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }

    console.log('Connected to the database'); // Print the connection message

    connection.query(query, (err, results) => {
      connection.release(); // Release the connection

      if (err) {
        throw err;
      }

      const students = results;

      res.render('index', { students });
    });
  });
});

// Start the serveAr
app.listen(3000, () => {
  console.log('Server started on port 3000');
});