import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Gradebook({ students }) {
  // State for grades
  const [grades, setGrades] = useState([]);

  // State for search and filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCourse, setFilterCourse] = useState('');

  // State for customizable views
  const [view, setView] = useState('student');

  // Fetch grades from the backend
  useEffect(() => {
    axios.get('/api/grades')
      .then(response => setGrades(response.data))
      .catch(error => console.error('Error fetching grades:', error));
  }, []);

  // Add a new grade
  const addGrade = (e) => {
    e.preventDefault();
    const newGrade = {
      student: e.target.student.value,
      course: e.target.course.value,
      grade: e.target.grade.value,
    };
    axios.post('/api/grades', newGrade)
      .then(response => {
        setGrades([...grades, response.data]);
        e.target.reset();
      })
      .catch(error => console.error('Error adding grade:', error));
  };

  // Delete a grade
  const deleteGrade = (id) => {
    setGrades(grades.filter((grade) => grade.id !== id));
  };

  // Generate grade report
  const generateGradeReport = (student) => {
    const studentGrades = grades.filter((grade) => grade.student === student);
    alert(`Grade Report for ${student}:\n${studentGrades.map((grade) => `${grade.course}: ${grade.grade}`).join('\n')}`);
  };

  // Filter grades based on search and filter criteria
  const filteredGrades = grades.filter((grade) => {
    const matchesSearch = grade.student.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = filterCourse ? grade.course === filterCourse : true;
    return matchesSearch && matchesCourse;
  });

  return (
    <div className="container">
      <h2>Gradebook</h2>

      {/* Search and Filter */}
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search by student"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          value={filterCourse}
          onChange={(e) => setFilterCourse(e.target.value)}
        >
          <option value="">All Courses</option>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
        </select>
      </div>

      {/* Add Grade Form */}
      <form onSubmit={addGrade}>
        <input
          type="text"
          name="student"
          placeholder="Student Name"
          required
        />
        <input
          type="text"
          name="course"
          placeholder="Course"
          required
        />
        <input
          type="text"
          name="grade"
          placeholder="Grade"
          required
        />
        <button type="submit">Add Grade</button>
      </form>

      {/* Grades Table */}
      <h3>Grades</h3>
      <table>
        <thead>
          <tr>
            <th>{view === 'student' ? 'Student' : 'Course'}</th>
            <th>Grade</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredGrades.map((grade) => (
            <tr key={grade.id}>
              <td>{view === 'student' ? grade.student : grade.course}</td>
              <td>{grade.grade}</td>
              <td>
                <button onClick={() => deleteGrade(grade.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Grade Report Generation */}
      <div className="grade-reports">
        <h3>Generate Grade Reports</h3>
        <ul>
          {[...new Set(grades.map((grade) => grade.student))].map((student) => (
            <li key={student}>
              <button onClick={() => generateGradeReport(student)}>Generate Report for {student}</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Customizable Views */}
      <div className="view-options">
        <h3>View Options</h3>
        <label>
          <input
            type="radio"
            name="view"
            value="student"
            checked={view === 'student'}
            onChange={() => setView('student')}
          />
          View by Student
        </label>
        <label>
          <input
            type="radio"
            name="view"
            value="course"
            checked={view === 'course'}
            onChange={() => setView('course')}
          />
          View by Course
        </label>
      </div>
    </div>
  );
}

export default Gradebook;