export function formatDate(
  dateTime: string | Date,
  locale: string = "en-US",
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

type TimeUnit = "s" | "m" | "h" | "d" | "w";

export function timeAgo(isoDate: string): string {
  const now = new Date().getTime();
  const then = new Date(isoDate).getTime();

  const diffInSeconds = Math.floor((now - then) / 1000);

  if (diffInSeconds < 0) return "0s";

  const units: { unit: TimeUnit; seconds: number }[] = [
    { unit: "w", seconds: 60 * 60 * 24 * 7 },
    { unit: "d", seconds: 60 * 60 * 24 },
    { unit: "h", seconds: 60 * 60 },
    { unit: "m", seconds: 60 },
    { unit: "s", seconds: 1 },
  ];

  for (const { unit, seconds } of units) {
    const value = Math.floor(diffInSeconds / seconds);
    if (value >= 1) {
      return `${value}${unit}`;
    }
  }
  return "0s";
}
