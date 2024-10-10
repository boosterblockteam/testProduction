import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';

export function getTimeDifference(date1: Date, date2: Date) {
  const totalSeconds = differenceInSeconds(date2, date1);
  const totalMinutes = differenceInMinutes(date2, date1);
  const totalHours = differenceInHours(date2, date1);
  const totalDays = differenceInDays(date2, date1);

  const days = totalDays;
  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}