import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AlumniManagement() {
  // Alumni Records Management
  const [alumni, setAlumni] = useState([]);
  const [name, setName] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [contact, setContact] = useState('');
  const [job, setJob] = useState('');

  // Networking Features
  const [updates, setUpdates] = useState([]);
  const [updateText, setUpdateText] = useState('');

  // Search and Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filterYear, setFilterYear] = useState('');

  // Event Management
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');

  // Selected Alumni
  const [selectedAlumni, setSelectedAlumni] = useState(null);

  // Fetch alumni records from the backend
  useEffect(() => {
    axios.get('/api/alumni')
      .then(response => setAlumni(response.data))
      .catch(error => console.error('Error fetching alumni:', error));
  }, []);

  // Add a new alumni record
  const addAlumni = (e) => {
    e.preventDefault();
    const newAlumni = {
      name,
      graduationYear,
      contact,
      job,
    };
    axios.post('/api/alumni', newAlumni)
      .then(response => {
        setAlumni([...alumni, response.data]);
        setName('');
        setGraduationYear('');
        setContact('');
        setJob('');
      })
      .catch(error => console.error('Error adding alumni:', error));
  };

  // Delete an alumni record
  const deleteAlumni = (id) => {
    setAlumni(alumni.filter((alum) => alum.id !== id));
  };

  // Add a new networking update
  const addUpdate = (e) => {
    e.preventDefault();
    const newUpdate = {
      id: Date.now(),
      text: updateText,
      timestamp: new Date().toLocaleString(),
    };
    setUpdates([...updates, newUpdate]);
    setUpdateText('');
  };

  // Filter alumni based on search and filter criteria
  const filteredAlumni = alumni.filter((alum) => {
    const matchesSearch = alum.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesYear = filterYear ? alum.graduationYear === parseInt(filterYear) : true;
    return matchesSearch && matchesYear;
  });

  // Add a new event
  const addEvent = (e) => {
    e.preventDefault();
    const newEvent = {
      id: Date.now(),
      name: eventName,
      date: eventDate,
      attendees: [],
    };
    setEvents([...events, newEvent]);
    setEventName('');
    setEventDate('');
  };

  // Add an attendee to an event
  const addAttendee = (eventId, attendeeName) => {
    const updatedEvents = events.map((event) =>
      event.id === eventId
        ? { ...event, attendees: [...event.attendees, attendeeName] }
        : event
    );
    setEvents(updatedEvents);
  };

  // Select an alumni
  const selectAlumni = (alum) => {
    setSelectedAlumni(alum);
  };

  return (
    <div className="container">
      <h2>Alumni Management</h2>

      {/* Alumni Records Management */}
      <div className="alumni-section">
        <h3>Alumni Records</h3>
        <form onSubmit={addAlumni}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Graduation Year"
            value={graduationYear}
            onChange={(e) => setGraduationYear(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Contact Information"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Current Job"
            value={job}
            onChange={(e) => setJob(e.target.value)}
            required
          />
          <button type="submit">Add Alumni</button>
        </form>

        {/* Search and Filter */}
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <input
            type="number"
            placeholder="Filter by graduation year"
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
          />
        </div>

        {/* Alumni Records Table */}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Graduation Year</th>
              <th>Contact</th>
              <th>Job</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlumni.map((alum) => (
              <tr key={alum.id} onClick={() => selectAlumni(alum)}>
                <td>{alum.name}</td>
                <td>{alum.graduationYear}</td>
                <td>{alum.contact}</td>
                <td>{alum.job}</td>
                <td>
                  <button onClick={() => deleteAlumni(alum.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Selected Alumni Details */}
        {selectedAlumni && (
          <div className="selected-alumni">
            <h3>Selected Alumni Details</h3>
            <p><strong>Name:</strong> {selectedAlumni.name}</p>
            <p><strong>Graduation Year:</strong> {selectedAlumni.graduationYear}</p>
            <p><strong>Contact:</strong> {selectedAlumni.contact}</p>
            <p><strong>Job:</strong> {selectedAlumni.job}</p>
          </div>
        )}
      </div>

      {/* Networking Features */}
      <div className="networking-section">
        <h3>Networking Updates</h3>
        <form onSubmit={addUpdate}>
          <textarea
            placeholder="Share an update or job opportunity..."
            value={updateText}
            onChange={(e) => setUpdateText(e.target.value)}
            required
          />
          <button type="submit">Post Update</button>
        </form>

        <div className="updates-list">
          {updates.map((update) => (
            <div key={update.id} className="update">
              <p>{update.text}</p>
              <small>{update.timestamp}</small>
            </div>
          ))}
        </div>
      </div>

      {/* Event Management */}
      <div className="event-management">
        <h3>Event Management</h3>
        <form onSubmit={addEvent}>
          <input
            type="text"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />
          <button type="submit">Add Event</button>
        </form>

        <div className="events-list">
          {events.map((event) => (
            <div key={event.id} className="event">
              <h4>{event.name}</h4>
              <p>Date: {event.date}</p>
              <p>Attendees: {event.attendees.join(', ')}</p>
              <input
                type="text"
                placeholder="Add attendee"
                onBlur={(e) => addAttendee(event.id, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AlumniManagement;