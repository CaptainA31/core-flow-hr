import { useState } from "react"
import { Calendar, Clock, Download, Filter, Search, Users, CheckCircle, XCircle, AlertCircle, UserCheck, UserX, Timer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { exportAttendanceReport } from "@/lib/pdf-export"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAttendance } from "@/hooks/useAttendance"
import { useEmployees } from "@/hooks/useEmployees"
import { supabase } from "@/integrations/supabase/client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Attendance() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedEmployee, setSelectedEmployee] = useState("")
  const [checkInTime, setCheckInTime] = useState("")
  const [checkOutTime, setCheckOutTime] = useState("")
  const { toast } = useToast()
  
  const { data: attendance = [], refetch } = useAttendance()
  const { data: employees = [] } = useEmployees()

  const handleExportReport = () => {
    exportAttendanceReport(attendance, "Current Month")
    toast({
      title: "Report Exported",
      description: "Attendance report has been downloaded successfully.",
    })
  }

  const handleManualAttendance = async () => {
    if (!selectedEmployee || !checkInTime) {
      toast({
        title: "Error",
        description: "Please select an employee and check-in time.",
        variant: "destructive"
      })
      return
    }

    try {
      const workHours = checkOutTime ? 
        (new Date(`1970-01-01T${checkOutTime}:00`).getTime() - new Date(`1970-01-01T${checkInTime}:00`).getTime()) / (1000 * 60 * 60) :
        0

      const { error } = await supabase
        .from('attendance')
        .insert({
          employee_id: selectedEmployee,
          date: selectedDate,
          check_in_time: checkInTime,
          check_out_time: checkOutTime || null,
          work_hours: workHours,
          status: workHours >= 8 ? 'Present' : workHours > 4 ? 'Half Day' : 'Present'
        })

      if (error) throw error

      toast({
        title: "Attendance Recorded",
        description: "Attendance has been recorded successfully.",
      })
      
      setSelectedEmployee("")
      setCheckInTime("")
      setCheckOutTime("")
      refetch()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to record attendance. Please try again.",
        variant: "destructive"
      })
    }
  }

  // Filter attendance data
  const filteredAttendance = attendance.filter(record => {
    const employee = employees.find(emp => emp.id === record.employee_id)
    const employeeName = employee ? `${employee.first_name} ${employee.last_name}` : ''
    
    const matchesSearch = employeeName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDate = record.date === selectedDate
    const matchesStatus = selectedStatus === 'all' || record.status.toLowerCase() === selectedStatus.toLowerCase()
    
    return matchesSearch && matchesDate && matchesStatus
  })

  // Calculate stats for today
  const todayAttendance = attendance.filter(record => record.date === selectedDate)
  const presentCount = todayAttendance.filter(record => record.status === 'Present').length
  const lateCount = todayAttendance.filter(record => record.status === 'Late').length
  const absentCount = employees.filter(emp => emp.status === 'Active').length - todayAttendance.length
  const halfDayCount = todayAttendance.filter(record => record.status === 'Half Day').length

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Present": return "default"
      case "Late": return "secondary"
      case "Absent": return "destructive"
      case "Half Day": return "outline"
      default: return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Present": return <CheckCircle className="h-4 w-4" />
      case "Late": return <AlertCircle className="h-4 w-4" />
      case "Absent": return <XCircle className="h-4 w-4" />
      case "Half Day": return <Clock className="h-4 w-4" />
      default: return null
    }
  }
  
  const formatTime = (timeString: string | null) => {
    if (!timeString) return "-"
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Attendance Management</h1>
          <p className="text-muted-foreground">
            Track and manage employee attendance records
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={handleExportReport}>
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Clock className="h-4 w-4" />
                Manual Attendance
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Record Manual Attendance</DialogTitle>
                <DialogDescription>
                  Record attendance for an employee manually.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Employee</label>
                  <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.filter(emp => emp.status === 'Active').map((employee) => (
                        <SelectItem key={employee.id} value={employee.id}>
                          {employee.first_name} {employee.last_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Check-in Time</label>
                  <Input
                    type="time"
                    value={checkInTime}
                    onChange={(e) => setCheckInTime(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Check-out Time (Optional)</label>
                  <Input
                    type="time"
                    value={checkOutTime}
                    onChange={(e) => setCheckOutTime(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleManualAttendance}>Record Attendance</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <div className="text-2xl font-bold text-foreground">{presentCount}</div>
            </div>
            <p className="text-xs text-muted-foreground">Present Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-warning" />
              <div className="text-2xl font-bold text-warning">{lateCount}</div>
            </div>
            <p className="text-xs text-muted-foreground">Late Arrivals</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-destructive" />
              <div className="text-2xl font-bold text-destructive">{absentCount}</div>
            </div>
            <p className="text-xs text-muted-foreground">Absent</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Timer className="h-4 w-4 text-secondary" />
              <div className="text-2xl font-bold text-secondary">{halfDayCount}</div>
            </div>
            <p className="text-xs text-muted-foreground">Half Day</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-auto"
              />
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                  <SelectItem value="late">Late</SelectItem>
                  <SelectItem value="half day">Half Day</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>

          {/* Attendance Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Check In</TableHead>
                  <TableHead>Check Out</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Work Hours</TableHead>
                  <TableHead>Overtime</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAttendance.map((record) => {
                  const employee = employees.find(emp => emp.id === record.employee_id)
                  if (!employee) return null
                  
                  return (
                    <TableRow key={record.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                              {getInitials(employee.first_name, employee.last_name)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{employee.first_name} {employee.last_name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{formatTime(record.check_in_time)}</TableCell>
                      <TableCell>{formatTime(record.check_out_time)}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(record.status)} className="gap-1">
                          {getStatusIcon(record.status)}
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{record.work_hours || 0}h</TableCell>
                      <TableCell>{record.overtime_hours || 0}h</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}