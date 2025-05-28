// hooks/useBalance.ts
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { BalanceResult } from '@/types/balance';
import { fetchAndUpdateBalance } from '@/services/balanceService';

type BalanceQueryResult = BalanceResult;

export const useBalance = (userId: string | undefined, selectedMonth: string): UseQueryResult<BalanceQueryResult, Error> => {
  return useQuery<BalanceQueryResult, Error>({
    queryKey: ['balance', userId, selectedMonth],
    queryFn: async (): Promise<BalanceQueryResult> => {
      if (!userId) throw new Error('No userId provided');
      const result = await fetchAndUpdateBalance(userId, selectedMonth);
      if (!result) throw new Error('Failed to fetch balance');
      return result;
    },
    enabled: !!userId
  });
};