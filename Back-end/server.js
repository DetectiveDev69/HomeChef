import express, { json } from 'express';
import cors from 'cors';
import signup from './signupController.js';  // Default import
import  login  from './loginController.js'; // Import the login function
import item from './itemController.js';// Import the item function
import getitems from './getitems.js';
import orders from './orders.js'
import getorder from './getorder.js'

const port = 3000;
const app = express();
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

app.use(json());
app.use(cors());




app.post('/signup', signup); // Use the signup method from signupController
app.post('/login', login); // Use the login method from loginController
app.post('/item',item); 
app.get('/getitems',getitems);
app.post('/orders',orders);
app.get('/getorders',getorder);






app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
