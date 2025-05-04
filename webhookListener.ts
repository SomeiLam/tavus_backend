import express, { Request, Response } from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;

// Body parser middleware to handle JSON
app.use(bodyParser.json());

// Tavus API key and URL
const API_KEY = process.env.TAVUS_API_KEY; // Replace with your Tavus API key
const BASE_URL = 'https://api.tavus.io/v1/conversations';

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Tavus Webhook Listener is running');
});

// Define the callback URL endpoint for receiving Tavus events
app.post('/callback', (req: Request, res: Response) => {
  try {
    // Log the received callback data
    console.log('Received callback data:', req.body);

    // Send an HTTP 200 response to acknowledge receipt of the callback
    res.status(200).send('Callback received successfully');
  } catch (error) {
    console.error('Error processing callback:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
