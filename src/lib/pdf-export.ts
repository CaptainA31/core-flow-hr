import jsPDF from 'jspdf'
import 'jspdf-autotable'

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF
  }
}

export const exportAttendanceReport = (attendanceData: any[], period: string) => {
  const doc = new jsPDF()
  const date = new Date().toLocaleDateString()
  
  // Header
  doc.setFontSize(20)
  doc.text('Attendance Report', 20, 20)
  doc.setFontSize(12)
  doc.text(`Period: ${period}`, 20, 30)
  doc.text(`Generated on: ${date}`, 20, 40)
  
  // Table
  const tableData = attendanceData.map(record => [
    record.name,
    record.department,
    record.status,
    record.checkIn || 'N/A',
    record.checkOut || 'N/A',
    record.workingHours || 'N/A'
  ])
  
  doc.autoTable({
    head: [['Employee', 'Department', 'Status', 'Check In', 'Check Out', 'Working Hours']],
    body: tableData,
    startY: 50,
    styles: { fontSize: 10 },
    headStyles: { fillColor: [59, 130, 246] }
  })
  
  doc.save(`attendance-report-${period}-${date}.pdf`)
}

export const exportPayrollReport = (payrollData: any[], period: string) => {
  const doc = new jsPDF()
  const date = new Date().toLocaleDateString()
  
  doc.setFontSize(20)
  doc.text('Payroll Report', 20, 20)
  doc.setFontSize(12)
  doc.text(`Period: ${period}`, 20, 30)
  doc.text(`Generated on: ${date}`, 20, 40)
  
  const tableData = payrollData.map(record => [
    record.name,
    record.department,
    record.baseSalary.toLocaleString(),
    record.overtime.toLocaleString(),
    record.deductions.toLocaleString(),
    record.netSalary.toLocaleString()
  ])
  
  doc.autoTable({
    head: [['Employee', 'Department', 'Base Salary', 'Overtime', 'Deductions', 'Net Salary']],
    body: tableData,
    startY: 50,
    styles: { fontSize: 10 },
    headStyles: { fillColor: [59, 130, 246] }
  })
  
  doc.save(`payroll-report-${period}-${date}.pdf`)
}

export const exportDepartmentAnalytics = (departments: any[]) => {
  const doc = new jsPDF()
  const date = new Date().toLocaleDateString()
  
  doc.setFontSize(20)
  doc.text('Department Analytics Report', 20, 20)
  doc.setFontSize(12)
  doc.text(`Generated on: ${date}`, 20, 30)
  
  const tableData = departments.map(dept => [
    dept.name,
    dept.employees.toString(),
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(dept.avgSalary),
    `${dept.attendance}%`
  ])
  
  doc.autoTable({
    head: [['Department', 'Employees', 'Avg Salary', 'Attendance Rate']],
    body: tableData,
    startY: 40,
    styles: { fontSize: 12 },
    headStyles: { fillColor: [59, 130, 246] }
  })
  
  doc.save(`department-analytics-${date}.pdf`)
}

export const exportEmployeeReport = (employees: any[]) => {
  const doc = new jsPDF()
  const date = new Date().toLocaleDateString()
  
  doc.setFontSize(20)
  doc.text('Employee Report', 20, 20)
  doc.setFontSize(12)
  doc.text(`Generated on: ${date}`, 20, 30)
  
  const tableData = employees.map(emp => [
    emp.name,
    emp.position,
    emp.department,
    emp.email,
    emp.phone,
    emp.status
  ])
  
  doc.autoTable({
    head: [['Name', 'Position', 'Department', 'Email', 'Phone', 'Status']],
    body: tableData,
    startY: 40,
    styles: { fontSize: 10 },
    headStyles: { fillColor: [59, 130, 246] }
  })
  
  doc.save(`employee-report-${date}.pdf`)
}

export const exportLeaveReport = (leaves: any[]) => {
  const doc = new jsPDF()
  const date = new Date().toLocaleDateString()
  
  doc.setFontSize(20)
  doc.text('Leave Management Report', 20, 20)
  doc.setFontSize(12)
  doc.text(`Generated on: ${date}`, 20, 30)
  
  const tableData = leaves.map(leave => [
    leave.employee,
    leave.type,
    leave.startDate,
    leave.endDate,
    leave.days.toString(),
    leave.status
  ])
  
  doc.autoTable({
    head: [['Employee', 'Type', 'Start Date', 'End Date', 'Days', 'Status']],
    body: tableData,
    startY: 40,
    styles: { fontSize: 10 },
    headStyles: { fillColor: [59, 130, 246] }
  })
  
  doc.save(`leave-report-${date}.pdf`)
}

export const downloadReportTemplate = (reportType: string) => {
  const doc = new jsPDF()
  
  doc.setFontSize(20)
  doc.text(`${reportType} Report Template`, 20, 20)
  doc.setFontSize(12)
  doc.text('This is a template for generating custom reports.', 20, 40)
  doc.text('Fill in your data and customize as needed.', 20, 50)
  
  // Sample table structure
  const sampleData = [
    ['Sample Column 1', 'Sample Column 2', 'Sample Column 3', 'Sample Column 4'],
    ['Data Row 1', 'Data Row 1', 'Data Row 1', 'Data Row 1'],
    ['Data Row 2', 'Data Row 2', 'Data Row 2', 'Data Row 2']
  ]
  
  doc.autoTable({
    head: [['Column 1', 'Column 2', 'Column 3', 'Column 4']],
    body: sampleData,
    startY: 70,
    styles: { fontSize: 10 },
    headStyles: { fillColor: [59, 130, 246] }
  })
  
  doc.save(`${reportType.toLowerCase()}-template.pdf`)
}