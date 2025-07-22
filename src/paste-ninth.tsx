import { pasteClipboardAtPosition } from "./paste-utils";

export default async function main() {
  await pasteClipboardAtPosition(8, "9th");
} 