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