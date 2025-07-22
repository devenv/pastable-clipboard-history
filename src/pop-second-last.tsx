import { popClipboardAtPosition } from "./paste-utils";

export default async function Command() {
  await popClipboardAtPosition(1, "second last");
} 