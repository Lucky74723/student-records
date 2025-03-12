import React from 'react';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

function Reports({ students }) {
  // Export report to CSV
  const exportToCSV = () => {
    const headers = ['Name', 'Date of Birth', 'Contact', 'Grade', 'Attendance', 'Fees Paid', 'Payment Method'];
    const csvContent = [
      headers.join(','),
      ...students.map((student) =>
        [
          student.name,
          student.dob,
          student.contact,
          student.grade,
          student.attendance && student.attendance.length > 0 ? student.attendance.join(', ') : 'No attendance records',
          `₹${student.fees && student.fees.length > 0 ? student.fees.reduce((sum, fee) => sum + fee.amount, 0) : 0}`,
          student.fees && student.fees.length > 0 ? student.fees.map(fee => fee.method).join(', ') : 'No payment method'
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'student_reports.csv';
    link.click();
  };

  // Export report to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Student Reports', 10, 10);
    students.forEach((student, index) => {
      doc.text(
        `${student.name}, ${student.dob}, ${student.contact}, ${student.grade}, ${student.attendance && student.attendance.length > 0 ? student.attendance.join(', ') : 'No attendance records'}, ₹${student.fees && student.fees.length > 0 ? student.fees.reduce((sum, fee) => sum + fee.amount, 0) : 0}, ${student.fees && student.fees.length > 0 ? student.fees.map(fee => fee.method).join(', ') : 'No payment method'}`,
        10,
        20 + index * 10
      );
    });
    doc.save('student_reports.pdf');
  };

  // Export report to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(students.map((student) => ({
      Name: student.name,
      'Date of Birth': student.dob,
      Contact: student.contact,
      Grade: student.grade,
      Attendance: student.attendance && student.attendance.length > 0 ? student.attendance.join(', ') : 'No attendance records',
      'Fees Paid': `₹${student.fees && student.fees.length > 0 ? student.fees.reduce((sum, fee) => sum + fee.amount, 0) : 0}`,
      'Payment Method': student.fees && student.fees.length > 0 ? student.fees.map(fee => fee.method).join(', ') : 'No payment method'
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Student Reports');
    XLSX.writeFile(workbook, 'student_reports.xlsx');
  };

  // Calculate total fees paid
  const totalFeesPaid = students.reduce((sum, student) => sum + (student.fees && student.fees.length > 0 ? student.fees.reduce((feeSum, fee) => feeSum + fee.amount, 0) : 0), 0);

  return (
    <div className="records-container">
      <h2>Student Reports</h2>
      <button onClick={exportToCSV}>Export to CSV</button>
      <button onClick={exportToPDF}>Export to PDF</button>
      <button onClick={exportToExcel}>Export to Excel</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Contact</th>
            <th>Grade</th>
            <th>Attendance</th>
            <th>Fees Paid</th>
            <th>Payment Method</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.dob}</td>
              <td>{student.contact}</td>
              <td>{student.grade}</td>
              <td>{student.attendance && student.attendance.length > 0 ? student.attendance.join(', ') : 'No attendance records'}</td>
              <td>₹{student.fees && student.fees.length > 0 ? student.fees.reduce((sum, fee) => sum + fee.amount, 0) : 0}</td>
              <td>{student.fees && student.fees.length > 0 ? student.fees.map(fee => fee.method).join(', ') : 'No payment method'}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="5">Total Fees Paid</td>
            <td>₹{totalFeesPaid}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Reports;
