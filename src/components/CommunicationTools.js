import React, { useState } from 'react';

function CommunicationTools() {
  // State for messages
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Teacher', text: 'Welcome to the new school year!', timestamp: '2023-10-01 10:00' },
    { id: 2, sender: 'Parent', text: 'Thank you for the update.', timestamp: '2023-10-01 11:00' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  // State for announcements
  const [announcements, setAnnouncements] = useState([
    { id: 1, text: 'Parent-Teacher Meeting on Friday.', timestamp: '2023-10-01 09:00' },
  ]);
  const [newAnnouncement, setNewAnnouncement] = useState('');

  // State for notifications
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Your child has been marked absent.', timestamp: '2023-10-01 08:00' },
  ]);
  const [newNotification, setNewNotification] = useState('');

  // State for search and filter
  const [searchQuery, setSearchQuery] = useState('');

  // Send a new message
  const sendMessage = (e) => {
    e.preventDefault();
    const message = {
      id: Date.now(),
      sender: 'User', // Replace with actual sender
      text: newMessage,
      timestamp: new Date().toLocaleString(),
    };
    setMessages([...messages, message]);
    setNewMessage('');
  };

  // Post a new announcement
  const postAnnouncement = (e) => {
    e.preventDefault();
    const announcement = {
      id: Date.now(),
      text: newAnnouncement,
      timestamp: new Date().toLocaleString(),
    };
    setAnnouncements([...announcements, announcement]);
    setNewAnnouncement('');
  };

  // Send a new notification
  const sendNotification = (e) => {
    e.preventDefault();
    const notification = {
      id: Date.now(),
      text: newNotification,
      timestamp: new Date().toLocaleString(),
    };
    setNotifications([...notifications, notification]);
    setNewNotification('');
  };

  // Filter messages, announcements, and notifications based on search criteria
  const filteredMessages = messages.filter((message) =>
    message.text.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredAnnouncements = announcements.filter((announcement) =>
    announcement.text.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredNotifications = notifications.filter((notification) =>
    notification.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <h2>Communication Tools</h2>

      {/* Search and Filter */}
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search messages, announcements, or notifications"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Messaging System */}
      <div className="messaging-system">
        <h3>Messages</h3>
        <form onSubmit={sendMessage}>
          <textarea
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            required
          />
          <button type="submit">Send</button>
        </form>

        <div className="messages-list">
          {filteredMessages.map((message) => (
            <div key={message.id} className="message">
              <p><strong>{message.sender}</strong>: {message.text}</p>
              <small>{message.timestamp}</small>
            </div>
          ))}
        </div>
      </div>

      {/* Announcements */}
      <div className="announcements">
        <h3>Announcements</h3>
        <form onSubmit={postAnnouncement}>
          <textarea
            placeholder="Post an announcement..."
            value={newAnnouncement}
            onChange={(e) => setNewAnnouncement(e.target.value)}
            required
          />
          <button type="submit">Post</button>
        </form>

        <div className="announcements-list">
          {filteredAnnouncements.map((announcement) => (
            <div key={announcement.id} className="announcement">
              <p>{announcement.text}</p>
              <small>{announcement.timestamp}</small>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="notifications">
        <h3>Notifications</h3>
        <form onSubmit={sendNotification}>
          <textarea
            placeholder="Send a notification..."
            value={newNotification}
            onChange={(e) => setNewNotification(e.target.value)}
            required
          />
          <button type="submit">Send</button>
        </form>

        <div className="notifications-list">
          {filteredNotifications.map((notification) => (
            <div key={notification.id} className="notification">
              <p>{notification.text}</p>
              <small>{notification.timestamp}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CommunicationTools;