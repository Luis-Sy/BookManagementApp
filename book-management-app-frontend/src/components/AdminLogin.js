import Input from './Input.js'
import { useReducer} from 'react'

const initialState = {
    username: '',
    password: ''
}

function reducer(state, action){
    //console.log(action.type)
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
const AdminLogin = ()=>{
    const [state, dispatch] = useReducer(reducer, initialState)
	
	
    const handleChange=(e)=>{
        dispatch({
            type:'updateField',
            field:e.target.name,
            value:e.target.value
        })
    }
	
	// send a post request to server for logging in
async function tryLogin(data) {
  // request options
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  // api url
  const url = "http://localhost:7000/login";

  try {
    // Make the request
    const response = await fetch(url, options);

    // Handle errors
    if (!response.ok) {
      throw new Error("Login failed: Unauthorized");
    }

    // Parse response as JSON
    const responseData = await response.json();

    // Store the token in localStorage
    localStorage.setItem("token", responseData.token); // Ensure your backend returns a `token` field
    console.log("Login successful, token stored:", responseData.token);
  } catch (error) {
    console.error("Error:", error);
  }
}

	
    const handleSubmit =(e)=>{
        e.preventDefault()
        console.log('Attempting login with Data: ', state)
		tryLogin(state);
    }
	
    const handleReset=()=>{
        dispatch({type: 'reset'})
    }
	
    return(
        <form onSubmit={handleSubmit}>
            <Input label="Username" name="username" value={state.username} onChange={handleChange}/>
            <Input label="Password" name="password" value={state.password} onChange={handleChange}/>
            <button type="submit">Submit</button>
            <button type="button" onClick={handleReset}>Reset</button>
        </form>
    )
}
export default AdminLogin