export function TimeValidator(start: string, end: string) {
  const startHour = parseInt(start.split(":")[0]);
  const startMinute = parseInt(start.split(":")[1]);
  const endHour = parseInt(end.split(":")[0]);
  const endMinute = parseInt(end.split(":")[1]);

  if (startHour > endHour) return false;
  if (startHour === endHour && startMinute > endMinute) return false;
  return true;
}
