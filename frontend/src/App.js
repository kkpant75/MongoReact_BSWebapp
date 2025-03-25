import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!query) return;
 
    setLoading(true);
    setError('');
	setBooks([]);
    try {
      const response = await axios.get(`http://localhost:5000/search?q=${query}`);
      console.log('APP response.data',response.data)
	  setBooks(response.data);
    } catch (err) {
      setBooks([]);
	  setError('Error fetching books. Please try again later.');
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Book Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books..."
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Search for books...' : 'Search'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

     <div className="book-list">
		  {Array.isArray(books) && books.length === 0 ? (
			<p>No books found...</p>			
		  ) : (
			Array.isArray(books) && books.length >0 && books.map((book, index) => (
			  <div key={index} className="book-item">
				<h3>Title: {book.volumeInfo?.title}</h3>
				<h4>Year: {book.volumeInfo?.year}</h4>
				<p>Authors: {book.volumeInfo?.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}</p>
				<p>Description: {book.volumeInfo?.description}</p>
			  </div>
			))
		  )}
		</div>
    </div>
  );
};

export default App;
