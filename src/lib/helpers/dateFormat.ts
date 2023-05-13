// 2023-04-01T00:00:00 to only day number (1)
export const dateFormat = (date: string): string => {
  return date.slice(8, 10);
};
