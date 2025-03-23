import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadAdminFromToken } from './features/Auth/AuthSlice';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import AddStudentForm from './components/AddStudentForm';
import Navbar from './components/Navbar';
import UpdateStudentForm from './components/UpdateStudent';
import Setting from './pages/Setting';
import ProtectedRoute from './pages/ProtectedRoute';
import StudentProfile from './pages/StudentProfile';
import Addshift from './pages/Addshift';

const App = () => {
  const dispatch = useDispatch();
  const { pending } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(loadAdminFromToken());
    }
  }, [dispatch]);

  if (pending) {
    return <p>Loading...</p>; // Show a loading spinner or message while checking token
  }

  return (
    <div>
      <Routes>
        {/* Protected routes for authenticated admins */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navbar />
            </ProtectedRoute>
          }
        >
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addNewStudent"
            element={
              <ProtectedRoute>
                <AddStudentForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/updateStudent"
            element={
              <ProtectedRoute>
                <UpdateStudentForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/setting"
            element={
              <ProtectedRoute>
                <Setting />
              </ProtectedRoute>
            }
          />
          <Route path='/studentProfile/:id' element={<StudentProfile />} />
          <Route path='/addshift' element={<Addshift />} />
        </Route>

        {/* Public routes */}
        <Route index element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;