import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleStudent } from "../features/Student/StudentSlice.js";

const StudentProfile = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { singleStudent, pending, error } = useSelector(state => state.student);

    useEffect(() => {
        dispatch(getSingleStudent(id));
    }, [dispatch, id]);

    if (pending) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // Check if student data exists
    if (!singleStudent) return <div>No student found</div>;

    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 mt-9">
            <div className="p-6">
                <h2 className="text-3xl font-semibold text-blue-800 mb-6 text-center">Fee Receipt</h2>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <p className="font-medium text-gray-700">Student Name:</p>
                        <p className="text-lg font-semibold text-gray-800">{singleStudent.name}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="font-medium text-gray-700">Father's Name:</p>
                        <p className="text-lg font-semibold text-gray-800">{singleStudent.fatherName}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="font-medium text-gray-700">Mobile:</p>
                        <p className="text-lg font-semibold text-gray-800">{singleStudent.mobile}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="font-medium text-gray-700">Email:</p>
                        <p className="text-lg font-semibold text-gray-800">{singleStudent.email}</p>
                    </div>

                    <div className="flex justify-between items-center">
                        <p className="font-medium text-gray-700">Subscription Status:</p>
                        <p
                            className={`text-lg font-semibold ${singleStudent.isSubscriptionActive ? 'text-green-600' : 'text-red-600'}`}
                        >
                            {singleStudent.isSubscriptionActive ? 'Active' : 'Inactive'}
                        </p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="font-medium text-gray-700">Subscription End Date:</p>
                        <p className="text-lg font-semibold text-gray-800">
                            {new Date(singleStudent.subscriptionEndDate).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="font-medium text-gray-700">Address:</p>
                        <p className="text-lg text-gray-800">{singleStudent.address}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="font-medium text-gray-700">Fees Submitted:</p>
                        <p className="text-lg font-semibold text-gray-800 border border-black py-3 px-3">{singleStudent.feesubmit} INR</p>
                    </div>
                    <div className="mt-4 text-center">
                        <p className="text-gray-500 text-sm">Thank you for being a valued student!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentProfile;