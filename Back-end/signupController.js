import bcrypt from 'bcryptjs';  // Use bcryptjs instead of bcrypt
import { db } from './db.js';    // Import the db connection from db.js

// The signup logic
const signup = async (req, res) => {

  const { username, email, password, role } = req.body;
  console.log(req.body)

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // Insert user into the database using the db connection
    const insertQuery = 'INSERT INTO signup (username, email, password, role) VALUES (?, ?, ?, ?)';
    db.query(insertQuery, [username, email,hashedPassword, role], (err, results) => {
      if (err) {
        console.error('Error inserting data: ', err);
        return res.status(500).send('Error registering user');
      }
      // Respond with success message
      return res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Default export of signup function
export default signup;
