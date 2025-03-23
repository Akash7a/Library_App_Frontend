import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updateStudent } from "../features/Student/StudentSlice";

const UpdateStudentForm = () => {
  const [student, setStudent] = useState({
    name: "",
    address: "",
    mobile: "",
    entryDate: "",
    subscriptionEndDate: "",
    shift: "",
    reservedSeat: false,
    isSubscriptionActive: false,
  });

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { students } = useSelector((state) => state.student);
  const studentId = location.state?.studentId;

  useEffect(() => {
    if (studentId) {
      const currentStudent = students?.find((s) => s._id === studentId);
      if (currentStudent) {
        // Format the date to yyyy-MM-dd
        const formattedEntryDate = currentStudent.entryDate
          ? new Date(currentStudent.entryDate).toISOString().split("T")[0]
          : "";
        const formattedSubscriptionEndDate = currentStudent.subscriptionEndDate
          ? new Date(currentStudent.subscriptionEndDate).toISOString().split("T")[0]
          : "";

        setStudent({
          ...currentStudent,
          entryDate: formattedEntryDate,
          subscriptionEndDate: formattedSubscriptionEndDate,
        });
      }
    }
  }, [students, studentId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudent({
      ...student,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateStudent({ studentId, updateData: student }));
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
      >
        <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center">
          Update Student Details
        </h1>

        {/* Input Fields for student details */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter student name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={student.address}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter address"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Mobile</label>
          <input
            type="text"
            name="mobile"
            value={student.mobile}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter mobile number"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Entry Date</label>
          <input
            type="date"
            name="entryDate"
            value={student.entryDate}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Subscription End Date</label>
          <input
            type="date"
            name="subscriptionEndDate"
            value={student.subscriptionEndDate}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Shift</label>
          <input
            type="text"
            name="shift"
            value={student.shift}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter student shift"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Reserved Seat</label>
          <input
            type="checkbox"
            name="reservedSeat"
            checked={student.reservedSeat}
            onChange={handleChange}
            className="mr-2"
          />
          Yes
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Is Subscription Active?</label>
          <input
            type="checkbox"
            name="isSubscriptionActive"
            checked={student.isSubscriptionActive}
            onChange={handleChange}
            className="mr-2"
          />
          Yes
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Update Student
        </button>
      </form>
    </div>
  );
};

export default UpdateStudentForm;