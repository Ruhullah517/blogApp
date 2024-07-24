import { Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = ({ token, setToken }) => {
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
            setToken(null);
            // Optionally, redirect to login page
            // navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    

  return (
    <nav>
      <ul>
        <li><Link to="/">Blogs</Link></li>
        {!token && <li><Link to="/login">Login</Link></li>}
        {!token && <li><Link to="/signup">Signup</Link></li>}
        {token && <li onClick={handleLogout}><Link>Logout</Link></li>}
      </ul>
    </nav>
  );
};

export default Navbar;
