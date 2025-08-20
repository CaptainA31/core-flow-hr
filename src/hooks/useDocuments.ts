import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type DocumentWithEmployee = Database['public']['Tables']['documents']['Row'] & {
  employees: {
    first_name: string;
    last_name: string;
    avatar_url: string | null;
  };
};

export const useDocuments = () => {
  return useQuery({
    queryKey: ['documents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('documents')
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
      return data as DocumentWithEmployee[];
    },
  });
};