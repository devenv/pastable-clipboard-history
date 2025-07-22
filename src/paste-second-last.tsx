import { Clipboard, showHUD, showToast, Toast } from "@raycast/api";

export default async function main() {
  try {
    // Access second last clipboard item using offset 1
    const secondLastContent = await Clipboard.readText({ offset: 1 });
    
    if (secondLastContent) {
      // Paste the content to the active application
      await Clipboard.paste(secondLastContent);
      
      // Show confirmation with content preview
      const displayText = secondLastContent.length > 50 
        ? secondLastContent.substring(0, 50) + "..." 
        : secondLastContent;
      
      await showHUD(`Pasted second last: ${displayText}`);
    } else {
      // Handle case where no second last item exists
      await showToast({
        style: Toast.Style.Failure,
        title: "No Second Last Item",
        message: "There is no second last item in clipboard history"
      });
    }
  } catch (error) {
    // Error handling for API failures
    await showToast({
      style: Toast.Style.Failure,
      title: "Error", 
      message: "Failed to retrieve second last clipboard item"
    });
    console.error("Clipboard error:", error);
  }
} 