-- Create employees table
CREATE TABLE public.employees (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  department TEXT NOT NULL,
  role TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Active',
  join_date DATE NOT NULL DEFAULT CURRENT_DATE,
  salary DECIMAL(10,2) NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create attendance table
CREATE TABLE public.attendance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  check_in_time TIME,
  check_out_time TIME,
  status TEXT NOT NULL DEFAULT 'Present',
  work_hours DECIMAL(4,2) DEFAULT 0,
  overtime_hours DECIMAL(4,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(employee_id, date)
);

-- Create documents table
CREATE TABLE public.documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
  document_name TEXT NOT NULL,
  document_type TEXT NOT NULL,
  file_size TEXT NOT NULL,
  uploaded_by TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Active',
  file_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create payroll table
CREATE TABLE public.payroll (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
  month TEXT NOT NULL,
  year INTEGER NOT NULL,
  basic_salary DECIMAL(10,2) NOT NULL,
  allowances DECIMAL(10,2) DEFAULT 0,
  overtime_pay DECIMAL(10,2) DEFAULT 0,
  bonus DECIMAL(10,2) DEFAULT 0,
  deductions DECIMAL(10,2) DEFAULT 0,
  tax DECIMAL(10,2) DEFAULT 0,
  net_salary DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending',
  processed_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(employee_id, month, year)
);

-- Create leave_requests table
CREATE TABLE public.leave_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
  leave_type TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  days_requested INTEGER NOT NULL,
  reason TEXT,
  status TEXT NOT NULL DEFAULT 'Pending',
  approved_by UUID REFERENCES public.employees(id),
  applied_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payroll ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leave_requests ENABLE ROW LEVEL SECURITY;

-- Create policies (for now, allow all authenticated users to access all data)
CREATE POLICY "Allow all access to employees" ON public.employees FOR ALL USING (true);
CREATE POLICY "Allow all access to attendance" ON public.attendance FOR ALL USING (true);
CREATE POLICY "Allow all access to documents" ON public.documents FOR ALL USING (true);
CREATE POLICY "Allow all access to payroll" ON public.payroll FOR ALL USING (true);
CREATE POLICY "Allow all access to leave_requests" ON public.leave_requests FOR ALL USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_employees_updated_at
  BEFORE UPDATE ON public.employees
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_attendance_updated_at
  BEFORE UPDATE ON public.attendance
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_documents_updated_at
  BEFORE UPDATE ON public.documents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_payroll_updated_at
  BEFORE UPDATE ON public.payroll
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_leave_requests_updated_at
  BEFORE UPDATE ON public.leave_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample employees
INSERT INTO public.employees (first_name, last_name, email, department, role, status, join_date, salary) VALUES
('John', 'Doe', 'john.doe@company.com', 'Engineering', 'Senior Developer', 'Active', '2023-01-15', 75000.00),
('Jane', 'Smith', 'jane.smith@company.com', 'Marketing', 'Marketing Manager', 'Active', '2023-02-01', 65000.00),
('Mike', 'Johnson', 'mike.johnson@company.com', 'Sales', 'Sales Executive', 'Active', '2023-03-10', 55000.00),
('Sarah', 'Williams', 'sarah.williams@company.com', 'HR', 'HR Specialist', 'Active', '2023-01-20', 60000.00),
('David', 'Brown', 'david.brown@company.com', 'Engineering', 'Frontend Developer', 'Active', '2023-04-05', 70000.00),
('Lisa', 'Davis', 'lisa.davis@company.com', 'Finance', 'Financial Analyst', 'Active', '2023-02-15', 58000.00),
('Tom', 'Wilson', 'tom.wilson@company.com', 'Operations', 'Operations Manager', 'On Leave', '2022-11-01', 72000.00),
('Emily', 'Taylor', 'emily.taylor@company.com', 'Marketing', 'Content Specialist', 'Active', '2023-05-01', 52000.00);

-- Insert sample attendance records
INSERT INTO public.attendance (employee_id, date, check_in_time, check_out_time, status, work_hours, overtime_hours)
SELECT 
  e.id,
  CURRENT_DATE - INTERVAL '1 day',
  '09:00:00',
  '17:30:00',
  'Present',
  8.5,
  0.5
FROM public.employees e WHERE e.status = 'Active'
LIMIT 6;

INSERT INTO public.attendance (employee_id, date, check_in_time, check_out_time, status, work_hours, overtime_hours)
SELECT 
  e.id,
  CURRENT_DATE - INTERVAL '1 day',
  '09:15:00',
  '17:00:00',
  'Late',
  7.75,
  0
FROM public.employees e WHERE e.email = 'emily.taylor@company.com';

INSERT INTO public.attendance (employee_id, date, check_in_time, check_out_time, status, work_hours, overtime_hours)
SELECT 
  e.id,
  CURRENT_DATE - INTERVAL '1 day',
  NULL,
  NULL,
  'Absent',
  0,
  0
FROM public.employees e WHERE e.status = 'On Leave';

-- Insert sample documents
INSERT INTO public.documents (employee_id, document_name, document_type, file_size, uploaded_by, status)
SELECT 
  e.id,
  'Employment Contract - ' || e.first_name || ' ' || e.last_name,
  'Contract',
  '2.4 MB',
  'HR Department',
  'Active'
FROM public.employees e;

INSERT INTO public.documents (employee_id, document_name, document_type, file_size, uploaded_by, status)
SELECT 
  e.id,
  'Driver License - ' || e.first_name || ' ' || e.last_name,
  'Identity Document',
  '1.2 MB',
  e.first_name || ' ' || e.last_name,
  'Active'
FROM public.employees e LIMIT 5;

-- Insert sample payroll records
INSERT INTO public.payroll (employee_id, month, year, basic_salary, allowances, overtime_pay, bonus, deductions, tax, net_salary, status, processed_date)
SELECT 
  e.id,
  'December',
  2024,
  e.salary,
  e.salary * 0.1,
  500.00,
  1000.00,
  200.00,
  e.salary * 0.15,
  e.salary + (e.salary * 0.1) + 500.00 + 1000.00 - 200.00 - (e.salary * 0.15),
  'Processed',
  CURRENT_DATE - INTERVAL '5 days'
FROM public.employees e WHERE e.status = 'Active';

-- Insert sample leave requests
INSERT INTO public.leave_requests (employee_id, leave_type, start_date, end_date, days_requested, reason, status)
SELECT 
  e.id,
  'Annual Leave',
  CURRENT_DATE + INTERVAL '10 days',
  CURRENT_DATE + INTERVAL '15 days',
  5,
  'Family vacation',
  'Pending'
FROM public.employees e WHERE e.email = 'john.doe@company.com';

INSERT INTO public.leave_requests (employee_id, leave_type, start_date, end_date, days_requested, reason, status)
SELECT 
  e.id,
  'Sick Leave',
  CURRENT_DATE - INTERVAL '3 days',
  CURRENT_DATE - INTERVAL '1 day',
  2,
  'Medical appointment',
  'Approved'
FROM public.employees e WHERE e.email = 'sarah.williams@company.com';

INSERT INTO public.leave_requests (employee_id, leave_type, start_date, end_date, days_requested, reason, status)
SELECT 
  e.id,
  'Personal Leave',
  CURRENT_DATE + INTERVAL '20 days',
  CURRENT_DATE + INTERVAL '22 days',
  2,
  'Personal matters',
  'Rejected'
FROM public.employees e WHERE e.email = 'mike.johnson@company.com';