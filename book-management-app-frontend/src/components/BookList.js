import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./BookList.css";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:7000/books")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading books...</p>;
  }

  return (
    <div className="book-list">
      {books.map((book) => (
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
      ))}
    </div>
  );
};

export default BookList;
