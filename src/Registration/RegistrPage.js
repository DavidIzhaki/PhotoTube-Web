// RegistrPage.js
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import 'material-design-iconic-font/dist/css/material-design-iconic-font.min.css';
import './RegisterPage.css';
import React, { useState } from 'react';

function RegisterPage() {
    const { user, setUser } = useUser();
    const navigate = useNavigate();
    if (user) {
        navigate('/');
    }

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        gender: '',
        password: '',
        confirmPassword: '',
        picture: null,
    });

    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (name === "picture" && files.length > 0) {
            const file = files[0];
            setFormData(prev => ({
                ...prev,
                [name]: file
            }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { firstName, lastName, username, email, gender, password, confirmPassword } = formData;

        // Check if all fields are filled
        if (!firstName || !lastName || !username || !email || !gender || !password || !confirmPassword || !formData.picture ) {
            alert('You have to fill all the fields.');
            return;
        }
        // check password == confirm password
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        // Validation for username length
        if (username.length < 4) {
            alert('Username must be at least 4 characters long.');
            return;
        }

        // Validation for password complexity
        if (!password.match(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)) {
            alert('Password must contain at least 1 number and 1 letter.');
            return;
        }
        // check if password has at least 8 characters and include both letters and digits.
        if (password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
            alert('Password must be at least 8 characters and include both letters and digits.');
            return;
        }

        // Retrieve existing users from session storage
        const currentUsers = JSON.parse(sessionStorage.getItem('users')) || [];

        // Check for existing username
        if (currentUsers.some(user => user.username === username)) {
            alert('This username is already taken. Please choose another.');
            return;
        }

        const newUser = { username, password, name: `${firstName} ${lastName}`, picture: imagePreviewUrl };
        currentUsers.push(newUser);
        sessionStorage.setItem('users', JSON.stringify(currentUsers));

        console.log('Account created successfully', newUser);
        navigate('/signin');
    };

    return (
        <div className="wrapper">
            <div className="inner">
                <form className='register-form' onSubmit={handleSubmit}>
                    <h3>Registration</h3>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="First Name"
                            className="form-input"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="form-input"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-wrapper">
                        <input
                            type="text"
                            placeholder="Username"
                            className="form-input"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <i className="zmdi zmdi-account"></i>
                    </div>
                    <div className="form-wrapper">
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="form-input"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <i className="zmdi zmdi-email"></i>
                    </div>
                    <div className="form-wrapper">
                        <select
                            name="gender"
                            className="form-input"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value="" disabled>Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="form-wrapper">
                        <input
                            type="password"
                            placeholder="Password"
                            className="form-input"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <i className="zmdi zmdi-lock"></i>
                    </div>
                    <div className="form-wrapper">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="form-input"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        <i className="zmdi zmdi-lock"></i>
                    </div>
                    <div className="form-wrapper">
                        <div className="custom-file">
                            <input
                                type="file"
                                className="custom-file-input"
                                id="customFile"
                                name="picture"
                                onChange={handleChange}
                            />
                            <label className="custom-file-label" htmlFor="customFile">
                                Choose file...
                            </label>
                        </div>
                        {imagePreviewUrl && (
                            <img
                                src={imagePreviewUrl}
                                alt="Preview"
                                className="img-preview"
                            />
                        )}
                    </div>

                    <button className='register-button' type="submit">
                        Register
                        <i className="zmdi zmdi-arrow-right"></i>
                    </button>
                    <div className="footer">
                        <span onClick={() => navigate('/signin')}>Sign In</span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
