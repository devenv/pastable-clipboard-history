import { popClipboardAtPosition } from "./paste-utils";

export default async function Command() {
  await popClipboardAtPosition(0, "current");
}
