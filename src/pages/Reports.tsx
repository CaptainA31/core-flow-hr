import { useState } from "react"
import { BarChart3, Download, Filter, Calendar, Users, DollarSign, Clock, TrendingUp, PieChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { exportDepartmentAnalytics, downloadReportTemplate } from "@/lib/pdf-export"

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")
  const [selectedYear, setSelectedYear] = useState("2024")
  const { toast } = useToast()

  const handleExportAll = () => {
    exportDepartmentAnalytics(departmentData)
    toast({
      title: "Export Complete",
      description: "All reports have been exported successfully.",
    })
  }

  const handleExportReport = (reportType: string) => {
    toast({
      title: "Export Started",
      description: `Exporting ${reportType} report...`,
    })
    // Simulate export process
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: `${reportType} report has been downloaded.`,
      })
    }, 1000)
  }

  const handleViewDetails = (reportType: string) => {
    toast({
      title: "View Details",
      description: `Opening detailed view for ${reportType}...`,
    })
  }

  const handleDownloadTemplate = () => {
    downloadReportTemplate("Custom Report")
    toast({
      title: "Template Downloaded",
      description: "Report template has been downloaded successfully.",
    })
  }

  const reportTypes = [
    {
      title: "Attendance Report",
      description: "Employee attendance overview and trends",
      icon: Clock,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      data: "94% Average attendance rate"
    },
    {
      title: "Leave Analysis",
      description: "Leave requests and balance utilization",
      icon: Calendar,
      color: "text-green-500",
      bgColor: "bg-green-50",
      data: "156 Total leave days taken"
    },
    {
      title: "Payroll Summary",
      description: "Salary disbursement and cost analysis",
      icon: DollarSign,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      data: "$1.2M Total payroll cost"
    },
    {
      title: "Employee Analytics",
      description: "Workforce demographics and statistics",
      icon: Users,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      data: "247 Total employees"
    }
  ]

  const quickStats = [
    { label: "Total Employees", value: "247", change: "+12 this month", trend: "up" },
    { label: "Average Salary", value: "$85K", change: "+5% vs last year", trend: "up" },
    { label: "Attendance Rate", value: "94%", change: "-2% vs last month", trend: "down" },
    { label: "Leave Utilization", value: "68%", change: "+8% vs last year", trend: "up" }
  ]

  const departmentData = [
    { name: "Engineering", employees: 89, avgSalary: 95000, attendance: 96 },
    { name: "Marketing", employees: 45, avgSalary: 68000, attendance: 92 },
    { name: "Sales", employees: 67, avgSalary: 72000, attendance: 89 },
    { name: "HR", employees: 23, avgSalary: 65000, attendance: 97 },
    { name: "Finance", employees: 34, avgSalary: 78000, attendance: 95 }
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive insights and analytics for your organization
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2" onClick={handleExportAll}>
            <Download className="h-4 w-4" />
            Export All
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className={`text-xs ${stat.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                    {stat.change}
                  </p>
                </div>
                <TrendingUp className={`h-4 w-4 ${stat.trend === 'up' ? 'text-success' : 'text-destructive'}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Types */}
      <div className="grid gap-6 md:grid-cols-2">
        {reportTypes.map((report, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${report.bgColor}`}>
                    <report.icon className={`h-5 w-5 ${report.color}`} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2" onClick={() => handleExportReport(report.title)}>
                  <Download className="h-3 w-3" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{report.data}</span>
                <Button variant="ghost" size="sm" className="gap-2" onClick={() => handleViewDetails(report.title)}>
                  <BarChart3 className="h-3 w-3" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Department Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            Department Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium">Department</th>
                  <th className="text-left py-3 px-4 font-medium">Employees</th>
                  <th className="text-left py-3 px-4 font-medium">Avg Salary</th>
                  <th className="text-left py-3 px-4 font-medium">Attendance Rate</th>
                  <th className="text-left py-3 px-4 font-medium">Performance</th>
                </tr>
              </thead>
              <tbody>
                {departmentData.map((dept, index) => (
                  <tr key={index} className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium">{dept.name}</td>
                    <td className="py-3 px-4">{dept.employees}</td>
                    <td className="py-3 px-4">{formatCurrency(dept.avgSalary)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-secondary rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${dept.attendance}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{dept.attendance}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm" className="h-8 gap-1" onClick={() => handleViewDetails(`${dept.name} Department`)}>
                          <BarChart3 className="h-3 w-3" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 gap-1" onClick={() => handleExportReport(`${dept.name} Department`)}>
                          <Download className="h-3 w-3" />
                          Export
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Custom Report Builder */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Report Builder</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-sm font-medium mb-2 block">Report Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="attendance">Attendance Report</SelectItem>
                  <SelectItem value="payroll">Payroll Report</SelectItem>
                  <SelectItem value="leave">Leave Report</SelectItem>
                  <SelectItem value="performance">Performance Report</SelectItem>
                  <SelectItem value="custom">Custom Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Date Range</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-7-days">Last 7 days</SelectItem>
                  <SelectItem value="last-30-days">Last 30 days</SelectItem>
                  <SelectItem value="last-3-months">Last 3 months</SelectItem>
                  <SelectItem value="last-6-months">Last 6 months</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Department</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2 mt-6">
            <Button className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Generate Report
            </Button>
            <Button variant="outline" className="gap-2" onClick={handleDownloadTemplate}>
              <Download className="h-4 w-4" />
              Download Template
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}