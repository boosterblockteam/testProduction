import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';

export function getTimeDifference(dateFrom: Date, dateTo: Date) {
  const totalSeconds = differenceInSeconds(dateTo, dateFrom);
  const totalMinutes = differenceInMinutes(dateTo, dateFrom);
  const totalHours = differenceInHours(dateTo, dateFrom);
  const totalDays = differenceInDays(dateTo, dateFrom);

  const days = totalDays;
  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}