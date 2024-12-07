import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./BookDetails.css";
const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:7000/books/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading book details...</p>;
  }

  if (!book) {
    return <p>Book not found!</p>;
  }

  return (
    <div className="book-details">
      <div className="book-details-container">
        <img
          src={book.coverImage}
          alt={`${book.title} cover`}
          className="book-cover"
        />
        <div className="book-info">
          <h1>{book.title}</h1>
          <p>
            <strong>Author:</strong> {book.author}
          </p>
          <p>{book.description}</p>
          <p>
            <strong>Publication Date:</strong> {book.publicationDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
