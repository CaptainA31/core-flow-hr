import { ReactNode } from "react"
import { X, Eye } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface DetailViewModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  icon?: ReactNode
  data: Record<string, any>
  type?: "employee" | "attendance" | "payroll" | "leave" | "general"
}

export function DetailViewModal({ 
  isOpen, 
  onClose, 
  title, 
  icon, 
  data, 
  type = "general" 
}: DetailViewModalProps) {
  const formatValue = (key: string, value: any) => {
    if (value === null || value === undefined) return "N/A"
    
    // Format dates
    if (key.includes('date') || key.includes('time') || key.includes('created') || key.includes('updated')) {
      return new Date(value).toLocaleString()
    }
    
    // Format currency
    if (key.includes('salary') || key.includes('amount') || key.includes('cost')) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(value)
    }
    
    // Format percentages
    if (key.includes('rate') || key.includes('percentage')) {
      return `${value}%`
    }
    
    // Format boolean values
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No'
    }
    
    // Format arrays
    if (Array.isArray(value)) {
      return value.join(', ')
    }
    
    return value.toString()
  }

  const formatLabel = (key: string) => {
    return key
      .replace(/_/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim()
  }

  const getFieldsByType = () => {
    const excludeFields = ['id', 'created_at', 'updated_at']
    const allFields = Object.keys(data).filter(key => !excludeFields.includes(key))
    
    switch (type) {
      case "employee":
        return {
          primary: ['full_name', 'email', 'employee_id', 'position', 'department'],
          secondary: ['phone', 'hire_date', 'salary', 'status', 'manager_id']
        }
      case "attendance":
        return {
          primary: ['employee_id', 'date', 'check_in_time', 'check_out_time', 'status'],
          secondary: ['total_hours', 'break_duration', 'overtime_hours', 'notes']
        }
      case "payroll":
        return {
          primary: ['employee_id', 'pay_period', 'base_salary', 'total_pay', 'status'],
          secondary: ['overtime_pay', 'deductions', 'bonuses', 'tax_deductions']
        }
      case "leave":
        return {
          primary: ['employee_id', 'leave_type', 'start_date', 'end_date', 'status'],
          secondary: ['days_requested', 'reason', 'approved_by', 'comments']
        }
      default:
        const mid = Math.ceil(allFields.length / 2)
        return {
          primary: allFields.slice(0, mid),
          secondary: allFields.slice(mid)
        }
    }
  }

  const { primary, secondary } = getFieldsByType()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {icon && (
              <div className="p-2 rounded-lg bg-primary/10">
                {icon}
              </div>
            )}
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Primary Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Primary Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {primary.map((key) => (
                  <div key={key} className="space-y-1">
                    <label className="text-sm font-medium text-muted-foreground">
                      {formatLabel(key)}
                    </label>
                    <div className="text-sm">
                      {key === 'status' ? (
                        <Badge variant={data[key] === 'active' ? 'default' : 'secondary'}>
                          {data[key]}
                        </Badge>
                      ) : (
                        formatValue(key, data[key])
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Secondary Information */}
          {secondary.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Additional Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {secondary.map((key) => (
                    <div key={key} className="space-y-1">
                      <label className="text-sm font-medium text-muted-foreground">
                        {formatLabel(key)}
                      </label>
                      <div className="text-sm">
                        {formatValue(key, data[key])}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Record Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">
                    Record ID
                  </label>
                  <div className="text-sm font-mono">{data.id}</div>
                </div>
                {data.created_at && (
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-muted-foreground">
                      Created
                    </label>
                    <div className="text-sm">{formatValue('created_at', data.created_at)}</div>
                  </div>
                )}
                {data.updated_at && (
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-muted-foreground">
                      Last Updated
                    </label>
                    <div className="text-sm">{formatValue('updated_at', data.updated_at)}</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}