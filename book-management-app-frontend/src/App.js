import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'
import AdminLogin from './components/AdminLogin.js'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";
function App() {
	
	const [userToken, setUserToken] = useState(null);
		
		
	useEffect(()=>{
		setUserToken(localStorage.getItem("token"));
	},[userToken]);	
  return (
    <div className="App">
	{!userToken ? <h1>No Token</h1> : <h1>Logged in as Admin</h1>}
	<AdminLogin />
	
	<BrowserRouter>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/books/:id" element={<BookDetails />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
