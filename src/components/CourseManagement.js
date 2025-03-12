import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [credits, setCredits] = useState('');
  const [prerequisites, setPrerequisites] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [editingCourse, setEditingCourse] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/courses')
      .then(response => setCourses(response.data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const addOrUpdateCourse = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');
    const newCourse = { name, code, description, duration, credits, prerequisites };
    const request = editingCourse
      ? axios.put(`http://localhost:5000/api/courses/${editingCourse._id}`, newCourse)
      : axios.post('http://localhost:5000/api/courses', newCourse);

    request
      .then(response => {
        if (response.data) {
          const updatedCourses = editingCourse
            ? courses.map(course => course._id === editingCourse._id ? response.data : course)
            : [...courses, response.data];
          setCourses(updatedCourses);
          resetForm();
          setSuccessMessage(`Course ${editingCourse ? 'updated' : 'added'} successfully!`);
        } else {
          setErrorMessage(`Failed to ${editingCourse ? 'update' : 'add'} course. Please try again.`);
        }
      })
      .catch(error => {
        console.error(`Error ${editingCourse ? 'updating' : 'adding'} course:`, error.response ? error.response.data : error.message);
        setErrorMessage(`Failed to ${editingCourse ? 'update' : 'add'} course. Please try again.`);
      })
      .finally(() => setLoading(false));
  };

  const deleteCourse = (courseId) => {
    setLoading(true);
    axios.delete(`http://localhost:5000/api/courses/${courseId}`)
      .then(response => {
        if (response.data) {
          setCourses(courses.filter(course => course._id !== courseId));
          setSuccessMessage('Course deleted successfully!');
        } else {
          setErrorMessage('Failed to delete course. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error deleting course:', error.response ? error.response.data : error.message);
        setErrorMessage('Failed to delete course. Please try again.');
      })
      .finally(() => setLoading(false));
  };

  const resetForm = () => {
    setName('');
    setCode('');
    setDescription('');
    setDuration('');
    setCredits('');
    setPrerequisites('');
    setEditingCourse(null);
  };

  const startEditing = (course) => {
    setName(course.name);
    setCode(course.code);
    setDescription(course.description);
    setDuration(course.duration);
    setCredits(course.credits);
    setPrerequisites(course.prerequisites);
    setEditingCourse(course);
  };

  return (
    <div className="form-container">
      <h2>Course Management</h2>
      <form onSubmit={addOrUpdateCourse}>
        <input
          type="text"
          placeholder="Course Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Course Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <input
          type="number"
          placeholder="Credits"
          value={credits}
          onChange={(e) => setCredits(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Prerequisites"
          value={prerequisites}
          onChange={(e) => setPrerequisites(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : editingCourse ? 'Update Course' : 'Add Course'}
        </button>
        {editingCourse && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <h3>Course List</h3>
      <ul>
        {courses.map((course, index) => (
          <li key={index}>
            {course.name} ({course.code}) - {course.credits} credits
            <button onClick={() => startEditing(course)}>Edit</button>
            <button onClick={() => deleteCourse(course._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseManagement;