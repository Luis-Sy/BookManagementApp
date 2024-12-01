import './App.css';
import { useState, useEffect } from 'react'
import AdminLogin from './components/AdminLogin.js'
import CreateBook from './components/CreateBook.js'

function App() {
	
	const [userToken, setUserToken] = useState(null);
		
		
	useEffect(()=>{
		setUserToken(localStorage.getItem("token"));
	},[userToken]);	
  return (
    <div className="App">
	{!userToken ? <h1>No Token</h1> : <h1>Logged in as Admin</h1>}
	<AdminLogin />
	<h1>Create a new Book</h1>
	<CreateBook />
    </div>
  );
}

export default App;
