import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from "./components/Login";
import Signup from "./components/Signup";
import StudentForm from './components/StudentForm';
import AttendanceTracker from './components/AttendanceTracker';
import FeeManager from './components/FeeManager';
import Reports from './components/Reports';
import UserManagement from './components/UserManagement';
import TimetableManagement from './components/TimetableManagement';
import ProgressReports from './components/ProgressReports';
import Gradebook from './components/Gradebook';
import ExamManagement from './components/ExamManagement';
import CourseManagement from './components/CourseManagement';
import CommunicationTools from './components/CommunicationTools';
import AlumniManagement from './components/AlumniManagement';
import WelcomePage from './components/WelcomePage';
import About from './components/About';

import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  // Add a new student
  const addStudent = (student) => {
    setStudents([...students, { ...student, id: Date.now(), attendance: [], fees: [] }]);
  };

  // Update a student
  const updateStudent = (updatedStudent) => {
    const updatedStudents = students.map((student) =>
      student.id === updatedStudent.id ? updatedStudent : student
    );
    setStudents(updatedStudents);
  };

  // Delete a student
  const deleteStudent = (studentId) => {
    const updatedStudents = students.filter((student) => student.id !== studentId);
    setStudents(updatedStudents);
  };

  // Mark attendance for a student
  const markAttendance = (studentId, status) => {
    const updatedStudents = students.map((student) =>
      student.id === studentId
        ? { ...student, attendance: [...student.attendance, status] }
        : student
    );
    setStudents(updatedStudents);
  };

  // Add fee payment for a student
  const addFeePayment = (studentId, amount) => {
    const updatedStudents = students.map((student) =>
      student.id === studentId
        ? { ...student, fees: [...student.fees, amount] }
        : student
    );
    setStudents(updatedStudents);
  };

  return (
    <div className="app-container">
    

      {/* Sidebar */}
      {token && (
        <div className="sidebar">
          <h1>Navigation</h1>
          <nav>
            <ul>
              <li><Link to="/about"><i className="fas fa-home" style={{ color: 'blue' }}></i> Home</Link></li>
              <li><Link to="/student-form"><i className="fas fa-user-plus" style={{ color: 'green' }}></i> Student Form</Link></li>
              <li><Link to="/attendance-tracker"><i className="fas fa-calendar-check" style={{ color: 'orange' }}></i> Attendance Tracker</Link></li>
              <li><Link to="/fee-manager"><i className="fas fa-money-check-alt" style={{ color: 'purple' }}></i> Fee Manager</Link></li>
              <li><Link to="/reports"><i className="fas fa-chart-line" style={{ color: 'red' }}></i> Reports</Link></li>
              <li><Link to="/user-management"><i className="fas fa-users-cog" style={{ color: 'brown' }}></i> User Management</Link></li>
              <li><Link to="/timetable-management"><i className="fas fa-calendar-alt" style={{ color: 'cyan' }}></i> Timetable Management</Link></li>
              <li><Link to="/progress-reports"><i className="fas fa-chart-bar" style={{ color: 'magenta' }}></i> Progress Reports</Link></li>
              <li><Link to="/gradebook"><i className="fas fa-book" style={{ color: 'yellow' }}></i> Gradebook</Link></li>
              <li><Link to="/exam-management"><i className="fas fa-file-alt" style={{ color: 'teal' }}></i> Exam Management</Link></li>
              <li><Link to="/course-management"><i className="fas fa-book-open" style={{ color: 'lime' }}></i> Course Management</Link></li>
              <li><Link to="/communication-tools"><i className="fas fa-comments" style={{ color: 'pink' }}></i> Communication Tools</Link></li>
              <li><Link to="/alumni-management"><i className="fas fa-user-graduate" style={{ color: 'grey' }}></i> Alumni Management</Link></li>
            </ul>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={token ? <Navigate to="/dashboard" /> : <WelcomePage />} />
          <Route path="/login" element={<Login setUser={(user) => setToken(user.token)} />} />
          <Route path="/signup" element={<Signup setUser={(user) => setToken(user.token)} />} />
          <Route path="/about" element={<About />} />
          {/* Protected Routes */}
          {token && (
            <>
              <Route path="/student-form" element={<StudentForm addStudent={addStudent} />} />
              <Route path="/attendance-tracker" element={<AttendanceTracker students={students} markAttendance={markAttendance} />} />
              <Route path="/fee-manager" element={<FeeManager students={students} addFeePayment={addFeePayment} />} />
              <Route path="/reports" element={<Reports students={students} />} />
              <Route path="/user-management" element={<UserManagement students={students} addStudent={addStudent} updateStudent={updateStudent} deleteStudent={deleteStudent} />} />
              <Route path="/timetable-management" element={<TimetableManagement />} />
              <Route path="/progress-reports" element={<ProgressReports />} />
              <Route path="/gradebook" element={<Gradebook students={students} />} />
              <Route path="/exam-management" element={<ExamManagement students={students} />} />
              <Route path="/course-management" element={<CourseManagement />} />
              <Route path="/communication-tools" element={<CommunicationTools />} />
              <Route path="/alumni-management" element={<AlumniManagement />} />
              <Route path="/dashboard" element={<StudentForm addStudent={addStudent} />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;