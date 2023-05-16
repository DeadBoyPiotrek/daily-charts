// 2023-04-01T00:00:00 to only day and month  01-04
export const dateFormatToDays = (date: string): string => {
  const day: string = String(date.slice(8, 10)).padStart(2, '0');
  const month: string = String(date.slice(5, 7)).padStart(2, '0');

  return `${day}-${month}`;
};
