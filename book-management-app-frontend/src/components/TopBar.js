import { useNavigate, Link } from "react-router-dom";

function TopBar({ userToken, onLogOut }) {
	const navigate = useNavigate();
	
  return (
    <>
      {!userToken ? (
        <div id="topBar">
          <Link to="/login">
            <h1>Admin Login</h1>
          </Link>
        </div>
      ) : (
        <div id="topBar">
          <h1>Logged in as Admin</h1>
          <button onClick={onLogOut}>Log Out</button>
          <button onClick={() => {navigate("/create")}}>Create Book</button>
        </div>
      )}
    </>
  );
}

export default TopBar;
