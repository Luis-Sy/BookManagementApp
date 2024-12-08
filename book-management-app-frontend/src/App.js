import './App.css';
import { useState, useEffect } from 'react'
import AdminLogin from './components/AdminLogin.js'
import CreateBook from './components/CreateBook.js'
import EditBook from './components/EditBook.js'
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";

function App() {
	
	const [userToken, setUserToken] = useState(null);
	
  function handleLogOut(){
   localStorage.clear();
   navigate("/");
  }
	
	useEffect(()=>{
		setUserToken(localStorage.getItem("token"));
	},[userToken]);	
  return (
    <div className="App">
	{!userToken ? 
    <div id="topBar">
      <Link to="/login">
        <h1>Admin Login</h1>
      </Link>
    </div>
    : 
    <div id="topBar">
      <h1>Logged in as Admin</h1>
      <button onclick={handleLogOut}>Log Out</button>
    </div>
    }
	
	<BrowserRouter>
    <Routes>
      <Route path="/" element={<BookList />} />
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/create" element={<CreateBook />} />
      <Route path="/books/:id" element={<BookDetails />} />
      <Route path="/books/edit/:id" element={<EditBook />} />
   </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
