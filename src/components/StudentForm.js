import React, { useState } from 'react';

function StudentForm({ addStudent }) {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [enrollmentDate, setEnrollmentDate] = useState('');
  const [classGrade, setClassGrade] = useState('');
  const [section, setSection] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [studentId, setStudentId] = useState('');
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addStudent({
      name,
      dob,
      gender,
      contact,
      address,
      enrollmentDate,
      classGrade,
      section,
      rollNumber,
      studentId,
      admissionNumber,
      fatherName,
      motherName,
      emergencyContact,
     
    });
    setName('');
    setDob('');
    setGender('');
    setContact('');
    setAddress('');
    setEnrollmentDate('');
    setClassGrade('');
    setSection('');
    setRollNumber('');
    setStudentId('');
    setAdmissionNumber('');
    setFatherName('');
    setMotherName('');
    setEmergencyContact('');
   
  };

  return (
    <div className="form-container">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input
          type="text"
          placeholder="Contact Information"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Enrollment Date"
          value={enrollmentDate}
          onChange={(e) => setEnrollmentDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Class/Grade"
          value={classGrade}
          onChange={(e) => setClassGrade(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Section"
          value={section}
          onChange={(e) => setSection(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Admission Number"
          value={admissionNumber}
          onChange={(e) => setAdmissionNumber(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Father's Name"
          value={fatherName}
          onChange={(e) => setFatherName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Mother's Name"
          value={motherName}
          onChange={(e) => setMotherName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Emergency Contact"
          value={emergencyContact}
          onChange={(e) => setEmergencyContact(e.target.value)}
          required
        />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}

export default StudentForm;