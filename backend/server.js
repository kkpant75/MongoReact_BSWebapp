const uri = process.env.DATABASE_URL||'mongodb://booksearch-db:27017/booksearch'; // Change to your URI if it's different
//const uri = 'mongodb://localhost:27017/booksearch'; // Uncomment this if you're using localhost
console.log('process.env.DATABASE_URL..',process.env.DATABASE_URL)
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

// Define a Mongoose Schema for the 'books' collection
const bookSchema = new mongoose.Schema({
  volumeInfo: {
    title: String/* ,
    authors: String,
    year: Number,
    description: String */
  }
});

// Create the Mongoose model
const Book = mongoose.model('books', bookSchema);

// Connect to MongoDB using Mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Define the /search route
app.get('/search', async (req, res) => {
  const query = req.query.q; // Book search query

  if (!query) {
    return res.json({ message: 'No search query provided' });
  }

  try {
    // Search for books with titles that match the query (case-insensitive)
    const books = await Book.find({
      "volumeInfo.title": { $regex: query, $options: 'i' } // Case-insensitive search
    });

    // If no books are found, return a message
    if (books.length === 0) {
      return res.json({ message: 'No books found' });
    }
	
	console.log(books);
    res.json(books); // Return the filtered books as JSON
    

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
