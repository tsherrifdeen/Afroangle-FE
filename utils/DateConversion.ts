export function formatDate(
  dateTime: string | Date,
  locale: string = "en-US"
): string {
  const date = typeof dateTime === "string" ? new Date(dateTime) : dateTime;

  // if (isNaN(date.getTime())) {
  //   return "";
  // }

  return new Intl.DateTimeFormat(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
