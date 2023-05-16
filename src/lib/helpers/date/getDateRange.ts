import { formatDateToFull } from './dateFormatToFull';

export const getDateRange = (days: number): string[] => {
  const today: Date = new Date();
  const begin: Date = new Date();
  begin.setDate(today.getDate() - days);

  const beginString: string = formatDateToFull(begin);
  const endString: string = formatDateToFull(today);

  return [beginString, endString];
};
