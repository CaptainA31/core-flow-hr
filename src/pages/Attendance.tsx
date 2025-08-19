import { useState } from "react"
import { Calendar, Clock, Download, Filter, Search, Users, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { exportAttendanceReport } from "@/lib/pdf-export"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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

export default function Attendance() {
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const handleExportReport = () => {
    exportAttendanceReport(attendanceData, "Current Month")
    toast({
      title: "Report Exported",
      description: "Attendance report has been downloaded successfully.",
    })
  }
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  const attendanceData = [
    {
      id: 1,
      name: "Sarah Johnson",
      checkIn: "09:00 AM",
      checkOut: "06:00 PM",
      status: "Present",
      workHours: "9.0",
      overtime: "0.0"
    },
    {
      id: 2,
      name: "Mike Chen",
      checkIn: "09:15 AM",
      checkOut: "06:30 PM",
      status: "Late",
      workHours: "9.25",
      overtime: "0.5"
    },
    {
      id: 3,
      name: "Alex Rodriguez",
      checkIn: "-",
      checkOut: "-",
      status: "Absent",
      workHours: "0.0",
      overtime: "0.0"
    },
    {
      id: 4,
      name: "Emily Davis",
      checkIn: "08:45 AM",
      checkOut: "05:45 PM",
      status: "Present",
      workHours: "9.0",
      overtime: "0.0"
    },
    {
      id: 5,
      name: "David Wilson",
      checkIn: "10:00 AM",
      checkOut: "07:00 PM",
      status: "Half Day",
      workHours: "4.5",
      overtime: "0.0"
    }
  ]

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
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
          <Button className="gap-2">
            <Clock className="h-4 w-4" />
            Mark Attendance
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <div className="text-2xl font-bold text-foreground">231</div>
            </div>
            <p className="text-xs text-muted-foreground">Present Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-warning" />
              <div className="text-2xl font-bold text-warning">15</div>
            </div>
            <p className="text-xs text-muted-foreground">Late Arrivals</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-destructive" />
              <div className="text-2xl font-bold text-destructive">12</div>
            </div>
            <p className="text-xs text-muted-foreground">Absent</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-secondary" />
              <div className="text-2xl font-bold text-secondary">8</div>
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
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                  <SelectItem value="late">Late</SelectItem>
                  <SelectItem value="half-day">Half Day</SelectItem>
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
                {attendanceData.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            {getInitials(record.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{record.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{record.checkIn}</TableCell>
                    <TableCell>{record.checkOut}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(record.status)} className="gap-1">
                        {getStatusIcon(record.status)}
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{record.workHours}h</TableCell>
                    <TableCell>{record.overtime}h</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}