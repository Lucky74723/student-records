import React, { useState } from 'react';

function AttendanceTracker({ students }) {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('present');
  const [attendance, setAttendance] = useState([]);
  const [alertThreshold] = useState(3);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAttendance = { student: selectedStudent, date, status };
    setAttendance([...attendance, newAttendance]);
    setDate('');
    setStatus('present');
    if (status === 'absent') {
      const studentAbsences = attendance.filter(record => record.student === selectedStudent && record.status === 'absent').length + 1;
      if (studentAbsences >= alertThreshold) {
        alert(`Alert: ${selectedStudent} has been absent ${studentAbsences} times.`);
      }
    }
  };

  const calculatePercentage = (studentId) => {
    const studentRecords = attendance.filter(record => record.student === studentId);
    const presentCount = studentRecords.filter(record => record.status === 'present').length;
    return studentRecords.length ? (presentCount / studentRecords.length) * 100 : 0;
  };

  const overallPercentage = () => {
    const totalRecords = attendance.length;
    const totalPresent = attendance.filter(record => record.status === 'present').length;
    return totalRecords ? (totalPresent / totalRecords) * 100 : 0;
  };

  return (
    <div className="form-container">
      <h2>Attendance Percentage</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
          required
        >
          <option value="" disabled>
            Select a student
          </option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <label>
          <input
            type="radio"
            name="status"
            value="present"
            checked={status === 'present'}
            onChange={() => setStatus('present')}
          />
          Present
        </label>
        <label>
          <input
            type="radio"
            name="status"
            value="absent"
            checked={status === 'absent'}
            onChange={() => setStatus('absent')}
          />
          Absent
        </label>
        <button type="submit">Mark Attendance</button>
      </form>

      <h3>Attendance Records</h3>
      <ul>
        {attendance.map((record, index) => (
          <li key={index}>
            {new Date(record.date).toLocaleDateString()} - {record.status}
          </li>
        ))}
      </ul>

      <h3>Student Attendance Percentage</h3>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name}: {calculatePercentage(student.id).toFixed(2)}%
          </li>
        ))}
      </ul>

      <h3>Overall Attendance Percentage</h3>
      <p>{overallPercentage().toFixed(2)}%</p>
    </div>
  );
}

export default AttendanceTracker;