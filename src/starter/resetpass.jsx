import React, { useState } from 'react';
import './resetpass.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export const Resetpass = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location?.state?.emaildata?.email; 

    // ✅ Base URL variable
    const url = "https://backend-stud-ws6b.vercel.app";

    const [inputData, setInputData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleReset = (e) => {
        const { name, value } = e.target;
        setInputData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if (!inputData.password || !inputData.confirmPassword) {
            setError('Both fields are required.');
            return;
        }
        if (inputData.password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }
        if (inputData.password !== inputData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            // ✅ Using base URL variable
            const res = await axios.post(`${url}/reset-password`, {
                email: email,
                new_password: inputData.password
            });

            if (res.data.success) {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            }
        } catch (err) {
            setError(err.response?.data?.detail || "Failed to reset password");
        }
    };

    return (
        <div className='reset-container'>
            <div className='reset-card'>
                <h2 className="reset-title">Create New Password</h2>
                
                <p className="reset-subtitle">
                    Your New Password Must Be Different from Previously Used Password.
                </p>

                <form className='reset-form' onSubmit={handleSubmit}>
                    <input
                        type="password"
                        className="reset-input"
                        placeholder='New Password'
                        name='password'
                        value={inputData.password}
                        onChange={handleReset}
                    />
                    <input
                        type="password"
                        className="reset-input"
                        placeholder='Confirm Password'
                        name='confirmPassword'
                        value={inputData.confirmPassword}
                        onChange={handleReset}
                    />

                    <p className="reset-link">Change Password</p>

                    <button className="reset-btn" type="submit">Save</button>
                    {error && <p className="reset-error">{error}</p>}
                    {success && <p className="reset-success">Password reset successful! Redirecting...</p>}
                </form>
            </div>
        </div>
    );
};
