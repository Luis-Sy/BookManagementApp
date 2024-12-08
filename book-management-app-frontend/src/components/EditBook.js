import Input from './Input'
import { useReducer, useRef, useState, useEffect} from 'react'
import DialogModal from './dialogModal.js'
import { useNavigate, useParams } from "react-router-dom";

const initialState = {
    title:"",
    author:"",
    description:"",
    publicationDate:"",
    coverImage:"",
}

function reducer(state, action){
    switch (action.type){
        case 'updateField':
            return {
                ...state,
                [action.field]:action.value
            }
        case 'reset':
            return initialState
        default:
            return state
    }
}
const EditBook = () =>{
	const { id } = useParams();
    const [state, dispatch] = useReducer(reducer, initialState)
	const [dialogMessage, setDialogMessage] = 
	useState({
		"header": "",
		"body": ""
	})
	const [book, setBook] = useState(null);
	
	const dialog = useRef();
	const navigate = useNavigate();
	
		// send a put request to server for editing an existing book
async function tryUpdateBookData(data) {
  // request options
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
	  "authorization": `bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(data)
  };
  
  // api url
  const url = `http://localhost:7000/books${id}`;

  try {
    // Make the request
    const response = await fetch(url, options);

    // Handle errors
    if (!response.ok) {
      throw new Error("Could not submit Book Data");
	  setDialogMessage({"header": "Submission Error", "body": "Could not submit Book Data to server."})
    }
	
	// display success message
	setDialogMessage({"header": "Update Success", "body": "Book Data has been updated successfully."})
	dialog.current.showModal();
	navigate(`/books/${id}`);
    
  } catch (error) {
    console.error("Error:", error);
	dialog.current.showModal();
  }
}
	
    const handleChange=(e)=>{
        dispatch({
            type:'updateField',
            field:e.target.name,
            value:e.target.value
        })
    }
	
    const handleSubmit =(e)=>{
        e.preventDefault()
        console.log('Attempting to update Book data to server: ', state)
		tryUpdateBookData(state)
    }
	
    const handleReset=()=>{
        dispatch({type: 'reset'})
    }
	
	
	useEffect(() => {
		if(!localStorage.getItem("token")){
			alert("You are not authorized for this action");
			navigate("/");
		}
		
    fetch(`http://localhost:7000/books/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setBook(data);
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
		alert("Book does not exist");
		navigate("/");
      });
  }, [id, navigate]);
	
    return(
	<>
		{<DialogModal ref={dialog} header={dialogMessage.header} body={dialogMessage.body}/>}
		<button onClick={() => navigate("/")}>Home</button>
		<h1>Update Book Data</h1>
        <form onSubmit={handleSubmit}>
            <Input label="Title" name="title" value={state.title} onChange={handleChange}/>
            <Input label="Author" name="author" value={state.author} onChange={handleChange}/>
            <Input label="Description" name="description" value={state.description} onChange={handleChange}/>
            <Input label="Publication Date" name="publicationDate" value={state.publicationDate} type="date" onChange={handleChange}/>
            <Input label="Cover Image URL" name="coverImage" value={state.coverImage} onChange={handleChange}/>
            <button type="submit">Submit</button>
            <button type="button" onClick={handleReset}>Reset</button>
        </form>
		
		 
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
		
		</>
    )
}
export default EditBook