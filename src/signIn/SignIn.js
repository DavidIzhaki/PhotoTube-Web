import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';
import { useUser } from '../UserContext';
import Logo from '../Icons/Logo'
import MailIcon from '../Icons/MailIcon'
import PasswordIcon from '../Icons/PasswordIcon'
import LeftMenu from '../LeftMenu/LeftMenu';
import Sidebar from '../LeftMenu/Sidebar';
function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useUser();
    const handleSignIn = (e) => {
        e.preventDefault();

        // Check if username or password are empty
        if (!username || !password) {
            alert('fields cannot be empty.');
            return;
        }

        // Validation for username length
        if (username.length < 4) {
            alert('Username must be at least 4 characters long.');
            return;
        }

        // check if password has at least 8 characters and include both letters and digits.
        if (password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
            alert('Password must be at least 8 characters and include both letters and digits.');
            return;
        }
        // check if input details == user details
        const users = JSON.parse(sessionStorage.getItem('users')) || [];
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            setUser(user); 
            navigate('/'); // redirect to home
        } else {
            alert('Invalid credentials');
        }
    };



    return (
        <div className="screen-1">
            <form onSubmit={handleSignIn}>
                <Logo />
                <div className="email">
                    <label>Email Address</label>
                    <div className="sec-2">
                        <MailIcon />
                        <input
                            type="text"
                            placeholder="Username@gmail.com"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                </div>
                <div className="password">
                    <label>Password</label>
                    <div className="sec-2">
                        <PasswordIcon />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="············"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    
                    </div>
                </div>
                <button type="submit" className="login">Login</button>
                <div className="footer">
                    <span onClick={() => navigate('/register')} >Sign up</span>
                    <span >Forgot Password?</span>
                </div>
            </form>
        </div>
    );
}

export default SignIn;
