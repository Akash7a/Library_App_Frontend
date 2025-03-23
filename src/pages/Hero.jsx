import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeeCollection } from '../features/Student/StudentSlice.js';

const Hero = ({ addStudent, deleteStudent }) => {
  const { enrolledStudents, dueFees, previousMonthFeesCollected } = useSelector((state) => state.student);

  const dispatch = useDispatch();

  useEffect(() => {
    if (enrolledStudents > 0) {
      dispatch(getFeeCollection());
    }
  }, [dispatch, enrolledStudents]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-8 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 w-[90%] max-w-7xl">
        <div className="p-6 bg-gray-200 rounded-lg shadow-lg text-center">
          <p className="mb-4">
            <i className="bi bi-people-fill text-6xl text-green-500"></i>
          </p>
          <h2 className="text-2xl font-bold text-green-700">Enrolled Students</h2>
          <p className="mt-2 text-gray-700 text-3xl font-bold">{enrolledStudents}</p>
        </div>

        <div className="p-6 bg-gray-100 rounded-lg shadow-lg text-center">
          <p className="mb-4">
            <i className="bi bi-exclamation-triangle-fill text-6xl text-yellow-500"></i>
          </p>
          <h2 className="text-2xl font-bold text-yellow-700">Due Fees Students</h2>
          <p className="text-3xl font-bold mt-2 text-gray-700">{dueFees || 0}</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-lg text-center">
          <p className="mb-4">
            <i className="bi bi-coin text-6xl text-blue-500"></i>
          </p>
          <h2 className="text-2xl font-bold text-blue-700">December Fees Collection</h2>
          <p className="font-bold text-3xl mt-2 text-gray-700">₹{previousMonthFeesCollected || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;