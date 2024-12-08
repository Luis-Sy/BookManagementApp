import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./BookList.css";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:7000/books")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        setFilteredBooks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(filtered);
  }, [searchTerm, books]);

  if (loading) {
    return <p>Loading books...</p>;
  }

  return (
    <div className="book-list-container">
      <input
        type="text"
        placeholder="Search books by title or author"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <div className="book-list">
      {filteredBooks.length === 0 ? (
          <p>No books found</p>
      ) : (
        filteredBooks.map((book) => (
          <div key={book.id} className="book-card">
            <img
              src={book.coverImage}
              alt={`${book.title} cover`}
              className="book-cover"
            />
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <Link to={`/books/${book.id}`}>View Details</Link>
          </div>
        ))
      )}
      </div>
    </div>
  );
};

export default BookList;
