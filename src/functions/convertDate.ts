import { millisecondsToMinutes } from 'date-fns'

export const timestampToDate = (timestamp: number) => {
  const totalMinutes = millisecondsToMinutes(timestamp);
  const hour = Math.floor(totalMinutes / 60);
  const minutes = Math.floor(totalMinutes % 60);

  return `${hour}h : ${minutes}min`
}