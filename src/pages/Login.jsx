import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { loginAdmin } from '../features/Auth/AuthSlice';

const Login = () => {
    const [usernameOrEmail, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const { error,pending } = useSelector((state) => state.auth);

    const loginHandler = (e) => {
        e.preventDefault();
        if (usernameOrEmail === "" && password === "") return;

        let loginData = {
            usernameOrEmail,
            password
        }
        dispatch(loginAdmin(loginData));

        setEmailOrUsername("");
        setPassword("");
    }

    useEffect(() => {
        if (token) {
            navigate("/home")
        }
    }, [token, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
            <form onSubmit={loginHandler} className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-extrabold text-white text-center mb-6">Login</h2>
                <div className="mb-4">
                    <label htmlFor="usernameOrEmail" className="block text-gray-300 mb-2">Email or Username</label>
                    <input
                        type="text"
                        placeholder="Enter Email Or Username"
                        value={usernameOrEmail}
                        onChange={(e) => setEmailOrUsername(e.target.value)}
                        required
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-300 mb-2">Password</label>
                    <input
                        type="password"
                        placeholder="Enter Your Password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300 flex justify-center items-center"
                    disabled={pending}
                >
                    {pending ? (
                        <div className="w-5 h-5 border-2 border-gray-300 border-t-white rounded-full animate-spin"></div>
                    ) : (
                        "Login"
                    )}
                </button>
                <p>
                    {error && <p className="text-red-400 text-center mt-4">{error}</p>}
                </p>
                <p className="text-center text-sm text-gray-400 mt-4">
                    Don't have an account? <Link to="/" className="text-blue-400 hover:underline">Register</Link>
                </p>
            </form>
        </div>
    )
}

export default Login