import { useState } from "react"
import { FileText, Upload, Download, Search, Filter, Eye, Trash2, Plus, Folder } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
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

export default function Documents() {
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const handleDownloadDocument = (fileName: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${fileName}...`,
    })
  }
  const [showUploadDialog, setShowUploadDialog] = useState(false)

  const documents = [
    {
      id: 1,
      name: "Employment Contract - Sarah Johnson",
      type: "Contract",
      employeeName: "Sarah Johnson",
      uploadedBy: "HR Admin",
      uploadDate: "2024-01-15",
      size: "2.4 MB",
      status: "Active"
    },
    {
      id: 2,
      name: "ID Verification - Mike Chen",
      type: "Identity",
      employeeName: "Mike Chen",
      uploadedBy: "HR Admin",
      uploadDate: "2024-01-12",
      size: "1.2 MB",
      status: "Active"
    },
    {
      id: 3,
      name: "Performance Review Q4 2023",
      type: "Review",
      employeeName: "Alex Rodriguez",
      uploadedBy: "Team Lead",
      uploadDate: "2024-01-10",
      size: "875 KB",
      status: "Active"
    },
    {
      id: 4,
      name: "Medical Certificate",
      type: "Medical",
      employeeName: "Emily Davis",
      uploadedBy: "Emily Davis",
      uploadDate: "2024-01-08",
      size: "3.1 MB",
      status: "Pending Review"
    },
    {
      id: 5,
      name: "Training Certificate - AWS",
      type: "Certificate",
      employeeName: "David Wilson",
      uploadedBy: "David Wilson",
      uploadDate: "2024-01-05",
      size: "1.8 MB",
      status: "Approved"
    }
  ]

  const documentTypes = [
    { name: "Contracts", count: 45, icon: FileText },
    { name: "Identity Documents", count: 247, icon: FileText },
    { name: "Certificates", count: 89, icon: FileText },
    { name: "Performance Reviews", count: 156, icon: FileText }
  ]

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "default"
      case "Approved": return "default"
      case "Pending Review": return "secondary"
      case "Rejected": return "destructive"
      case "Expired": return "outline"
      default: return "outline"
    }
  }

  const getFileIcon = (type: string) => {
    return <FileText className="h-4 w-4 text-primary" />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Document Management</h1>
          <p className="text-muted-foreground">
            Manage and organize employee documents and files
          </p>
        </div>
        <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Upload className="h-4 w-4" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Upload Document</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Document Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contract">Employment Contract</SelectItem>
                    <SelectItem value="identity">Identity Document</SelectItem>
                    <SelectItem value="certificate">Certificate</SelectItem>
                    <SelectItem value="review">Performance Review</SelectItem>
                    <SelectItem value="medical">Medical Document</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Employee</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sarah">Sarah Johnson</SelectItem>
                    <SelectItem value="mike">Mike Chen</SelectItem>
                    <SelectItem value="alex">Alex Rodriguez</SelectItem>
                    <SelectItem value="emily">Emily Davis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Document Name</label>
                <Input placeholder="Enter document name" />
              </div>
              <div>
                <label className="text-sm font-medium">File</label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click to browse or drag and drop files here
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Supports PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                  </p>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={() => setShowUploadDialog(false)}>Upload</Button>
                <Button variant="outline" onClick={() => setShowUploadDialog(false)}>Cancel</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Document Type Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {documentTypes.map((type, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <type.icon className="h-4 w-4 text-primary" />
                <div className="text-2xl font-bold text-foreground">{type.count}</div>
              </div>
              <p className="text-xs text-muted-foreground">{type.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select defaultValue="all-types">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Document Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-types">All Types</SelectItem>
                <SelectItem value="contract">Contracts</SelectItem>
                <SelectItem value="identity">Identity</SelectItem>
                <SelectItem value="certificate">Certificates</SelectItem>
                <SelectItem value="review">Reviews</SelectItem>
                <SelectItem value="medical">Medical</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-status">
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-status">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Uploaded By</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {getFileIcon(doc.type)}
                        <span className="font-medium">{doc.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            {getInitials(doc.employeeName)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{doc.employeeName}</span>
                      </div>
                    </TableCell>
                    <TableCell>{doc.type}</TableCell>
                    <TableCell>{doc.uploadedBy}</TableCell>
                    <TableCell>{doc.uploadDate}</TableCell>
                    <TableCell>{doc.size}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(doc.status)}>
                        {doc.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" className="h-8 px-2">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 px-2" onClick={() => handleDownloadDocument(doc.name)}>
                          <Download className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 px-2 text-destructive">
                          <Trash2 className="h-3 w-3" />
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
  )
}