import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TimetableManagement() {
  const [timetables, setTimetables] = useState([]);
  const [course, setCourse] = useState('');
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');
  const [room, setRoom] = useState('');
  const [teacher, setTeacher] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [filterDay, setFilterDay] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrence, setRecurrence] = useState('weekly');

  // Fetch timetable entries from the backend
  useEffect(() => {
    axios.get('/api/timetables')
      .then(response => setTimetables(response.data))
      .catch(error => console.error('Error fetching timetables:', error));
  }, []);

  // Validate time format (e.g., 10:00 AM)
  const validateTime = (time) => {
    const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i;
    return timeRegex.test(time);
  };

  // Check for conflicts in timetable entries
  const isConflict = (newEntry) => {
    return timetables.some(
      (entry) =>
        entry.day === newEntry.day &&
        entry.time === newEntry.time &&
        (entry.room === newEntry.room || entry.teacher === newEntry.teacher)
    );
  };

  // Add or update a timetable entry
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateTime(time)) {
      alert('Please enter a valid time format (e.g., 10:00 AM).');
      return;
    }

    const newTimetable = { course, day, time, room, teacher };

    if (isConflict(newTimetable)) {
      alert('Conflict detected! Please choose a different time, room, or teacher.');
      return;
    }

    if (editIndex !== null) {
      // Update existing entry
      axios.put(`/api/timetables/${timetables[editIndex]._id}`, newTimetable)
        .then(response => {
          const updatedTimetables = [...timetables];
          updatedTimetables[editIndex] = response.data;
          setTimetables(updatedTimetables);
          setEditIndex(null);
        })
        .catch(error => console.error('Error updating timetable:', error));
    } else {
      // Add new entry
      axios.post('/api/timetables', newTimetable)
        .then(response => {
          if (isRecurring) {
            // Add recurring entries based on recurrence rule
            const recurringEntries = generateRecurringEntries(response.data, recurrence);
            setTimetables([...timetables, ...recurringEntries]);
          } else {
            setTimetables([...timetables, response.data]);
          }
        })
        .catch(error => console.error('Error adding timetable:', error));
    }

    // Clear form fields
    setCourse('');
    setDay('');
    setTime('');
    setRoom('');
    setTeacher('');
    setIsRecurring(false);
  };

  // Generate recurring entries
  const generateRecurringEntries = (entry, recurrence) => {
    const recurringEntries = [];
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    if (recurrence === 'weekly') {
      for (let i = 0; i < 4; i++) {
        // Add entries for the next 4 weeks
        recurringEntries.push({
          ...entry,
          day: daysOfWeek[daysOfWeek.indexOf(entry.day)],
        });
      }
    }

    return recurringEntries;
  };

  // Edit a timetable entry
  const handleEdit = (index) => {
    const timetable = timetables[index];
    setCourse(timetable.course);
    setDay(timetable.day);
    setTime(timetable.time);
    setRoom(timetable.room);
    setTeacher(timetable.teacher);
    setEditIndex(index);
  };

  // Delete a timetable entry
  const handleDelete = (index) => {
    const updatedTimetables = timetables.filter((_, i) => i !== index);
    setTimetables(updatedTimetables);
  };

  // Filter timetable entries by day
  const filteredTimetables = filterDay
    ? timetables.filter((timetable) => timetable.day.toLowerCase() === filterDay.toLowerCase())
    : timetables;

  // Sort timetable entries by time
  const sortedTimetables = filteredTimetables.sort((a, b) => {
    const timeA = a.time.toLowerCase();
    const timeB = b.time.toLowerCase();
    if (timeA < timeB) return -1;
    if (timeA > timeB) return 1;
    return 0;
  });

  // Export timetable to CSV
  const exportToCSV = () => {
    const headers = ['Course', 'Day', 'Time', 'Room', 'Teacher'];
    const csvContent = [
      headers.join(','),
      ...timetables.map((timetable) =>
        [timetable.course, timetable.day, timetable.time, timetable.room, timetable.teacher].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'timetable.csv';
    link.click();
  };

  return (
    <div className="form-container">
      <h2>Timetable Management</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Course ID"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Day"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Time (e.g., 10:00 AM)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Teacher"
          value={teacher}
          onChange={(e) => setTeacher(e.target.value)}
          required
        />
        <label>
          <input
            type="checkbox"
            checked={isRecurring}
            onChange={(e) => setIsRecurring(e.target.checked)}
          />
          Recurring Event
        </label>
        {isRecurring && (
          <select value={recurrence} onChange={(e) => setRecurrence(e.target.value)}>
            <option value="weekly">Weekly</option>
            <option value="daily">Daily</option>
          </select>
        )}
        <button type="submit">
          {editIndex !== null ? 'Update Timetable Entry' : 'Add Timetable Entry'}
        </button>
      </form>

      <h3>Filter Timetable by Day</h3>
      <input
        type="text"
        placeholder="Enter day to filter"
        value={filterDay}
        onChange={(e) => setFilterDay(e.target.value)}
      />

      <h3>Timetable</h3>
      <button onClick={exportToCSV}>Export to CSV</button>
      <ul>
        {sortedTimetables.map((timetable, index) => (
          <li key={index}>
            {timetable.course} - {timetable.day} at {timetable.time} in {timetable.room} with {timetable.teacher}
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TimetableManagement;