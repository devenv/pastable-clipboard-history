import { Clipboard, showHUD, showToast, Toast } from "@raycast/api";

export async function pasteClipboardAtPosition(offset: number, positionName: string): Promise<void> {
  try {
    // Read clipboard content at the specified offset
    const content = await Clipboard.readText({ offset });

    if (!content || content.trim() === "") {
      await showToast({
        style: Toast.Style.Failure,
        title: "No Content",
        message: `No content found at ${positionName} clipboard position`,
      });
      return;
    }

    // Paste the content
    await Clipboard.paste(content);

    // Show confirmation HUD with preview
    const preview = content.length > 50 ? content.substring(0, 50) + "…" : content;
    await showHUD(`Pasted ${positionName}: ${preview}`);
  } catch (error) {
    await showToast({
      style: Toast.Style.Failure,
      title: "Paste Failed",
      message: `Could not paste the ${positionName.toLowerCase()} clipboard item`,
    });
    console.error(`Error pasting ${positionName} clipboard item:`, error);
  }
} 