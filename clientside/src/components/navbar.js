import { Link } from "react-router-dom";

const Navbar = ({ token, setToken }) => {
    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token');

    };

    return <>
        <nav>
            <ul>
                <li><Link to="/">Blogs</Link></li>
                {!token && <li><Link to="/login">Login</Link></li>}
                {!token && <li><Link to="/signup">Signup</Link></li>}
                {token && <li onClick={handleLogout}><Link >Logout</Link></li>}
            </ul>
        </nav>
    </>
};

export default Navbar;