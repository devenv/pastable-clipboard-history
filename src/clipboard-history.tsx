import { 
  Clipboard, 
  showHUD, 
  showToast, 
  Toast, 
  ActionPanel, 
  Action, 
  List, 
  Icon,
  Color
} from "@raycast/api";
import { useState, useEffect } from "react";

interface ClipboardItem {
  content: string;
  index: number;
  timestamp: Date;
}

export default function ClipboardHistoryViewer() {
  const [clipboardItems, setClipboardItems] = useState<ClipboardItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadClipboardHistory();
  }, []);

  async function loadClipboardHistory() {
    try {
      const items: ClipboardItem[] = [];
      
      // Load up to 6 items from clipboard history (Raycast limit)
      for (let i = 0; i < 6; i++) {
        try {
          const content = await Clipboard.readText({ offset: i });
          if (content && content.trim()) {
            items.push({
              content: content.trim(),
              index: i,
              timestamp: new Date()
            });
          }
        } catch {
          // Stop when no more items available
          break;
        }
      }
      
      setClipboardItems(items);
    } catch (error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Error",
        message: "Failed to load clipboard history"
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function pasteItem(item: ClipboardItem) {
    try {
      await Clipboard.paste(item.content);
      const itemDescription = item.index === 0 ? "current" : 
                            item.index === 1 ? "second last" : 
                            `${item.index + 1} items back`;
      await showHUD(`Pasted ${itemDescription} clipboard item`);
    } catch (error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Paste Failed",
        message: "Could not paste the selected item"
      });
    }
  }

  function getItemIcon(item: ClipboardItem) {
    if (item.index === 0) return Icon.Clipboard;
    if (item.index === 1) return { source: Icon.Star, tintColor: Color.Yellow };
    return Icon.Document;
  }

  function getItemTitle(content: string) {
    const maxLength = 60;
    return content.length > maxLength ? content.substring(0, maxLength) + "..." : content;
  }

  function getItemSubtitle(item: ClipboardItem) {
    const position = item.index === 0 ? "Current" : 
                    item.index === 1 ? "Second Last" : 
                    `${item.index + 1} items back`;
    const charCount = `${item.content.length} chars`;
    return `${position} • ${charCount}`;
  }

  function getItemAccessory(item: ClipboardItem) {
    if (item.index === 1) {
      return { text: "⭐", tooltip: "Second Last Item (Target)" };
    }
    return { text: `${item.index + 1}`, tooltip: `Position ${item.index + 1}` };
  }

  return (
    <List 
      isLoading={isLoading} 
      searchBarPlaceholder="Search clipboard history..."
      navigationTitle="Clipboard History"
    >
      {clipboardItems.length === 0 && !isLoading ? (
        <List.EmptyView
          icon={Icon.Clipboard}
          title="No Clipboard History"
          description="Copy some text to populate your clipboard history"
        />
      ) : (
        clipboardItems.map((item, index) => (
          <List.Item
            key={`${item.index}-${item.content.substring(0, 20)}-${index}`}
            icon={getItemIcon(item)}
            title={getItemTitle(item.content)}
            subtitle={getItemSubtitle(item)}
            accessories={[getItemAccessory(item)]}
            actions={
              <ActionPanel>
                <Action
                  title="Paste Item"
                  icon={Icon.Clipboard}
                  onAction={() => pasteItem(item)}
                />
                <Action.CopyToClipboard
                  title="Copy to System Clipboard"
                  content={item.content}
                  shortcut={{ modifiers: ["cmd"], key: "c" }}
                />
                <ActionPanel.Section title="Refresh">
                  <Action
                    title="Refresh History"
                    icon={Icon.ArrowClockwise}
                    onAction={loadClipboardHistory}
                    shortcut={{ modifiers: ["cmd"], key: "r" }}
                  />
                </ActionPanel.Section>
              </ActionPanel>
            }
          />
        ))
      )}
    </List>
  );
} 