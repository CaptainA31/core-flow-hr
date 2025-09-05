-- Update existing employees with avatar URLs
UPDATE employees SET avatar_url = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' WHERE email = 'john.doe@company.com';
UPDATE employees SET avatar_url = 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face' WHERE email = 'jane.smith@company.com';
UPDATE employees SET avatar_url = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' WHERE email = 'mike.johnson@company.com';
UPDATE employees SET avatar_url = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' WHERE email = 'sarah.williams@company.com';
UPDATE employees SET avatar_url = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' WHERE email = 'david.brown@company.com';

-- Add more diverse employee data
INSERT INTO employees (first_name, last_name, email, department, role, salary, join_date, status, avatar_url) VALUES
('Emily', 'Davis', 'emily.davis@company.com', 'Engineering', 'Backend Developer', 72000, '2023-05-15', 'Active', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'),
('Robert', 'Wilson', 'robert.wilson@company.com', 'Finance', 'Financial Analyst', 68000, '2023-06-01', 'Active', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face'),
('Lisa', 'Anderson', 'lisa.anderson@company.com', 'Marketing', 'Content Specialist', 58000, '2023-07-10', 'On Leave', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face'),
('James', 'Taylor', 'james.taylor@company.com', 'Sales', 'Sales Manager', 75000, '2023-08-20', 'Active', 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face'),
('Anna', 'Martinez', 'anna.martinez@company.com', 'Design', 'UI/UX Designer', 65000, '2023-09-05', 'Active', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face'),
('Michael', 'Garcia', 'michael.garcia@company.com', 'Engineering', 'DevOps Engineer', 78000, '2023-10-12', 'Active', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face'),
('Jessica', 'Rodriguez', 'jessica.rodriguez@company.com', 'HR', 'Recruitment Specialist', 62000, '2023-11-01', 'Active', 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&h=150&fit=crop&crop=face'),
('Christopher', 'Lee', 'christopher.lee@company.com', 'Finance', 'Accountant', 58000, '2024-01-15', 'Active', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'),
('Amanda', 'White', 'amanda.white@company.com', 'Legal', 'Legal Counsel', 85000, '2024-02-01', 'Active', 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face'),
('Daniel', 'Thompson', 'daniel.thompson@company.com', 'Operations', 'Operations Manager', 72000, '2024-03-10', 'Inactive', 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=face')
ON CONFLICT (email) DO NOTHING;

-- Add corresponding attendance records
INSERT INTO attendance (employee_id, date, status, check_in_time, check_out_time, work_hours, overtime_hours) 
SELECT 
    e.id,
    CURRENT_DATE - (random() * 30)::int,
    CASE 
        WHEN random() > 0.9 THEN 'Absent'
        WHEN random() > 0.8 THEN 'Late'
        ELSE 'Present'
    END,
    '09:00:00'::time + (random() * interval '2 hours'),
    '17:00:00'::time + (random() * interval '3 hours'),
    8 + (random() * 2)::numeric,
    (random() * 3)::numeric
FROM employees e
WHERE e.email IN (
    'emily.davis@company.com', 'robert.wilson@company.com', 'lisa.anderson@company.com',
    'james.taylor@company.com', 'anna.martinez@company.com', 'michael.garcia@company.com',
    'jessica.rodriguez@company.com', 'christopher.lee@company.com', 'amanda.white@company.com',
    'daniel.thompson@company.com'
);

-- Add leave requests
INSERT INTO leave_requests (employee_id, leave_type, start_date, end_date, days_requested, reason, status, applied_date)
SELECT 
    e.id,
    CASE (random() * 4)::int
        WHEN 0 THEN 'Annual Leave'
        WHEN 1 THEN 'Sick Leave'
        WHEN 2 THEN 'Personal Leave'
        ELSE 'Emergency Leave'
    END,
    CURRENT_DATE + (random() * 60)::int,
    CURRENT_DATE + (random() * 60)::int + (random() * 10)::int,
    (random() * 10 + 1)::int,
    CASE (random() * 3)::int
        WHEN 0 THEN 'Family vacation'
        WHEN 1 THEN 'Medical appointment'
        ELSE 'Personal matters'
    END,
    CASE (random() * 3)::int
        WHEN 0 THEN 'Pending'
        WHEN 1 THEN 'Approved'
        ELSE 'Rejected'
    END,
    CURRENT_DATE - (random() * 10)::int
FROM employees e
LIMIT 15;

-- Add payroll records for November 2024 to avoid conflicts
INSERT INTO payroll (employee_id, month, year, basic_salary, allowances, bonus, overtime_pay, deductions, tax, net_salary, status, processed_date)
SELECT 
    e.id,
    'November',
    2024,
    e.salary,
    (e.salary * 0.1)::numeric,
    (e.salary * 0.05)::numeric,
    (random() * 500)::numeric,
    (e.salary * 0.08)::numeric,
    (e.salary * 0.15)::numeric,
    (e.salary + (e.salary * 0.1) + (e.salary * 0.05) + (random() * 500) - (e.salary * 0.08) - (e.salary * 0.15))::numeric,
    CASE (random() * 2)::int
        WHEN 0 THEN 'Processed'
        ELSE 'Pending'
    END,
    CASE 
        WHEN random() > 0.5 THEN CURRENT_DATE - (random() * 5)::int
        ELSE NULL
    END
FROM employees e
WHERE NOT EXISTS (
    SELECT 1 FROM payroll p 
    WHERE p.employee_id = e.id AND p.month = 'November' AND p.year = 2024
);

-- Add documents
INSERT INTO documents (employee_id, document_name, document_type, file_size, uploaded_by, status, file_url)
SELECT 
    e.id,
    CASE (random() * 4)::int
        WHEN 0 THEN e.first_name || '_Resume.pdf'
        WHEN 1 THEN e.first_name || '_Contract.pdf'
        WHEN 2 THEN e.first_name || '_ID_Copy.pdf'
        ELSE e.first_name || '_Certificates.pdf'
    END,
    CASE (random() * 4)::int
        WHEN 0 THEN 'Resume'
        WHEN 1 THEN 'Contract'
        WHEN 2 THEN 'Identification'
        ELSE 'Certification'
    END,
    CASE (random() * 3)::int
        WHEN 0 THEN '2.5 MB'
        WHEN 1 THEN '1.8 MB'
        ELSE '3.2 MB'
    END,
    'HR Department',
    'Active',
    '/documents/' || e.first_name || '_' || (random() * 1000)::int || '.pdf'
FROM employees e
ORDER BY random()
LIMIT 20;