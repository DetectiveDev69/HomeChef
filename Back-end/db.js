import mysql from 'mysql2';

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: 'localhost',  // Change to your host
  user: 'root',       // Change to your database username
  password: 'Aala25537828', // Change to your database password
  database: 'mydb'    // Change to your database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Export the `db` connection to use it in other files
export { db };
