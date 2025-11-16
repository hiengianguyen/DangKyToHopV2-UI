export default function formatDayRegistered(date) {
  if (date === undefined) return [];
  const [time, dates] = date.split(" ");
  const result = dates.split("/");

  return result;
}
