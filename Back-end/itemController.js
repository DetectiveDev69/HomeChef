
import { db } from './db.js';    // Import the db connection from db.js

// The additem logic
const item = async (req, res) => {
  const { name, price, imageURL, ingredients,UserId } = req.body;
  console.log(req.body);

  try {


    // Insert user into the database using the db connection
    const insertQuery = 'INSERT INTO menu_items (name, price, imageURL, ingredients,UserId) VALUES (?, ?, ?, ?,?)';

    db.query(insertQuery, [name, price,imageURL,ingredients,UserId], (err, results) => {
      if (err) {
        console.error('Error inserting data: ', err);
        return res.status(500).send('Error registering user');
      }
      // Respond with success message
      return res.status(201).json({ message: 'item added succefully' });
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Default export of signup function
export default item;
