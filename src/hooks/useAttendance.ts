import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type AttendanceWithEmployee = Database['public']['Tables']['attendance']['Row'] & {
  employees: {
    first_name: string;
    last_name: string;
    avatar_url: string | null;
  };
};

export const useAttendance = () => {
  return useQuery({
    queryKey: ['attendance'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('attendance')
        .select(`
          *,
          employees (
            first_name,
            last_name,
            avatar_url
          )
        `)
        .order('date', { ascending: false });
      
      if (error) throw error;
      return data as AttendanceWithEmployee[];
    },
  });
};