import React, { useState } from 'react';

function FeeManager({ students, addFeePayment }) {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addFeePayment(parseInt(selectedStudent), parseFloat(amount), paymentMethod);
    setSelectedStudent('');
    setAmount('');
    setPaymentMethod('');
  };

  return (
    <div className="form-container">
      <h2>Fee Management</h2>
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
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          required
        >
          <option value="" disabled>
            Select Payment Method
          </option>
          <option value="upi">UPI</option>
          <option value="credit_card">Credit Card</option>
          <option value="net_banking">Net Banking</option>
          <option value="phonepe">PhonePe</option>
          <option value="google_pay">Google Pay</option>
          <option value="paytm">Paytm</option>
          <option value="online_banking">Online Banking</option>
        </select>
        <button type="submit">Add Fee Payment</button>
      </form>
    </div>
  );
}

export default FeeManager;