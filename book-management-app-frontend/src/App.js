import './App.css';
import { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";
import AdminLogin from './components/AdminLogin.js'
import CreateBook from './components/CreateBook.js'
import EditBook from './components/EditBook.js'
import TopBar from './components/TopBar.js'
import DialogModal from './components/dialogModal.js'

function App() {
	
	const [userToken, setUserToken] = useState(localStorage.getItem("token"));
	const [dialogMessage, setDialogMessage] = 
	useState({
		"header": "",
		"body": ""
	})
	
	const dialog = useRef();
	
	useEffect(()=>{
		setUserToken(localStorage.getItem("token"));
	}, []);	
	
	const handleLogOut = () => {
		localStorage.clear();
		setUserToken(null);
		window.location.reload();
	};
  
  return (
    <div className="App">
	{<DialogModal ref={dialog} header={dialogMessage.header} body={dialogMessage.body}/>}
	<BrowserRouter>
	<TopBar userToken={userToken} onLogOut={handleLogOut} />
    <Routes>
      <Route path="/" element={<BookList />} />
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/create" element={<CreateBook />} />
      <Route path="/books/:id" element={<BookDetails />} />
      <Route path="/books/edit/:id" element={<EditBook />} />
	  {/* default route to home*/}
	  <Route path="*" element={<Navigate to="/" />} />
   </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
