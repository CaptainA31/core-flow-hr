import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type LeaveRequestWithEmployee = Database['public']['Tables']['leave_requests']['Row'] & {
  employees: {
    first_name: string;
    last_name: string;
    avatar_url: string | null;
  };
};

export const useLeaveRequests = () => {
  return useQuery({
    queryKey: ['leave_requests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leave_requests')
        .select(`
          *,
          employees!inner (
            first_name,
            last_name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};