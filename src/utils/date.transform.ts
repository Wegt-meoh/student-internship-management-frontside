export function transformDate(date: string) {
  const dateClass = new Date(date);
  return dateClass.toLocaleDateString();
}
