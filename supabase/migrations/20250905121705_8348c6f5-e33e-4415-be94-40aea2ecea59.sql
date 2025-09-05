-- Create storage bucket for employee avatars
INSERT INTO storage.buckets (id, name, public) VALUES ('employee-avatars', 'employee-avatars', true);

-- Create RLS policies for employee avatars bucket
CREATE POLICY "Employee avatars are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'employee-avatars');

CREATE POLICY "Allow insert of employee avatars"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'employee-avatars');

CREATE POLICY "Allow update of employee avatars"
ON storage.objects FOR UPDATE
USING (bucket_id = 'employee-avatars');

CREATE POLICY "Allow delete of employee avatars"
ON storage.objects FOR DELETE
USING (bucket_id = 'employee-avatars');