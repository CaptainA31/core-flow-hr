import { Users, Clock, Calendar, DollarSign, UserCheck, UserX, TrendingUp, AlertCircle } from "lucide-react"
import { StatCard } from "@/components/dashboard/StatCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AddEmployeeDialog } from "@/components/forms/AddEmployeeDialog"
import { useToast } from "@/hooks/use-toast"
import { useEmployees } from "@/hooks/useEmployees"
import { useAttendance } from "@/hooks/useAttendance"
import { useLeaveRequests } from "@/hooks/useLeaveRequests"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"

export default function Dashboard() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const { data: employees = [] } = useEmployees()
  const { data: attendance = [] } = useAttendance()
  const { data: leaveRequests = [] } = useLeaveRequests()

  const totalEmployees = employees.length
  const activeEmployees = employees.filter(emp => emp.status === 'Active').length
  const onLeaveEmployees = employees.filter(emp => emp.status === 'On Leave').length
  const pendingLeaveRequests = leaveRequests.filter(req => req.status === 'Pending').length
  const todayAttendance = attendance.filter(att => att.status === 'Present').length

  const stats = [
    {
      title: "Total Employees",
      value: totalEmployees,
      description: "Active employees",
      icon: Users,
      trend: { value: 12, isPositive: true }
    },
    {
      title: "Present Today",
      value: todayAttendance,
      description: `${activeEmployees > 0 ? ((todayAttendance / activeEmployees) * 100).toFixed(0) : 0}% attendance rate`,
      icon: UserCheck,
      trend: { value: 2, isPositive: true }
    },
    {
      title: "On Leave",
      value: onLeaveEmployees,
      description: "Various leave types",
      icon: Calendar,
    },
    {
      title: "Pending Requests",
      value: pendingLeaveRequests,
      description: "Leave requests to review",
      icon: AlertCircle,
      trend: { value: 3, isPositive: false }
    }
  ]

  const recentActivities = [
    { id: 1, action: "New employee onboarded", employee: "Sarah Johnson", time: "2 hours ago", type: "success" },
    { id: 2, action: "Leave request submitted", employee: "Mike Chen", time: "4 hours ago", type: "warning" },
    { id: 3, action: "Payroll processed", employee: "All employees", time: "1 day ago", type: "info" },
    { id: 4, action: "Late arrival recorded", employee: "Alex Rodriguez", time: "2 days ago", type: "alert" },
  ]

  const pendingActions = [
    { id: 1, title: "Review 5 leave requests", priority: "high", count: 5 },
    { id: 2, title: "Approve 3 overtime requests", priority: "medium", count: 3 },
    { id: 3, title: "Process monthly payroll", priority: "high", count: 1 },
    { id: 4, title: "Update employee documents", priority: "low", count: 8 },
  ]

  const handleMarkAttendance = async () => {
    try {
      // Get today's date
      const today = new Date().toISOString().split('T')[0]
      
      // Check if attendance already exists for today
      const { data: existingAttendance } = await supabase
        .from('attendance')
        .select('*')
        .eq('date', today)
      
      if (existingAttendance && existingAttendance.length > 0) {
        toast({
          title: "Attendance Already Marked",
          description: "Attendance for today has already been recorded.",
          variant: "destructive"
        })
        return
      }

      // Mark attendance for all active employees
      const activeEmployees = employees.filter(emp => emp.status === 'Active')
      const attendanceRecords = activeEmployees.map(employee => ({
        employee_id: employee.id,
        date: today,
        status: 'Present',
        check_in_time: '09:00:00',
        work_hours: 8
      }))

      const { error } = await supabase
        .from('attendance')
        .insert(attendanceRecords)

      if (error) throw error

      toast({
        title: "Attendance Marked",
        description: `Attendance marked for ${activeEmployees.length} employees.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark attendance. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleProcessPayroll = async () => {
    try {
      const currentMonth = new Date().toLocaleString('default', { month: 'long' })
      const currentYear = new Date().getFullYear()
      
      // Check if payroll already exists for current month
      const { data: existingPayroll } = await supabase
        .from('payroll')
        .select('*')
        .eq('month', currentMonth)
        .eq('year', currentYear)
      
      if (existingPayroll && existingPayroll.length > 0) {
        toast({
          title: "Payroll Already Processed",
          description: `Payroll for ${currentMonth} ${currentYear} has already been processed.`,
          variant: "destructive"
        })
        return
      }

      // Process payroll for all active employees
      const activeEmployees = employees.filter(emp => emp.status === 'Active')
      const payrollRecords = activeEmployees.map(employee => {
        const basicSalary = employee.salary
        const allowances = basicSalary * 0.1 // 10% allowances
        const tax = basicSalary * 0.2 // 20% tax
        const netSalary = basicSalary + allowances - tax
        
        return {
          employee_id: employee.id,
          month: currentMonth,
          year: currentYear,
          basic_salary: basicSalary,
          allowances,
          tax,
          net_salary: netSalary,
          status: 'Processed',
          processed_date: new Date().toISOString().split('T')[0]
        }
      })

      const { error } = await supabase
        .from('payroll')
        .insert(payrollRecords)

      if (error) throw error

      toast({
        title: "Payroll Processed",
        description: `Payroll processed for ${activeEmployees.length} employees.`,
      })
      
      navigate('/payroll')
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process payroll. Please try again.",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening at your company today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.employee}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                    <Badge 
                      variant={activity.type === 'success' ? 'default' : 
                               activity.type === 'warning' ? 'secondary' : 
                               activity.type === 'alert' ? 'destructive' : 'outline'}
                      className="text-xs"
                    >
                      {activity.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Pending Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingActions.map((action) => (
                <div key={action.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{action.title}</p>
                    <Badge 
                      variant={action.priority === 'high' ? 'destructive' : 
                               action.priority === 'medium' ? 'secondary' : 'outline'}
                      className="text-xs"
                    >
                      {action.priority} priority
                    </Badge>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      if (action.title.includes('leave')) navigate('/leaves')
                      else if (action.title.includes('payroll')) navigate('/payroll')
                      else if (action.title.includes('documents')) navigate('/documents')
                      else navigate('/reports')
                    }}
                  >
                    Review ({action.count})
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <AddEmployeeDialog />
            <Button 
              variant="outline" 
              className="h-24 flex-col gap-2"
              onClick={handleMarkAttendance}
            >
              <Clock className="h-6 w-6" />
              Mark Attendance
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex-col gap-2"
              onClick={() => navigate('/leaves')}
            >
              <Calendar className="h-6 w-6" />
              Apply Leave
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex-col gap-2"
              onClick={handleProcessPayroll}
            >
              <DollarSign className="h-6 w-6" />
              Generate Payroll
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}