'use client';

import { supabase } from '@/lib/supabaseClient';
import { useEffect } from 'react';

export default function useBalanceRealtime(userId: string, onBalanceUpdate: (balance: number) => void) {
    
    useEffect(() => {
        console.log(userId);
        if (!userId) return;

        const channel = supabase
            .channel('realtime-balance')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'income', filter: `user_id=eq.${userId}` },
                () => fetchAndUpdateBalance()
            )
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'expenses', filter: `user_id=eq.${userId}` },
                () => fetchAndUpdateBalance()
            )
            .subscribe();

        return () => {
        supabase.removeChannel(channel);
        };
        
    }, [userId, onBalanceUpdate]);
}
