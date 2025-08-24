import { useState } from "react"
import { Calendar, Plus, Filter, Search, CheckCircle, XCircle, Clock, User, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { exportLeaveReport } from "@/lib/pdf-export"
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

export default function LeaveManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showApplyDialog, setShowApplyDialog] = useState(false)
  const { toast } = useToast()

  const handleExportReport = () => {
    const exportData = leaveRequests.map(request => ({
      employee: request.employeeName,
      type: request.leaveType,
      startDate: request.startDate,
      endDate: request.endDate,
      days: request.days,
      status: request.status
    }))
    exportLeaveReport(exportData)
    toast({
      title: "Report Exported",
      description: "Leave management report has been downloaded successfully.",
    })
  }

  const leaveRequests = [
    {
      id: 1,
      employeeName: "Sarah Johnson",
      leaveType: "Annual Leave",
      startDate: "2024-01-15",
      endDate: "2024-01-17",
      days: 3,
      status: "Pending",
      appliedDate: "2024-01-10",
      reason: "Family vacation"
    },
    {
      id: 2,
      employeeName: "Mike Chen",
      leaveType: "Sick Leave",
      startDate: "2024-01-12",
      endDate: "2024-01-12",
      days: 1,
      status: "Approved",
      appliedDate: "2024-01-11",
      reason: "Medical appointment"
    },
    {
      id: 3,
      employeeName: "Alex Rodriguez",
      leaveType: "Personal Leave",
      startDate: "2024-01-20",
      endDate: "2024-01-22",
      days: 3,
      status: "Rejected",
      appliedDate: "2024-01-08",
      reason: "Personal work"
    }
  ]

  // Filter leave requests based on search term and status
  const filteredLeaveRequests = leaveRequests.filter(request => {
    const matchesSearch = request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.leaveType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.reason.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || request.status.toLowerCase() === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const leaveBalance = [
    { type: "Annual Leave", used: 8, remaining: 22, total: 30 },
    { type: "Sick Leave", used: 3, remaining: 7, total: 10 },
    { type: "Personal Leave", used: 2, remaining: 3, total: 5 },
    { type: "Maternity Leave", used: 0, remaining: 90, total: 90 }
  ]

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "default"
      case "Pending": return "secondary"
      case "Rejected": return "destructive"
      default: return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved": return <CheckCircle className="h-4 w-4" />
      case "Pending": return <Clock className="h-4 w-4" />
      case "Rejected": return <XCircle className="h-4 w-4" />
      default: return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Leave Management</h1>
          <p className="text-muted-foreground">
            Manage employee leave requests and balances
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={handleExportReport}>
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Apply for Leave
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Apply for Leave</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Leave Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select leave type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="annual">Annual Leave</SelectItem>
                    <SelectItem value="sick">Sick Leave</SelectItem>
                    <SelectItem value="personal">Personal Leave</SelectItem>
                    <SelectItem value="emergency">Emergency Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Start Date</label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="text-sm font-medium">End Date</label>
                  <Input type="date" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Reason</label>
                <Textarea placeholder="Please provide a reason for your leave request..." />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={() => {
                  setShowApplyDialog(false)
                  toast({
                    title: "Leave Request Submitted",
                    description: "Your leave request has been submitted for approval.",
                  })
                }}>Submit Request</Button>
                <Button variant="outline" onClick={() => setShowApplyDialog(false)}>Cancel</Button>
              </div>
            </div>
          </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-warning" />
              <div className="text-2xl font-bold text-warning">5</div>
            </div>
            <p className="text-xs text-muted-foreground">Pending Requests</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <div className="text-2xl font-bold text-success">23</div>
            </div>
            <p className="text-xs text-muted-foreground">Approved This Month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              <div className="text-2xl font-bold text-primary">12</div>
            </div>
            <p className="text-xs text-muted-foreground">On Leave Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-secondary" />
              <div className="text-2xl font-bold text-secondary">156</div>
            </div>
            <p className="text-xs text-muted-foreground">Total Leave Days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Leave Requests */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Leave Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search requests..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Leave Type</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLeaveRequests.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center">No leave requests found</TableCell>
                      </TableRow>
                    ) : (
                      filteredLeaveRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                {getInitials(request.employeeName)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{request.employeeName}</span>
                          </div>
                        </TableCell>
                        <TableCell>{request.leaveType}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{request.startDate} to {request.endDate}</div>
                            <div className="text-muted-foreground">{request.days} days</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(request.status)} className="gap-1">
                            {getStatusIcon(request.status)}
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                           {request.status === "Pending" && (
                             <div className="flex gap-1">
                               <Button 
                                 size="sm" 
                                 variant="outline" 
                                 className="h-8 px-2"
                                 onClick={() => toast({
                                   title: "Leave Approved",
                                   description: `${request.employeeName}'s leave request has been approved.`,
                                 })}
                               >
                                 <CheckCircle className="h-3 w-3" />
                               </Button>
                               <Button 
                                 size="sm" 
                                 variant="outline" 
                                 className="h-8 px-2"
                                 onClick={() => toast({
                                   title: "Leave Rejected",
                                   description: `${request.employeeName}'s leave request has been rejected.`,
                                   variant: "destructive"
                                 })}
                               >
                                 <XCircle className="h-3 w-3" />
                               </Button>
                             </div>
                           )}
                        </TableCell>
                      </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leave Balance */}
        <Card>
          <CardHeader>
            <CardTitle>Leave Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaveBalance.map((leave, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{leave.type}</span>
                    <span className="text-muted-foreground">{leave.remaining}/{leave.total}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${(leave.used / leave.total) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Used: {leave.used}</span>
                    <span>Remaining: {leave.remaining}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}