import { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );

export default function useBalanceRealtime(id: string, refetchBalance: () => void) {
  useEffect(() => {
    if (!id) return;

    const channel = supabase
      .channel('realtime-balance')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'income',
          filter: `user_id=eq.${id}`,
        },
        (payload) => {
          console.log('🟢 New income:', payload.new);
          refetchBalance();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'expenses',
          filter: `user_id=eq.${id}`,
        },
        (payload) => {
          console.log('🔴 New expense:', payload.new);
          refetchBalance();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id]);
}