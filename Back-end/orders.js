
import { db } from './db.js';    // Import the db connection from db.js

// The additem logic
const item = async (req, res) => {
    const orders = req.body; // Expecting an array of orders from the client

    // Check if orders array exists and is not empty
    if (!Array.isArray(orders) || orders.length === 0) {
      return res.status(400).json({ message: 'Invalid order data provided.' });
    }
  
    // Query to insert orders
    const query = `
      INSERT INTO orders (UserId, imageURL, ingredients, name, price, quantity,clientId)
      VALUES ?
    `;
  
    // Prepare values for bulk insertion
    const values = orders.map(order => [
      order.UserId,
      order.imageURL,
      order.ingredients,
      order.name,
      order.price,
      order.quantity,
      order.clientID
    ]);
  
    try {
      // Execute the query
      const [result] = await db.promise().query(query, [values]);
      res.status(201).json({
        message: 'Orders inserted successfully.',
        affectedRows: result.affectedRows
      });
    } catch (error) {
      console.error('Error inserting orders:', error);
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  };
  
// Default export of signup function
export default item;
