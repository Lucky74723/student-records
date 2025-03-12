import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ExamManagement({ students = [], courses = [] }) {
  // State for exam schedules
  const [exams, setExams] = useState([]);
  // State for exam results
  const [results, setResults] = useState([]);

  // State for search and filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [examType, setExamType] = useState('mid-term');

  // Fetch exams and results from the backend
  useEffect(() => {
    axios.get('/api/exams')
      .then(response => setExams(response.data))
      .catch(error => console.error('Error fetching exams:', error));

    axios.get('/api/results')
      .then(response => setResults(response.data))
      .catch(error => console.error('Error fetching results:', error));
  }, []);

  // Add a new exam
  const addExam = (e) => {
    e.preventDefault();
    const newExam = {
      course: e.target.course.value,
      date: e.target.date.value,
      time: e.target.time.value,
      type: examType,
    };
    axios.post('/api/exams', newExam)
      .then(response => {
        setExams([...exams, response.data]);
        e.target.reset();
      })
      .catch(error => console.error('Error adding exam:', error));
  };

  // Add a new exam result
  const addResult = (e) => {
    e.preventDefault();
    const newResult = {
      student: e.target.student.value,
      course: e.target.course.value,
      score: e.target.score.value,
    };
    axios.post('/api/results', newResult)
      .then(response => {
        setResults([...results, response.data]);
        e.target.reset();
      })
      .catch(error => console.error('Error adding result:', error));
  };

  // Generate report card
  const generateReportCard = (student) => {
    const studentResults = results.filter((result) => result.student === student);
    alert(`Report Card for ${student}:\n${studentResults.map((result) => `${result.course}: ${result.score}`).join('\n')}`);
  };

  // Filter exams and results based on search and filter criteria
  const filteredExams = exams.filter((exam) => {
    const matchesSearch = exam.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = filterCourse ? exam.course === filterCourse : true;
    return matchesSearch && matchesCourse;
  });

  const filteredResults = results.filter((result) => {
    const matchesSearch = result.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = filterCourse ? result.course === filterCourse : true;
    return matchesSearch && matchesCourse;
  });

  return (
    <div className="container">
      <h2>Exam Management</h2>

      {/* Search and Filter */}
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search by course"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          value={filterCourse}
          onChange={(e) => setFilterCourse(e.target.value)}
        >
          <option value="">All Courses</option>
          {courses.map((course, index) => (
            <option key={index} value={course.name}>{course.name}</option>
          ))}
        </select>
      </div>

      {/* Exam Scheduling Form */}
      <div className="exam-scheduling">
        <h3>Schedule Exams</h3>
        <form onSubmit={addExam}>
          <input
            type="text"
            name="course"
            placeholder="Course"
            required
          />
          <input
            type="date"
            name="date"
            required
          />
          <input
            type="time"
            name="time"
            required
          />
          <select
            value={examType}
            onChange={(e) => setExamType(e.target.value)}
          >
            <option value="mid-term">Mid-Term</option>
            <option value="final">Final</option>
            <option value="quiz">Quiz</option>
          </select>
          <button type="submit">Add Exam</button>
        </form>

        {/* Exam Schedule Table */}
        <h3>Exam Schedule</h3>
        <table>
          <thead>
            <tr>
              <th>Course</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredExams.map((exam) => (
              <tr key={exam.id}>
                <td>{exam.course}</td>
                <td>{exam.date}</td>
                <td>{exam.time}</td>
              </tr>
              
            ))}
          </tbody>
        </table>
      </div>

      {/* Exam Results Form */}
      <div className="exam-results">
        <h3>Manage Exam Results</h3>
        <form onSubmit={addResult}>
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
            type="number"
            name="score"
            placeholder="Score"
            required
          />
          <button type="submit">Add Result</button>
        </form>

        {/* Exam Results Table */}
        <h3>Exam Results</h3>
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Course</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {filteredResults.map((result) => (
              <tr key={result.id}>
                <td>{result.student}</td>
                <td>{result.course}</td>
                <td>{result.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Report Card Generation */}
      <div className="report-cards">
        <h3>Generate Report Cards</h3>
        <ul>
          {[...new Set(results.map((result) => result.student))].map((student) => (
            <li key={student}>
              <button onClick={() => generateReportCard(student)}>Generate Report Card for {student}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ExamManagement;