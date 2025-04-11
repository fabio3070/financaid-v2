// hooks/useBalance.ts
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { BalanceResult } from '@/types/balance';
import { fetchAndUpdateBalance } from '@/services/balanceService';

type BalanceQueryResult = BalanceResult | null;

export const useBalance = (userId: string | undefined): UseQueryResult<BalanceQueryResult, Error> => {
  return useQuery<BalanceQueryResult, Error>({
    queryKey: ['balance', userId],
    queryFn: async (): Promise<BalanceQueryResult> => {
        console.log(userId);
      if (!userId) return null;
      try {
        return await fetchAndUpdateBalance(userId);
      } catch (error) {
        console.error('Balance fetch error:', error);
        return null;
      }
    },
    enabled: !!userId,
  });
};