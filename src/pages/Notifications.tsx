import { useState } from "react"
import { Bell, CheckCircle, AlertCircle, Clock, User, Settings, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function Notifications() {
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const notifications = [
    {
      id: 1,
      title: "Leave Request Submitted",
      message: "Sarah Johnson has submitted a leave request for 3 days starting January 15th",
      type: "leave",
      priority: "medium",
      timestamp: "2 hours ago",
      read: false,
      user: "Sarah Johnson"
    },
    {
      id: 2,
      title: "Payroll Processing Complete",
      message: "Monthly payroll for December 2023 has been processed successfully for all employees",
      type: "payroll",
      priority: "high",
      timestamp: "5 hours ago",
      read: true,
      user: "System"
    },
    {
      id: 3,
      title: "New Employee Onboarding",
      message: "Alex Rodriguez has completed the onboarding process and is ready to start work",
      type: "employee",
      priority: "low",
      timestamp: "1 day ago",
      read: false,
      user: "Alex Rodriguez"
    },
    {
      id: 4,
      title: "Attendance Alert",
      message: "Mike Chen has been marked late for the third time this month",
      type: "attendance",
      priority: "medium",
      timestamp: "2 days ago",
      read: true,
      user: "Mike Chen"
    },
    {
      id: 5,
      title: "Document Upload Required",
      message: "Please upload your updated employment contract by January 20th",
      type: "document",
      priority: "high",
      timestamp: "3 days ago",
      read: false,
      user: "You"
    }
  ]

  const notificationSettings = [
    { category: "Leave Requests", email: true, push: true, sms: false },
    { category: "Payroll Updates", email: true, push: false, sms: true },
    { category: "Attendance Alerts", email: false, push: true, sms: false },
    { category: "New Employees", email: true, push: true, sms: false },
    { category: "Document Reminders", email: true, push: true, sms: true },
    { category: "System Updates", email: false, push: true, sms: false }
  ]

  const getInitials = (name: string) => {
    if (name === "System") return "SY"
    if (name === "You") return "YU"
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "leave": return "text-blue-500"
      case "payroll": return "text-green-500"
      case "employee": return "text-purple-500"
      case "attendance": return "text-orange-500"
      case "document": return "text-red-500"
      default: return "text-gray-500"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "leave": return <Clock className="h-4 w-4" />
      case "payroll": return <CheckCircle className="h-4 w-4" />
      case "employee": return <User className="h-4 w-4" />
      case "attendance": return <AlertCircle className="h-4 w-4" />
      case "document": return <Bell className="h-4 w-4" />
      default: return <Bell className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive"
      case "medium": return "secondary"
      case "low": return "outline"
      default: return "outline"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with important alerts and messages
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => toast({
              title: "Notifications Marked as Read",
              description: "All notifications have been marked as read.",
            })}
          >
            Mark All as Read
          </Button>
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => toast({
              title: "Settings Updated",
              description: "Notification settings have been updated.",
            })}
          >
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-primary" />
              <div className="text-2xl font-bold text-foreground">23</div>
            </div>
            <p className="text-xs text-muted-foreground">Total Notifications</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-warning" />
              <div className="text-2xl font-bold text-warning">5</div>
            </div>
            <p className="text-xs text-muted-foreground">Unread</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-destructive" />
              <div className="text-2xl font-bold text-destructive">3</div>
            </div>
            <p className="text-xs text-muted-foreground">High Priority</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-secondary" />
              <div className="text-2xl font-bold text-secondary">8</div>
            </div>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Notifications List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search notifications..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="leave">Leave</SelectItem>
                    <SelectItem value="payroll">Payroll</SelectItem>
                    <SelectItem value="employee">Employee</SelectItem>
                    <SelectItem value="attendance">Attendance</SelectItem>
                    <SelectItem value="document">Document</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all-priority">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-priority">All Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-4 border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors ${
                      !notification.read ? 'bg-accent/20 border-primary/20' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {getInitials(notification.user)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <div className={getTypeColor(notification.type)}>
                            {getTypeIcon(notification.type)}
                          </div>
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          <Badge variant={getPriorityColor(notification.priority)} className="text-xs">
                            {notification.priority}
                          </Badge>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary rounded-full" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {notification.timestamp}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            From: {notification.user}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-3">Notification Preferences</h4>
                <div className="space-y-4">
                  {notificationSettings.map((setting, index) => (
                    <div key={index} className="space-y-3">
                      <div className="font-medium text-sm">{setting.category}</div>
                      <div className="space-y-2 pl-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Email</span>
                          <Switch checked={setting.email} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Push</span>
                          <Switch checked={setting.push} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">SMS</span>
                          <Switch checked={setting.sms} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <h4 className="text-sm font-medium mb-3">Delivery Schedule</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-muted-foreground">Quiet Hours</label>
                    <div className="flex gap-2 mt-1">
                      <Select defaultValue="22:00">
                        <SelectTrigger className="flex-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="20:00">8:00 PM</SelectItem>
                          <SelectItem value="21:00">9:00 PM</SelectItem>
                          <SelectItem value="22:00">10:00 PM</SelectItem>
                          <SelectItem value="23:00">11:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                      <span className="text-muted-foreground self-center">to</span>
                      <Select defaultValue="07:00">
                        <SelectTrigger className="flex-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="06:00">6:00 AM</SelectItem>
                          <SelectItem value="07:00">7:00 AM</SelectItem>
                          <SelectItem value="08:00">8:00 AM</SelectItem>
                          <SelectItem value="09:00">9:00 AM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Weekend notifications</span>
                    <Switch />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}