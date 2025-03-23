import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addStudents, clearSuccess, clearError } from '../features/Student/StudentSlice.js';
import { useLocation, useNavigate } from 'react-router-dom';

const AddStudentForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { pending, success, error, message, admin } = useSelector((state) => state.auth);

  const [student, setStudent] = useState({
    name: '',
    fatherName: "",
    adharNumber: "",
    gender: "",
    address: '',
    mobile: '',
    email: '',
    password: '',
    feesubmit: "",
    monthlyFee: '',
    entryDate: '',
    subscriptionEndDate: '',
    isSubscriptionActive: false,
    shift: "",
    seat: "",
    timing: "",
  });

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("studentData")) || {};

    if (savedData.shift && savedData.seat && savedData.timing) {
      setStudent((prevStudent) => ({
        ...prevStudent,
        ...savedData,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudent({
      ...student,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  useEffect(() => {
    localStorage.setItem("studentData", JSON.stringify(student));
  }, [student]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addStudents(student));

    console.log("submitted students", student);

    localStorage.removeItem("studentData");

    setStudent({
      name: '',
      fatherName: "",
      adharNumber: "",
      gender: "",
      address: '',
      mobile: '',
      email: '',
      password: '',
      feesubmit: "",
      monthlyFee: '',
      entryDate: '',
      subscriptionEndDate: '',
      isSubscriptionActive: false,
      shift: "",
      seat: "",
      timing: "",
    });

    navigate("/home")
    setTimeout(() => {
      dispatch(clearSuccess());
      dispatch(clearError());
    }, 5000);
  };

  if (!admin) {
    return <div>Loading...</div>
  }
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-500 p-5 flex items-center justify-center w-full">
      <form
        onSubmit={handleSubmit}
        className='w-full'
      >
        <h1 className='font-bold text-3xl text-center p-3 mb-4 w-[80%]m-auto text-white'>Add New Student</h1>
        <div className="bg-gray-900	m-auto p-6 rounded-lg shadow-lg max-w-[80%] w-full lg:grid grid-cols-2 ">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-white" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder='Enter Name'
              value={student.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded lg:w-[75%]"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="fatherName" className="block text-sm font-medium mb-2 text-white">Father's Name</label>
            <input
              type="text"
              id='fatherName'
              name='fatherName'
              placeholder='Enter Father Name'
              value={student.fatherName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded lg:w-[75%]"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-white" htmlFor="mobile">Mobile</label>
            <input
              type="string"
              id="mobile"
              name="mobile"
              placeholder='Enter Mobile Number'
              value={student.mobile}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded lg:w-[75%]"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-white" htmlFor="adharNumber">Adhar Number</label>
            <input
              type="string"
              id="adharNumber"
              name="adharNumber"
              placeholder='Enter Adhar Number(Optional)'
              value={student.adharNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded lg:w-[75%]"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-white" htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder='Enter Address'
              value={student.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded lg:w-[75%]"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-white">Gender</label>
            <div className="flex items-center">
              <label className="mr-4 flex items-center text-white">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={student.gender === "male"}
                  onChange={handleChange}
                  className="mr-2"
                  required
                />
                Male
              </label>
              <label className="flex items-center text-white">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={student.gender === "female"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Female
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-white" htmlFor="mobile">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder='Enter Email'
              value={student.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded lg:w-[75%]"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-white" htmlFor="mobile">Password</label>
            <input
              type="text"
              id="password"
              name="password"
              placeholder='Enter password'
              value={student.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded lg:w-[75%]" required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-white" htmlFor="monthlyFee">Monthly Fee</label>
            <select
              id="monthlyFee"
              name="monthlyFee"
              value={student.monthlyFee}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded lg:w-[75%]" required
            >
              <option value="">Monthly Fee</option>
              <option value="500">500</option>
              <option value="1000">1000</option>
              <option value="1500">1500</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-white" htmlFor="feesubmit">Fee Submit</label>
            <input
              type="text"
              id="feesubmit"
              name="feesubmit"
              placeholder='Enter fee'
              value={student.feesubmit}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded lg:w-[75%]" required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-white" htmlFor="entryDate">Entry Date</label>
            <input
              type="date"
              id="entryDate"
              name="entryDate"
              value={student.entryDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded lg:w-[75%]" required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-white" htmlFor="subscriptionEndDate">End Date</label>
            <input
              type="date"
              id="subscriptionEndDate"
              name="subscriptionEndDate"
              value={student.subscriptionEndDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded lg:w-[75%]" required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-white" htmlFor="shift">Shift</label>
            <button
              type='button'
              onClick={() => {
                navigate("/addshift")
              }}
              className="w-full p-2 border font-bold border-gray-300 rounded lg:w-[75%] bg-white hover:bg-gray-200 transition"
            >
              Select Shift and Seat
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-white" htmlFor="shift">Shift</label>
            <input
              type="text"
              id="shift"
              name="shift"
              value={student.shift}
              onChange={handleChange}
              className="w-full p-2 border text-white font-bold border-gray-300 rounded lg:w-[75%]"
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-white" htmlFor="seat">Seat</label>
            <input
              type="text"
              id="seat"
              name="seat"
              value={student.seat}
              onChange={handleChange}
              className="w-full p-2 border text-white font-bold border-gray-300 rounded lg:w-[75%]"
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-white" htmlFor="seat">Timing</label>
            <input
              type="text"
              id="timing"
              name="timing"
              value={student.timing}
              onChange={handleChange}
              className="w-full p-2 border text-white font-bold border-gray-300 rounded lg:w-[75%]"
              disabled
            />
          </div>
        </div>
        <div className="flex justify-center py-5">
          <button
            type="submit"
            className="bg-green-600 w-[80%] text-white p-3 rounded hover:bg-blue-700 transition font-bold"
            disabled={pending}
          >
            {pending ? "Adding..." : "Add Student"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddStudentForm;