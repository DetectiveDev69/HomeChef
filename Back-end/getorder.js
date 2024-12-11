
import { db } from './db.js';    // Import the db connection from db.js

// The additem logic
const getorder = async (req, res) => {
  const userId = req.query.userId; // Accessing the query parameter
  console.log(req)
  const query = `SELECT * FROM orders`;  // Adjust the query based on your database
  // Execute the query and send the results back to the frontend
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send({ message: 'Error fetching orders' });
    } else {
      res.status(200).json(results);
    }
  });
};
export default getorder;

