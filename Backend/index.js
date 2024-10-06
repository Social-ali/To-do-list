const connectToMongo = require('./db'); // Import the database connection
const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors'); // Import cors

// Connect to MongoDB
connectToMongo();

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS with specific configuration
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend origin
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization,auth-token' // Allow custom headers
}));

// Available routes
app.use('/api/auth', require('./routes/auth')); // Ensure this path is correct
app.use('/api/notes', require('./routes/notes')); // Ensure this path is correct

// Root route
app.get('/', (req, res) => {
  res.send('Hello World with ali!');
});

// Start the server
app.listen(port, () => {
  console.log(`inotebook backend listening at http://localhost:${port}`);
});
