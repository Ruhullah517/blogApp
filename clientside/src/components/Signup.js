import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state before making the request
        try {
            await axios.post('http://localhost:5000/api/auth/signup', { username, email, password });
            // Redirect to the login page after successful signup
            navigate('/login');
        } catch (error) {
            console.error('Failed to signup', error.response.data);
            setError(error.response.data.error || 'Failed to signup');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>SIGNUP</h2>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Signup</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default Signup;
