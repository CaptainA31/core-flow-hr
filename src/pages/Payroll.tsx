import { useState } from "react"
import { DollarSign, Download, Plus, Search, Filter, Eye, FileText, Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
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

export default function Payroll() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMonth, setSelectedMonth] = useState("2024-01")

  const payrollData = [
    {
      id: 1,
      name: "Sarah Johnson",
      employeeId: "EMP001",
      basicSalary: 75000,
      allowances: 8000,
      deductions: 5000,
      netSalary: 78000,
      status: "Processed",
      payDate: "2024-01-31"
    },
    {
      id: 2,
      name: "Mike Chen",
      employeeId: "EMP002",
      basicSalary: 65000,
      allowances: 6500,
      deductions: 4200,
      netSalary: 67300,
      status: "Processed",
      payDate: "2024-01-31"
    },
    {
      id: 3,
      name: "Alex Rodriguez",
      employeeId: "EMP003",
      basicSalary: 55000,
      allowances: 5000,
      deductions: 3800,
      netSalary: 56200,
      status: "Pending",
      payDate: "-"
    },
    {
      id: 4,
      name: "Emily Davis",
      employeeId: "EMP004",
      basicSalary: 62000,
      allowances: 6000,
      deductions: 4100,
      netSalary: 63900,
      status: "Processed",
      payDate: "2024-01-31"
    }
  ]

  const salaryComponents = [
    { name: "Basic Salary", amount: 45000, type: "earning" },
    { name: "HRA", amount: 18000, type: "earning" },
    { name: "Transport Allowance", amount: 3000, type: "earning" },
    { name: "Medical Allowance", amount: 2000, type: "earning" },
    { name: "PF Contribution", amount: 5400, type: "deduction" },
    { name: "Professional Tax", amount: 200, type: "deduction" },
    { name: "Income Tax", amount: 8500, type: "deduction" }
  ]

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processed": return "default"
      case "Pending": return "secondary"
      case "Failed": return "destructive"
      default: return "outline"
    }
  }

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
          <h1 className="text-3xl font-bold text-foreground">Payroll Management</h1>
          <p className="text-muted-foreground">
            Manage employee salaries and payroll processing
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Payroll
          </Button>
          <Button className="gap-2">
            <Calculator className="h-4 w-4" />
            Process Payroll
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <div className="text-2xl font-bold text-foreground">$1.2M</div>
            </div>
            <p className="text-xs text-muted-foreground">Total Payroll</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Calculator className="h-4 w-4 text-success" />
              <div className="text-2xl font-bold text-success">235</div>
            </div>
            <p className="text-xs text-muted-foreground">Processed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-warning" />
              <div className="text-2xl font-bold text-warning">12</div>
            </div>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-secondary" />
              <div className="text-2xl font-bold text-secondary">$85K</div>
            </div>
            <p className="text-xs text-muted-foreground">Average Salary</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Payroll Table */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Payroll</CardTitle>
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
                <Input
                  type="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-auto"
                />
                <Select defaultValue="all">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="processed">Processed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Basic Salary</TableHead>
                      <TableHead>Allowances</TableHead>
                      <TableHead>Deductions</TableHead>
                      <TableHead>Net Salary</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payrollData.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                {getInitials(employee.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{employee.name}</div>
                              <div className="text-xs text-muted-foreground">{employee.employeeId}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{formatCurrency(employee.basicSalary)}</TableCell>
                        <TableCell className="text-success">{formatCurrency(employee.allowances)}</TableCell>
                        <TableCell className="text-destructive">{formatCurrency(employee.deductions)}</TableCell>
                        <TableCell className="font-medium">{formatCurrency(employee.netSalary)}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(employee.status)}>
                            {employee.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline" className="h-8 px-2">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 px-2">
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Salary Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Salary Components</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-success mb-2">Earnings</h4>
                {salaryComponents
                  .filter(component => component.type === 'earning')
                  .map((component, index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-border/50 last:border-0">
                      <span className="text-sm">{component.name}</span>
                      <span className="text-sm font-medium text-success">
                        {formatCurrency(component.amount)}
                      </span>
                    </div>
                  ))}
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-destructive mb-2">Deductions</h4>
                {salaryComponents
                  .filter(component => component.type === 'deduction')
                  .map((component, index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-border/50 last:border-0">
                      <span className="text-sm">{component.name}</span>
                      <span className="text-sm font-medium text-destructive">
                        -{formatCurrency(component.amount)}
                      </span>
                    </div>
                  ))}
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Net Salary</span>
                  <span className="text-lg font-bold text-primary">
                    {formatCurrency(
                      salaryComponents
                        .filter(c => c.type === 'earning')
                        .reduce((sum, c) => sum + c.amount, 0) -
                      salaryComponents
                        .filter(c => c.type === 'deduction')
                        .reduce((sum, c) => sum + c.amount, 0)
                    )}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}