import { db } from './db.js';    // Import the db connection from db.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // Import jwt

const login = (req, res) => {
  const { email, password } = req.body;

  // Log the incoming request
  console.log('Login attempt for email:', email);

  // Query to check if the email exists in the database
  const query = 'SELECT * FROM signup WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    // Log the results to check the response from the database
    console.log('Database query results:', results);

    // Check if user exists
    if (results.length === 0) {
      console.log('Invalid email');
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check email existence
    console.log('Found user email:', results[0].email);
    console.log("pass", password)
    console.log("db pass", results[0].password)

    // Compare password with the stored hash
    bcrypt.compare(password, results[0].password, (err, isMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      if (isMatch) {
        console.log('Login successful!');
        
        // Generate JWT token
        const token = jwt.sign(
          { userId: results[0].id, email: results[0].email, role:results[0].role },
          'your_secret_key', // Secret key (use environment variables in production)
          { expiresIn: '1h' } // Set expiration time for the token
        );
        // Log the token before sending it back
        console.log('Generated Token:', token);
        return res.status(200).json({ message: 'Login successful!', token });
      } else {
        console.log('Invalid password');
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    });
  });
  
};
export default login;

