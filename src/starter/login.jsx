import login from '../assets/main_img.png';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const navs = useNavigate();

    // ✅ Base URL variable
    const url = "https://backend-stud-ws6b.vercel.app";

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${url}/login`,   // ✅ used variable here
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.access_token) {
                // ✅ Save JWT token
                localStorage.setItem("token", response.data.access_token);
                alert("Login Successful!");
                navs('/main');
            } else {
                alert("Invalid Email or Password!");
            }
        } catch (error) {
            alert("Login Failed!");
            console.error(error);
        }
        setData({ email: "", password: "" });
    };

    return (
        <div className='login-container'>
            <div className='login-card'>
                <div className='login-card-nav'>
                    <div><p className="login-circle"></p></div>
                </div>
                <p className='login-tittle'>Login</p>
                <p className='login-underline'></p>
                <div>
                    <form className='form' onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            className='login-input' 
                            placeholder='Username or Email' 
                            name='email'    
                            value={data.email}
                            onChange={handleChange}
                        />

                        <input 
                            type="password" 
                            className='login-input' 
                            placeholder='Password' 
                            name='password' 
                            value={data.password}
                            onChange={handleChange}
                        />

                        <Link to={'/forgetpass'}>
                            <p className='login-forget'>Forget Password ?</p>
                        </Link>
                        <button type="submit" className='login-btn'>Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
