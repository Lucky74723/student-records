import React, { useState } from 'react';

function ProgressReports() {
  // State for student data
  const [students] = useState([]);

  // State for search and filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCourse, setFilterCourse] = useState('');

  // State for customizable report options
  const [selectedMetrics, setSelectedMetrics] = useState({
    grades: true,
    attendance: false,
    courses: false,
  });

  // Filter students based on search and filter criteria
  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = filterCourse ? student.course === filterCourse : true;
    return matchesSearch && matchesCourse;
  });

  // Handle checkbox changes for report customization
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSelectedMetrics({ ...selectedMetrics, [name]: checked });
  };

  // Generate a report
  const generateReport = () => {
    const metrics = Object.keys(selectedMetrics).filter((key) => selectedMetrics[key]);
    alert(`Generating report with: ${metrics.join(', ')}`);
  };

  return (
    <div className="container">
      <h2>Progress Reports</h2>

      {/* Search and Filter */}
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search by name"
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
          <option value="History">History</option>
        </select>
      </div>

      {/* Student Performance Table */}
      <h3>Student Performance</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Course</th>
            <th>Grade</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.course}</td>
              <td>{student.grade}</td>
              <td>{student.attendance}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Customizable Report Options */}
      <div className="report-options">
        <h3>Customize Report</h3>
        <label>
          <input
            type="checkbox"
            name="grades"
            checked={selectedMetrics.grades}
            onChange={handleCheckboxChange}
          />
          Grades
        </label>
        <label>
          <input
            type="checkbox"
            name="attendance"
            checked={selectedMetrics.attendance}
            onChange={handleCheckboxChange}
          />
          Attendance
        </label>
        <label>
          <input
            type="checkbox"
            name="courses"
            checked={selectedMetrics.courses}
            onChange={handleCheckboxChange}
          />
          Courses
        </label>
      </div>

      {/* Generate Report Button */}
      <button onClick={generateReport}>Generate Report</button>
    </div>
  );
}

export default ProgressReports;