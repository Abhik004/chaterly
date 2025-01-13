import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../config/axios';
import { UserContext } from '../context/user.context';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setUser } = useContext(UserContext);

    const navigate = useNavigate();

    function submitHandler(e) {
        e.preventDefault();

        axios.post('/users/login', {
            email,
            password
        }).then((res) => {
            console.log(res.data);

            localStorage.setItem('token', res.data.token);
            setUser(res.data.user);

            navigate('/');
        }).catch((err) => {
            console.log(err.response.data);
        });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="bg-gradient-to-br from-white via-gray-100 to-gray-200 p-8 rounded-lg shadow-xl w-full max-w-md relative">
                <div className="absolute top-[-65px] left-1/2 transform -translate-x-1/2">
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r">
                        Chaterly
                    </h1>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center mt-8">
                    Welcome Back
                </h2>
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Email Address
                        </label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            className="w-full p-3 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Password
                        </label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            className="w-full p-3 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
                    >
                        Login
                    </button>
                </form>
                <p className="text-gray-600 mt-6 text-center">
                    Don't have an account?{' '}
                    <Link
                        to="/register"
                        className="text-blue-600 font-medium hover:underline"
                    >
                        Create one
                    </Link>
                </p>
            </div>
        </div>

    );
};

export default Login;
