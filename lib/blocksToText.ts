// Helper: Convert Portable Text Blocks to Plain String
export function blocksToText(blocks: any[] = []) {
  return blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) return "";

      // --- Handle Lists ---
      let prefix = "";
      if (block.listItem === "bullet") {
        prefix = "• "; // Adds a bullet point for TTS pause/emphasis
      } else if (block.listItem === "number") {
        prefix = "1. "; // Adds a generic number (simplest approach for flat maps)
      }

      const content = block.children.map((child: any) => child.text).join("");

      return `${prefix}${content}`;
    })
    .join("\n\n");
}
