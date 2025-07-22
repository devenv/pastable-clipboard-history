import { Clipboard, showHUD, showToast, Toast } from "@raycast/api";

/**
 * Utility function to paste clipboard item at a specific position
 * @param offset - The clipboard position (0 = current, 1 = second last, etc.)
 * @param positionName - Human-readable position name for feedback
 */
export async function pasteClipboardAtPosition(offset: number, positionName: string): Promise<void> {
  try {
    // Access clipboard item at the specified offset
    const clipboardContent = await Clipboard.readText({ offset });

    if (clipboardContent) {
      // Paste the content to the active application
      await Clipboard.paste(clipboardContent);

      // Show confirmation with content preview
      const displayText =
        clipboardContent.length > 50
          ? clipboardContent.substring(0, 50) + "..."
          : clipboardContent;

      await showHUD(`Pasted ${positionName}: ${displayText}`);
    } else {
      // Handle case where no item exists at this position
      await showToast({
        style: Toast.Style.Failure,
        title: `No ${positionName} Item`,
        message: `There is no ${positionName.toLowerCase()} item in clipboard history`,
      });
    }
  } catch (error) {
    // Error handling for API failures
    await showToast({
      style: Toast.Style.Failure,
      title: "Paste Error",
      message: `Failed to retrieve ${positionName.toLowerCase()} clipboard item`,
    });
    console.error(`Clipboard error for ${positionName}:`, error);
  }
} 