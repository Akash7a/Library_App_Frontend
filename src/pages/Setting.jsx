import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutAdmin } from '../features/Auth/AuthSlice';

const Setting = () => {
    const dispatch = useDispatch();
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Settings</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Student Analytics */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Student Analytics
                    </h2>
                    <p className="text-gray-600 mb-4">
                        View insights on student activity and engagement.
                    </p>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        View Analytics
                    </button>
                </div>

                {/* Library Configuration */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Library Configuration
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Update library hours and contact details.
                    </p>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Edit Config
                    </button>
                </div>

                {/* Notifications */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Notifications
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Enable or disable email and in-app notifications.
                    </p>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Edit Notifications
                    </button>
                </div>

                {/* Logout */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Logout</h2>
                    <p className="text-gray-600 mb-4">Sign out of the admin panel.</p>
                    <button onClick={() => dispatch(logoutAdmin())} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Setting;