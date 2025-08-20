import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type PayrollWithEmployee = Database['public']['Tables']['payroll']['Row'] & {
  employees: {
    first_name: string;
    last_name: string;
    avatar_url: string | null;
  };
};

export const usePayroll = () => {
  return useQuery({
    queryKey: ['payroll'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payroll')
        .select(`
          *,
          employees (
            first_name,
            last_name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as PayrollWithEmployee[];
    },
  });
};