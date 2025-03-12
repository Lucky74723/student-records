import React, { useState } from 'react';

function UserManagement({ students, addStudent, updateStudent, deleteStudent }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [contact, setContact] = useState('');
  const [photo, setPhoto] = useState('');

  const handleAddUser = (e) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      role,
      contact,
      photo,
    };
    addStudent(newUser);
    setName('');
    setEmail('');
    setRole('');
    setContact('');
    setPhoto('');
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...selectedStudent,
      name,
      email,
      role,
      contact,
      photo,
    };
    updateStudent(updatedUser);
    setSelectedStudent(null);
    setName('');
    setEmail('');
    setRole('');
    setContact('');
    setPhoto('');
  };

  const handleEditUser = (user) => {
    setSelectedStudent(user);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setContact(user.contact);
    setPhoto(user.photo);
  };

  const filteredUsers = students.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole ? user.role === filterRole : true;
    return matchesSearch && matchesRole;
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="container">
      <h2>User Management</h2>

      <div className="authentication">
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
      </div>

      <form onSubmit={selectedStudent ? handleUpdateUser : handleAddUser}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Photo URL"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="" disabled>Select Role</option>
          <option value="admin">Admin</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
          <option value="parent">Parent</option>
        </select>
        <button type="submit">{selectedStudent ? 'Update User' : 'Add User'}</button>
      </form>

      <div className="search-filter">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
          <option value="parent">Parent</option>
        </select>
      </div>

      <h3>Users</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Contact</th>
            <th>Photo</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.contact}</td>
              <td><img src={user.photo} alt={user.name} width="50" /></td>
              <td>
                <button onClick={() => handleEditUser(user)}>Edit</button>
                <button onClick={() => deleteStudent(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;