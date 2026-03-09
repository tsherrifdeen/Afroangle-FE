/**
 * Generates a clean, URL-safe slug from a string, limiting it to a specific number of words.
 * Safely handles French accents and special characters.
 * * @param input The original string (e.g., the article title)
 * @param maxWords The maximum number of words to include in the slug (default: 6)
 */
export function generateShortSlug(input: string, maxWords: number = 6): string {
  if (!input) return "";

  // 1. Split the title by spaces, grab the target number of words, and join them
  const truncatedInput = input.split(/\s+/).slice(0, maxWords).join(" ");

  // 2. Safely format the string for URLs
  return truncatedInput
    .normalize("NFD") // Splits accents from their letters (e.g., é -> e + ´)
    .replace(/[\u0300-\u036f]/g, "") // Removes the isolated accent marks
    .toLowerCase() // Converts everything to lowercase
    .replace(/[^a-z0-9 -]/g, "") // Removes special characters (commas, quotes, etc.)
    .replace(/\s+/g, "-") // Replaces spaces with hyphens
    .replace(/-+/g, "-") // Prevents double-hyphens
    .replace(/^-+|-+$/g, ""); // Trims hyphens from the very beginning or end
}
