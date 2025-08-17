import { Users, Clock, Calendar, DollarSign, UserCheck, UserX, TrendingUp, AlertCircle } from "lucide-react"
import { StatCard } from "@/components/dashboard/StatCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Dashboard() {
  const stats = [
    {
      title: "Total Employees",
      value: 247,
      description: "Active employees",
      icon: Users,
      trend: { value: 12, isPositive: true }
    },
    {
      title: "Present Today",
      value: 231,
      description: "94% attendance rate",
      icon: UserCheck,
      trend: { value: 2, isPositive: true }
    },
    {
      title: "On Leave",
      value: 12,
      description: "Various leave types",
      icon: Calendar,
    },
    {
      title: "Monthly Payroll",
      value: "$1.2M",
      description: "Current month estimate",
      icon: DollarSign,
      trend: { value: 8, isPositive: true }
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
                  <Button size="sm" variant="outline">
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
            <Button className="h-24 flex-col gap-2">
              <Users className="h-6 w-6" />
              Add Employee
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2">
              <Clock className="h-6 w-6" />
              Mark Attendance
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2">
              <Calendar className="h-6 w-6" />
              Apply Leave
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2">
              <DollarSign className="h-6 w-6" />
              Generate Payroll
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}