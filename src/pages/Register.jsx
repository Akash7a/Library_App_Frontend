import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { registeAdmin } from '../features/Auth/AuthSlice.js';

const Register = () => {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [contact, setContact] = useState("");
    const [libraryName, setLibraryName] = useState("");
    const [file, setFile] = useState(null);

    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        if (username === "" || email === "" || password === "" || !file) return;

        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("contact", contact);
        formData.append("libraryName", libraryName);
        formData.append("profilePic", file);

        dispatch(registeAdmin(formData));

        setUserName("");
        setEmail("");
        setPassword("");
        setContact("");
        setLibraryName("");
        setFile(null);
    };

    useEffect(() => {
        if (token) {
            navigate("/home");
        }
    }, [token, navigate]);

    return (
        <div className="min-h-screen py-8 flex items-center justify-center bg-gray-900 px-4">
            <form onSubmit={submitHandler} className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-white text-center mb-6">Register</h2>
                <div className="mb-4">
                    <label htmlFor="libray_name" className="block text-gray-300 mb-2">Library Name</label>
                    <input
                        type="text"
                        placeholder="Enter Your Library Name"
                        value={libraryName}
                        onChange={(e) => setLibraryName(e.target.value)}
                        required
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="contact" className="block text-gray-300 mb-2">Contact No</label>
                    <input
                        type="text"
                        placeholder="Enter Contact Number"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        required
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-300 mb-2">Username</label>
                    <input
                        type="text"
                        placeholder="Your User Name"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                    <input
                        type="email"
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="profilePic" className="block text-gray-300 mb-2">Profile Pic</label>
                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                >
                    Register
                </button>
                <div className="my-4">
                    <p className="text-center text-sm text-gray-300 mt-4">
                        Already have an account? <Link to="/login" className="text-white hover:underline">Login</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Register;