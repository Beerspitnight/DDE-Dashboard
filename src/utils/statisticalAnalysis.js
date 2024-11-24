export const calculateMean = (data) => {
  if (!data || data.length === 0) return 0;
  return data.reduce((sum, value) => sum + value, 0) / data.length;
};
