export default function formatDayRegistered(date) {
  if (date === undefined) return [];
  const d = date.split(" ");
  const result = d[1].split("/");

  return result;
}
