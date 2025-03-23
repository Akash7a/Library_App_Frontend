import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStudents, deleteStudent, getFeeCollection, addStudents, getSingleStudent, subscriptionAboutToFinishStudents, sendWhatsappMessage } from '../features/Student/StudentSlice.js';
import { useNavigate, Link } from 'react-router-dom';
import Hero from './Hero.jsx';
import { loadAdminFromToken } from '../features/Auth/AuthSlice.js';


const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { students, pending, error, singleStudent, studentWithFinishSubscription } = useSelector((state) => state.student);

  console.log("studentWithFinishSubscription", studentWithFinishSubscription);

  const { admin } = useSelector((state) => state.auth);

  console.log('admin',admin);

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch, admin?.token]);

  useEffect(() => {
    dispatch(subscriptionAboutToFinishStudents())
  }, [dispatch,admin?.token])



  useEffect(() => {
    if (students > 0) {
      dispatch(getFeeCollection());
    }
  }, [dispatch, students,admin?.token]);

  // Handle Delete Student
  const handleDelete = (studentId) => dispatch(deleteStudent(studentId));

  // Handle Update Student
  const handleUpdate = (studentId) => navigate('/updateStudent', { state: { studentId } });

  const handleViewStudent = (studentId) => {
    navigate(`/studentProfile/${studentId}`);
  }

  useEffect(()=>{
    if(admin?.token){
      dispatch(loadAdminFromToken());
    }
  },[dispatch, admin?.token]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-blue-800 via-blue-600 to-blue-400 text-gray-100 pb-6">
        <header className="p-4 shadow-lg bg-blue-900">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <div>
              <p className="text-lg font-medium">Welcome, {admin.username || "No admin found"}</p>
            </div>
          </div>
        </header>

        <div className="py-8">
          <Hero
            addStudent={(data) => dispatch(addStudents(data))}
            deleteStudent={(id) => dispatch(deleteStudent(id))}
          />
        </div>

        <div className='max-w-7xl mx-auto px-6 md:px-8 space-y-8 mb-9'>
          <section className="bg-gray-100 rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl text-center font-semibold text-gray-800">Student with End Subscription List</h2>
            </div>

            {pending ? (
              <div className="text-center text-gray-600 text-lg">Loading...</div>
            ) : error ? (
              <div className="text-center text-red-600 text-lg">
                {error.message || JSON.stringify(error)}
              </div>
            ) : students?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 shadow-xl rounded-lg">
                  <thead className="bg-blue-800 text-white text-sm sm:text-base">
                    <tr className="text-center">
                      <th className="px-4 py-4 sm:px-6">Name</th>
                      <th className="px-4 py-4 sm:px-6">Number</th>
                      <th className="px-4 py-4 sm:px-6">Status</th>
                      <th className="px-4 py-4 sm:px-6">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-800 text-sm sm:text-base">
                    {studentWithFinishSubscription.map((student) => {
                      return (
                        <tr
                          key={student._id}
                          className="transition transform hover:-translate-y-1 hover:shadow-xl bg-white rounded-lg mb-4 border border-gray-300 overflow-hidden"
                        >
                          <td className="px-4 py-5 sm:px-6 text-center font-semibold">{student.name}</td>
                          <td className="px-4 py-5 sm:px-6 text-center">{student.mobile}</td>
                          <td className="px-4 py-5 sm:px-6 text-center">
                            <span
                              className={`px-3 py-1 text-xs font-medium rounded-full ${student.isSubscriptionActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}
                            >
                              {student.isSubscriptionActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-4 py-5 sm:px-6 text-center space-x-2 flex justify-center">
                            <button
                              className="bg-blue-400 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                              onClick={() => handleViewStudent(student._id)}
                            >
                              View
                            </button>
                            <button
                              className="bg-[#25D366] rounded-lg hover:bg-[#1EBE57] transition duration-300 shadow-lg p-2 px-3 flex gap-2 text-white"
                              onClick={() => {
                                const message = `Dear ${student.name},\n\nWe hope you're doing well! We wanted to remind you that your subscription is nearing its expiration. To ensure uninterrupted service, kindly renew before *${new Date(student.subscriptionEndDate).toLocaleDateString()}*.\n\nIf you have any questions or need assistance, feel free to reach out. We appreciate having you with us!\n\nBest regards.`;

                                dispatch(sendWhatsappMessage({ number: student.mobile, message }));
                              }}
                            >
                              Message <i className="bi bi-whatsapp text-white text-md"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center text-gray-600">No students available</div>
            )}
          </section>
        </div>

        <main className="max-w-7xl mx-auto px-6 md:px-8 space-y-8">
          <section className="bg-gray-100 rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Student List</h2>
              <button
                className="bg-blue-700 text-white py-2 px-5 rounded-lg hover:bg-blue-800 transition text-sm sm:text-base"
                onClick={() => navigate('/addNewStudent')}
              >
                Add New Student
              </button>
            </div>

            {pending ? (
              <div className="text-center text-gray-600 text-lg">Loading...</div>
            ) : error ? (
              <div className="text-center text-red-600 text-lg">
                {error.message || JSON.stringify(error)}
              </div>
            ) : students?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 shadow-xl rounded-lg">
                  <thead className="bg-blue-800 text-white text-sm sm:text-base">
                    <tr className="text-center">
                      <th className="px-4 py-4 sm:px-6">Name</th>
                      <th className="px-4 py-4 sm:px-6">Father's Name</th>
                      <th className="px-4 py-4 sm:px-6">Number</th>
                      <th className="px-4 py-4 sm:px-6">Subscription</th>
                      <th className="px-4 py-4 sm:px-6">Status</th>
                      <th className="px-4 py-4 sm:px-6">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-800 text-sm sm:text-base">
                    {students.map((student) => {
                      return (
                        <tr
                          key={student._id}
                          className="transition transform hover:-translate-y-1 hover:shadow-xl bg-white rounded-lg mb-4 border border-gray-300 overflow-hidden"
                        >
                          <td className="px-4 py-5 sm:px-6 text-center font-semibold">{student.name}</td>
                          <td className="px-4 py-5 sm:px-6 text-center">{student.fatherName}</td>
                          <td className="px-4 py-5 sm:px-6 text-center">{student.mobile}</td>
                          <td className="px-4 py-5 sm:px-6 text-center">{student.remainingDays} days</td>
                          <td className="px-4 py-5 sm:px-6 text-center">
                            <span
                              className={`px-3 py-1 text-xs font-medium rounded-full ${student.isSubscriptionActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}
                            >
                              {student.isSubscriptionActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-4 py-5 sm:px-6 text-center space-x-2 flex justify-center">
                            <button
                              className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
                              onClick={() => handleUpdate(student._id)}
                            >
                              Edit
                            </button>
                            <button
                              className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
                              onClick={() => handleDelete(student._id)}
                            >
                              Delete
                            </button>
                            <button
                              className="bg-blue-400 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                              onClick={() => handleViewStudent(student._id)}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center text-gray-600">No students available</div>
            )}
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;