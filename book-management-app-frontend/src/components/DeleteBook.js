import Input from './Input'
import { useRef, useState, useEffect } from 'react'
import DialogModal from './dialogModal.js'
import { useNavigate, useParams } from "react-router-dom";

const DeleteBook = () =>{
	const { id } = useParams();
	const [dialogMessage, setDialogMessage] = 
	useState({
		"header": "",
		"body": ""
	})
	const [book, setBook] = useState(null);
	
	const dialog = useRef();
	const navigate = useNavigate();
	
		// send a put request to server for editing an existing book
async function tryDeleteBookData() {
	
	const token = localStorage.getItem("token");
  // request options
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
	  "authorization": `bearer ${token}`
    },
  };
  
  // api url
  const url = `http://localhost:7000/books/${id}`;

  try {
    // Make the request
    const response = await fetch(url, options);

    // Handle errors
    if (!response.ok) {
		setDialogMessage({"header": "Deletion Error", "body": "Could not delete Book Data from server."})
		throw new Error("Could not submit Book Data"); 
    }
	
	// display success message
	setDialogMessage({"header": "Deletion Success", "body": "Book Data has been deleted successfully."})
	dialog.current.showModal();
	navigate("/");
    
  } catch (error) {
    console.error("Error:", error);
	dialog.current.showModal();
  }
}
	
	useEffect(() => {
		if(!localStorage.getItem("token")){
			alert("You are not authorized for this action");
			navigate("/");
		}
		
    fetch(`http://localhost:7000/books/${id}`)
      .then((response) => response.json())
      .then((data) => {
		  if(!data.id) {
			  alert("Book not found")
			  navigate("/")
		  }
        setBook(data);
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
		alert("Book does not exist");
		navigate("/");
      });
  }, [id]);
	
    return(
	<>
		{<DialogModal ref={dialog} header={dialogMessage.header} body={dialogMessage.body}/>}
		<button onClick={() => navigate("/")}>Home</button>
		<h1>Confirm Deletion of Book Data</h1>
        <button onClick={tryDeleteBookData}>Confirm Deletion</button>
		
	{book ?
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
	:
	<p>loading data...</p>
	}
		
		</>
    )
}
export default DeleteBook