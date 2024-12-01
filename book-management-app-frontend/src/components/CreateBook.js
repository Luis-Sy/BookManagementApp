import Input from './Input'
import { useReducer, useRef, useState} from 'react'
import DialogModal from './dialogModal.js'

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
const CreateBook = ()=>{
    const [state, dispatch] = useReducer(reducer, initialState)
	const [dialogMessage, setDialogMessage] = 
	useState({
		"header": "",
		"body": ""
	})
	
	const dialog = useRef();
	
		// send a post request to server for logging in
async function tryCreateNewBook(data) {
  // request options
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
	  "authorization": `bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(data)
  };
  // api url
  const url = "http://localhost:7000/books";

  try {
    // Make the request
    const response = await fetch(url, options);

    // Handle errors
    if (!response.ok) {
      throw new Error("Could not submit Book Data");
	  setDialogMessage({"header": "Submission Error", "body": "Could not submit Book Data to server."})
    }
	
	// display success message
	setDialogMessage({"header": "New Book Created", "body": "New Book data successfully submitted to the server."})
	dialog.current.showModal();
    
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
        console.log('Attempting to submit new Book to server: ', state)
		tryCreateNewBook(state)
    }
	
    const handleReset=()=>{
        dispatch({type: 'reset'})
    }
	
    return(
	<>
		{<DialogModal ref={dialog} header={dialogMessage.header} body={dialogMessage.body}/>}
        <form onSubmit={handleSubmit}>
            <Input label="Title" name="title" value={state.title} onChange={handleChange}/>
            <Input label="Author" name="author" value={state.author} onChange={handleChange}/>
            <Input label="Description" name="description" value={state.description} onChange={handleChange}/>
            <Input label="Publication Date" name="publicationDate" value={state.publicationDate} type="date" onChange={handleChange}/>
            <Input label="Cover Image URL" name="coverImage" value={state.coverImage} onChange={handleChange}/>
            <button type="submit">Submit</button>
            <button type="button" onClick={handleReset}>Reset</button>
        </form>
		</>
    )
}
export default CreateBook