import {
  Clipboard,
  showHUD,
  showToast,
  Toast,
  ActionPanel,
  Action,
  List,
  Icon,
  Color,
  getPreferenceValues,
} from "@raycast/api";
import { useState, useEffect } from "react";

interface Preferences {
  maxPositions: string;
  previewLength: string;
  showTimestamps: boolean;
}

interface ClipboardItem {
  content: string;
  position: number;
  timestamp: Date;
  preview: string;
  characterCount: number;
}

export default function PasteFromPosition() {
  const [clipboardItems, setClipboardItems] = useState<ClipboardItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const preferences = getPreferenceValues<Preferences>();

  const maxPositions = parseInt(preferences.maxPositions);
  const previewLength = parseInt(preferences.previewLength);

  useEffect(() => {
    loadClipboardHistory();
  }, [maxPositions]);

  async function loadClipboardHistory() {
    setIsLoading(true);
    try {
      const items: ClipboardItem[] = [];

      // Load clipboard items starting from position 1 (2nd item) up to maxPositions
      for (let i = 1; i <= maxPositions; i++) {
        try {
          const content = await Clipboard.readText({ offset: i });
          if (content && content.trim()) {
            const trimmedContent = content.trim();
            items.push({
              content: trimmedContent,
              position: i + 1, // Display position (2nd, 3rd, etc.)
              timestamp: new Date(Date.now() - i * 60000), // Approximate timestamps
              preview: truncateText(trimmedContent, previewLength),
              characterCount: trimmedContent.length,
            });
          }
        } catch {
          // Stop when no more items available or error occurs
          break;
        }
      }

      setClipboardItems(items);
    } catch (error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Error",
        message: "Failed to load clipboard history",
      });
      console.error("Clipboard loading error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function pasteItem(item: ClipboardItem) {
    try {
      await Clipboard.paste(item.content);
      const positionName = getPositionName(item.position);
      await showHUD(`Pasted ${positionName}: ${truncateText(item.content, 50)}`);
    } catch (error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Paste Failed",
        message: `Could not paste the ${getPositionName(item.position).toLowerCase()} item`,
      });
      console.error("Paste error:", error);
    }
  }

  function getPositionName(position: number): string {
    const suffixes = ["th", "st", "nd", "rd"];
    const lastDigit = position % 10;
    const lastTwoDigits = position % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
      return `${position}th`;
    }

    return `${position}${suffixes[lastDigit] || suffixes[0]}`;
  }

  function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "…";
  }

  function getItemIcon(item: ClipboardItem): any {
    if (item.position === 2) {
      return { source: Icon.Star, tintColor: Color.Yellow };
    }
    if (item.position <= 4) {
      return { source: Icon.Clipboard, tintColor: Color.Blue };
    }
    return Icon.Document;
  }

  function getTimeAgo(timestamp: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  }

  function getAccessories(item: ClipboardItem) {
    const accessories = [];

    // Position indicator
    accessories.push({
      text: getPositionName(item.position),
      tooltip: `Clipboard position ${item.position}`,
    });

    // Character count
    accessories.push({
      text: `${item.characterCount} chars`,
      tooltip: `${item.characterCount} characters`,
    });

    // Timestamp if enabled
    if (preferences.showTimestamps) {
      accessories.push({
        text: getTimeAgo(item.timestamp),
        tooltip: `Copied ${item.timestamp.toLocaleString()}`,
      });
    }

    return accessories;
  }

  const emptyStateTitle = `No Clipboard History (${maxPositions} positions)`;
  const emptyStateDescription = 
    "Copy some text to populate your clipboard history. " +
    `Showing positions 2nd-${getPositionName(maxPositions + 1)}.`;

  return (
    <List
      isLoading={isLoading}
      searchBarPlaceholder={`Search clipboard history (${maxPositions} positions)...`}
      navigationTitle="Pastable Clipboard History"
      actions={
        <ActionPanel>
          <Action
            title="Refresh Clipboard History"
            icon={Icon.ArrowClockwise}
            onAction={loadClipboardHistory}
            shortcut={{ modifiers: ["cmd"], key: "r" }}
          />
        </ActionPanel>
      }
    >
      {clipboardItems.length === 0 && !isLoading ? (
        <List.EmptyView
          icon={Icon.Clipboard}
          title={emptyStateTitle}
          description={emptyStateDescription}
          actions={
            <ActionPanel>
              <Action
                title="Refresh Clipboard History"
                icon={Icon.ArrowClockwise}
                onAction={loadClipboardHistory}
              />
            </ActionPanel>
          }
        />
      ) : (
        clipboardItems.map((item, index) => (
          <List.Item
            key={`${item.position}-${item.content.substring(0, 20)}-${index}`}
            icon={getItemIcon(item)}
            title={item.preview}
            subtitle={`${getPositionName(item.position)} clipboard item`}
            accessories={getAccessories(item)}
            actions={
              <ActionPanel>
                <Action
                  title={`Paste ${getPositionName(item.position)} Item`}
                  icon={Icon.Clipboard}
                  onAction={() => pasteItem(item)}
                />
                <Action.CopyToClipboard
                  title="Copy to Current Clipboard"
                  content={item.content}
                  shortcut={{ modifiers: ["cmd"], key: "c" }}
                />
                <Action
                  title="Show Full Content"
                  icon={Icon.Eye}
                  onAction={() =>
                    showToast({
                      style: Toast.Style.Success,
                      title: `${getPositionName(item.position)} Clipboard Item`,
                      message: truncateText(item.content, 200),
                    })
                  }
                  shortcut={{ modifiers: ["cmd"], key: "e" }}
                />
                <ActionPanel.Section title="Clipboard">
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