import { useState } from "react"
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  Users, 
  X, 
  Download, 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from "recharts"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ReportDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  reportType: string
  reportData?: any
}

export function ReportDetailsModal({ isOpen, onClose, reportType, reportData }: ReportDetailsModalProps) {
  const [selectedTab, setSelectedTab] = useState("overview")

  const getReportContent = () => {
    switch (reportType) {
      case "Attendance Report":
        return {
          title: "Attendance Analytics",
          icon: Clock,
          color: "text-blue-500",
          bgColor: "bg-blue-50",
          overview: {
            stats: [
              { label: "Average Attendance", value: "94.2%", change: "+2.1%", trend: "up" },
              { label: "Total Present Days", value: "4,847", change: "+156", trend: "up" },
              { label: "Late Arrivals", value: "89", change: "-12", trend: "down" },
              { label: "Early Departures", value: "34", change: "-8", trend: "down" }
            ],
            chart: "Weekly attendance trend showing consistent performance with slight improvement",
            insights: [
              "Engineering team has the highest attendance rate at 96.4%",
              "Friday mornings show slightly higher late arrival rates",
              "Remote work days have 98.7% attendance rate",
              "Monthly attendance has improved by 2.1% compared to last quarter"
            ]
          },
          details: {
            departments: [
              { name: "Engineering", present: 86, total: 89, rate: 96.6 },
              { name: "Marketing", present: 41, total: 45, rate: 91.1 },
              { name: "Sales", present: 59, total: 67, rate: 88.1 },
              { name: "HR", present: 22, total: 23, rate: 95.7 },
              { name: "Finance", present: 33, total: 34, rate: 97.1 }
            ],
            trends: [
              { period: "This Week", attendance: 94.2, change: 1.2 },
              { period: "Last Week", attendance: 93.0, change: -0.5 },
              { period: "2 Weeks Ago", attendance: 93.5, change: 0.8 },
              { period: "3 Weeks Ago", attendance: 92.7, change: -1.1 }
            ]
          }
        }

      case "Leave Analysis":
        return {
          title: "Leave Management Analytics",
          icon: Calendar,
          color: "text-green-500",
          bgColor: "bg-green-50",
          overview: {
            stats: [
              { label: "Total Leave Days", value: "1,247", change: "+89", trend: "up" },
              { label: "Pending Requests", value: "23", change: "-5", trend: "down" },
              { label: "Approved Rate", value: "87.3%", change: "+4.2%", trend: "up" },
              { label: "Average Duration", value: "3.2 days", change: "-0.3", trend: "down" }
            ],
            chart: "Leave utilization patterns showing seasonal trends and department variations",
            insights: [
              "Sick leave requests decreased by 18% this quarter",
              "Vacation leave peaks in July and December",
              "Emergency leave accounts for 12% of all requests",
              "Engineering team has the lowest leave utilization at 58%"
            ]
          },
          details: {
            types: [
              { type: "Vacation", count: 542, percentage: 43.5, avgDuration: 4.2 },
              { type: "Sick Leave", count: 298, percentage: 23.9, avgDuration: 2.1 },
              { type: "Personal", count: 187, percentage: 15.0, avgDuration: 1.8 },
              { type: "Emergency", count: 145, percentage: 11.6, avgDuration: 1.5 },
              { type: "Maternity/Paternity", count: 75, percentage: 6.0, avgDuration: 45.0 }
            ],
            monthly: [
              { month: "Jan", requests: 89, approved: 78 },
              { month: "Feb", requests: 76, approved: 71 },
              { month: "Mar", requests: 102, approved: 89 },
              { month: "Apr", requests: 134, approved: 118 }
            ]
          }
        }

      case "Payroll Summary":
        return {
          title: "Payroll Analytics Dashboard",
          icon: DollarSign,
          color: "text-purple-500",
          bgColor: "bg-purple-50",
          overview: {
            stats: [
              { label: "Total Payroll", value: "$1.24M", change: "+5.2%", trend: "up" },
              { label: "Average Salary", value: "$85,200", change: "+2.8%", trend: "up" },
              { label: "Overtime Cost", value: "$127K", change: "-8.1%", trend: "down" },
              { label: "Benefits Cost", value: "$286K", change: "+3.4%", trend: "up" }
            ],
            chart: "Monthly payroll distribution and cost analysis across departments",
            insights: [
              "Engineering department accounts for 38% of total payroll",
              "Overtime costs reduced significantly due to better workforce planning",
              "Benefits utilization increased by 12% year-over-year",
              "Average salary growth of 2.8% aligns with industry standards"
            ]
          },
          details: {
            departments: [
              { name: "Engineering", employees: 89, totalCost: 471800, avgSalary: 95000 },
              { name: "Sales", employees: 67, totalCost: 298400, avgSalary: 72000 },
              { name: "Marketing", employees: 45, totalCost: 191200, avgSalary: 68000 },
              { name: "Finance", employees: 34, totalCost: 165200, avgSalary: 78000 },
              { name: "HR", employees: 23, totalCost: 112400, avgSalary: 65000 }
            ],
            breakdown: [
              { category: "Base Salary", amount: 1045000, percentage: 84.3 },
              { category: "Overtime", amount: 127000, percentage: 10.2 },
              { category: "Bonuses", amount: 45000, percentage: 3.6 },
              { category: "Allowances", amount: 23000, percentage: 1.9 }
            ]
          }
        }

      case "Employee Analytics":
        return {
          title: "Workforce Analytics Dashboard",
          icon: Users,
          color: "text-orange-500",
          bgColor: "bg-orange-50",
          overview: {
            stats: [
              { label: "Total Employees", value: "247", change: "+12", trend: "up" },
              { label: "New Hires", value: "18", change: "+6", trend: "up" },
              { label: "Retention Rate", value: "94.2%", change: "+1.8%", trend: "up" },
              { label: "Avg Tenure", value: "3.4 years", change: "+0.2", trend: "up" }
            ],
            chart: "Employee distribution and demographic analysis across departments",
            insights: [
              "Engineering continues to be the largest department with 36% of workforce",
              "Retention rate improved significantly with new wellness programs",
              "Remote work adoption at 68% of total workforce",
              "Gender distribution is 52% male, 48% female across all levels"
            ]
          },
          details: {
            demographics: [
              { category: "Age 22-30", count: 89, percentage: 36.0 },
              { category: "Age 31-40", count: 98, percentage: 39.7 },
              { category: "Age 41-50", count: 45, percentage: 18.2 },
              { category: "Age 51+", count: 15, percentage: 6.1 }
            ],
            performance: [
              { level: "Outstanding", count: 45, percentage: 18.2 },
              { level: "Excellent", count: 89, percentage: 36.0 },
              { level: "Good", count: 78, percentage: 31.6 },
              { level: "Needs Improvement", count: 35, percentage: 14.2 }
            ]
          }
        }

      default:
        // Department-specific reports
        if (reportType.includes("Department")) {
          const deptName = reportType.replace(" Department", "")
          return {
            title: `${deptName} Department Analytics`,
            icon: BarChart3,
            color: "text-indigo-500",
            bgColor: "bg-indigo-50",
            overview: {
              stats: [
                { label: "Department Size", value: "89", change: "+3", trend: "up" },
                { label: "Avg Performance", value: "87.4%", change: "+2.1%", trend: "up" },
                { label: "Retention Rate", value: "96.1%", change: "+1.2%", trend: "up" },
                { label: "Satisfaction Score", value: "4.6/5", change: "+0.2", trend: "up" }
              ],
              chart: `${deptName} department performance metrics and team analytics`,
              insights: [
                `${deptName} team exceeded quarterly targets by 12%`,
                "High collaboration score with cross-functional teams",
                "Strong mentorship program with 89% participation",
                "Leading department in innovation initiatives"
              ]
            },
            details: {
              roles: [
                { title: "Senior Developer", count: 23, avgSalary: 110000 },
                { title: "Mid-level Developer", count: 34, avgSalary: 85000 },
                { title: "Junior Developer", count: 19, avgSalary: 65000 },
                { title: "Team Lead", count: 8, avgSalary: 125000 },
                { title: "Architect", count: 5, avgSalary: 145000 }
              ],
              projects: [
                { name: "Platform Redesign", completion: 87, team: 12 },
                { name: "Mobile App", completion: 64, team: 8 },
                { name: "API Integration", completion: 92, team: 6 },
                { name: "Security Audit", completion: 78, team: 4 }
              ]
            }
          }
        }
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const getChartComponent = () => {
    const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))', 'hsl(var(--destructive))']
    
    switch (reportType) {
      case "Attendance Report":
        const attendanceData = content?.details?.trends || [
          { period: "This Week", attendance: 94.2, change: 1.2 },
          { period: "Last Week", attendance: 93.0, change: -0.5 },
          { period: "2 Weeks Ago", attendance: 93.5, change: 0.8 },
          { period: "3 Weeks Ago", attendance: 92.7, change: -1.1 }
        ]
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="attendance" stroke="hsl(var(--primary))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        )

      case "Leave Analysis":
        const leaveData = content?.details?.types?.map(type => ({
          name: type.type,
          value: type.count,
          percentage: type.percentage
        })) || []
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie 
                data={leaveData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percentage }) => `${name}: ${percentage}%`}
              >
                {leaveData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        )

      case "Payroll Summary":
        const payrollData = content?.details?.departments?.map(dept => ({
          name: dept.name,
          totalCost: dept.totalCost / 1000, // Convert to thousands
          avgSalary: dept.avgSalary / 1000
        })) || []
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={payrollData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}K`, ""]} />
              <Legend />
              <Bar dataKey="totalCost" fill="hsl(var(--primary))" name="Total Cost (K)" />
              <Bar dataKey="avgSalary" fill="hsl(var(--secondary))" name="Avg Salary (K)" />
            </BarChart>
          </ResponsiveContainer>
        )

      case "Employee Analytics":
        const employeeData = content?.details?.demographics?.map(demo => ({
          category: demo.category,
          count: demo.count,
          percentage: demo.percentage
        })) || []
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={employeeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="hsl(var(--primary))" name="Employee Count" />
            </BarChart>
          </ResponsiveContainer>
        )

      default:
        // Department reports
        const deptData = content?.details?.projects?.map(project => ({
          name: project.name,
          completion: project.completion,
          team: project.team
        })) || []
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={deptData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completion" fill="hsl(var(--primary))" name="Completion %" />
              <Bar dataKey="team" fill="hsl(var(--secondary))" name="Team Size" />
            </BarChart>
          </ResponsiveContainer>
        )
    }
  }

  const content = getReportContent()
  if (!content) return null

  const IconComponent = content.icon

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${content.bgColor}`}>
              <IconComponent className={`h-5 w-5 ${content.color}`} />
            </div>
            {content.title}
            <Button variant="outline" size="sm" className="ml-auto gap-2">
              <Download className="h-3 w-3" />
              Export
            </Button>
          </DialogTitle>
        </DialogHeader>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Detailed Data</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {content.overview.stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className={`text-xs flex items-center gap-1 ${
                          stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.trend === 'up' ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          {stat.change}
                        </p>
                      </div>
                      <Activity className={`h-8 w-8 ${content.color} opacity-20`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Chart Area */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Trend Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  {getChartComponent()}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-6 mt-6">
            {content.details && (
              <>
                {/* Department/Role breakdown */}
                {(content.details.departments || content.details.roles) && (
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {content.details.departments ? "Department Breakdown" : "Role Distribution"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {(content.details.departments || content.details.roles || []).map((item: any, index: number) => (
                          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium">{item.name || item.title}</h4>
                                <div className="flex gap-4 text-sm text-muted-foreground">
                                  {item.employees && <span>{item.employees} employees</span>}
                                  {item.count && <span>{item.count} members</span>}
                                  {item.avgSalary && <span>{formatCurrency(item.avgSalary)} avg</span>}
                                  {item.rate && <span>{item.rate}%</span>}
                                </div>
                              </div>
                              {item.rate && (
                                <Progress value={item.rate} className="h-2" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Additional data tables */}
                {content.details.types && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Leave Type Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2">Type</th>
                              <th className="text-left py-2">Count</th>
                              <th className="text-left py-2">Percentage</th>
                              <th className="text-left py-2">Avg Duration</th>
                            </tr>
                          </thead>
                          <tbody>
                            {content.details.types.map((type: any, index: number) => (
                              <tr key={index} className="border-b">
                                <td className="py-2 font-medium">{type.type}</td>
                                <td className="py-2">{type.count}</td>
                                <td className="py-2">{type.percentage}%</td>
                                <td className="py-2">{type.avgDuration} days</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {content.details.breakdown && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Cost Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {content.details.breakdown.map((item: any, index: number) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="font-medium">{item.category}</span>
                            <div className="flex items-center gap-3">
                              <span>{formatCurrency(item.amount)}</span>
                              <Badge variant="secondary">{item.percentage}%</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="insights" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Insights & Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {content.overview.insights.map((insight, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                      <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm">{insight}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actionable Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-4 border-l-4 border-green-500 bg-green-50 dark:bg-green-950">
                    <h4 className="font-medium text-green-800 dark:text-green-200">Positive Trend</h4>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Continue current strategies as metrics show improvement
                    </p>
                  </div>
                  <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
                    <h4 className="font-medium text-yellow-800 dark:text-yellow-200">Areas for Improvement</h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      Focus on underperforming segments for better overall results
                    </p>
                  </div>
                  <div className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950">
                    <h4 className="font-medium text-blue-800 dark:text-blue-200">Strategic Opportunities</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Leverage high-performing areas to drive organization-wide success
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}