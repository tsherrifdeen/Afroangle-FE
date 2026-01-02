/**
 * Converts a datetime input to "Month Day, Year" format
 * @param date - Can be a Date object, string, or number (timestamp)
 * @returns Formatted date string (e.g., "January 2, 2026")
 */
function formatToMonthDayYear(date: Date | string | number): string {
  const d = new Date(date);

  // Check if date is valid
  if (isNaN(d.getTime())) {
    throw new Error("Invalid date input");
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return d.toLocaleDateString("en-US", options);
}

export { formatToMonthDayYear };
