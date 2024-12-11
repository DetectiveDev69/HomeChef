
import { db } from './db.js';    // Import the db connection from db.js

// The additem logic
const getitems = async (req, res) => {

  try {


    // Insert user into the database using the db connection
    const selectQuery = 'SELECT * FROM menu_items';
    db.query(selectQuery, (err, results) => {
      if (err) {
        console.error('Error fetching  data: ', err);
        return res.status(500).send('Error registering user');
      }
      let k = 0;
      results.forEach(item => {
        item.quantity = 0;  
      });
      res.json(results)
      console.log(results);
  
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
// Default export of signup function
export default getitems;
