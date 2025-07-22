import { pasteClipboardAtPosition } from "./paste-utils";

export default async function main() {
  await pasteClipboardAtPosition(3, "4th");
} 