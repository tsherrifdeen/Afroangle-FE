// lib/portableTextToPlain.ts
import { toPlainText } from "@portabletext/toolkit";

export function getExcerpt(blocks: any[], length = 160): string {
  const plain = toPlainText(blocks as any);
  return plain.length > length ? plain.slice(0, length).trimEnd() + "…" : plain;
}
