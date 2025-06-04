export const getDateRange = (selectedMonth: string, year: number = 2025) => {
  if (selectedMonth === "0") {
    return {
      beginDate: `${year}-01-01`,
      endDate: `${year}-12-31`
    };
  }

  return {
    beginDate: `${year}-${selectedMonth}-01`,
    endDate: `${year}-${parseInt(selectedMonth) + 1}-01`
  };
};

/**
 * @param date 
 * @returns Date in ISO 8601 date part (YYYY-MM-DD)
 */
export const toISODate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toISOString().split('T')[0];
};