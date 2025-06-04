import { PaymentStatus, isPaymentStatus } from '@/types/transactions';

export function getPaymentStatusText(status: number): string {
  return isPaymentStatus(status)
    ? PaymentStatus[status] 
    : "N/A";
}