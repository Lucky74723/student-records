import React from 'react';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

function Reports({ students }) {
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

  const totalFeesPaid = students.reduce((sum, student) => sum + (student.fees && student.fees.length > 0 ? student.fees.reduce((feeSum, fee) => feeSum + fee.amount, 0) : 0), 0);

  const attendanceData = students.map(student => ({
    name: student.name,
    attendance: student.attendance ? student.attendance.filter(a => a.status === 'present').length : 0
  }));

  return (
    <div className="records-container">
      <h2>Student Reports</h2>
      <button onClick={exportToCSV}>Export to CSV</button>
      <button onClick={exportToPDF}>Export to PDF</button>
      <button onClick={exportToExcel}>Export to Excel</button>

      <h3>Attendance Overview</h3>
      <PieChart width={400} height={400}>
        <Pie
          data={attendanceData}
          dataKey="attendance"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {attendanceData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default Reports;