import { popClipboardAtPosition } from "../src/paste-utils";
import { Clipboard, showHUD, showToast } from "@raycast/api";

// Mock the Raycast API
jest.mock("@raycast/api");
const mockClipboard = Clipboard as jest.Mocked<typeof Clipboard>;
const mockShowHUD = showHUD as jest.MockedFunction<typeof showHUD>;
const mockShowToast = showToast as jest.MockedFunction<typeof showToast>;

describe("Pop Behavior Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should pop with single copy strategy (fixed behavior)", async () => {
    // Setup: Mock clipboard with test data
    const clipboardHistory = ["current", "first", "second", "third"];

    mockClipboard.readText.mockImplementation(({ offset = 0 } = {}) => {
      return Promise.resolve(clipboardHistory[offset] || null);
    });

    mockClipboard.paste.mockResolvedValue();
    mockClipboard.copy.mockResolvedValue();

    // Execute: Run pop operation
    await popClipboardAtPosition(0, "current");

    // Verify: Check the FIXED behavior

    // 1. Should paste the current item
    expect(mockClipboard.paste).toHaveBeenCalledWith("current");
    expect(mockClipboard.paste).toHaveBeenCalledTimes(1);

    // 2. Should only copy the next item (position 1) - FIXED!
    expect(mockClipboard.copy).toHaveBeenCalledTimes(1);
    expect(mockClipboard.copy).toHaveBeenCalledWith("first");

    // 3. Should show success message
    expect(mockShowHUD).toHaveBeenCalledWith("Popped current: current (moved to next)");
  });

  it("should demonstrate the fix: single copy prevents overwrites", async () => {
    // This test shows the fixed behavior with single copy

    const clipboardHistory = ["A", "B", "C", "D"];
    let currentClipboard = "A"; // Track what's actually in the clipboard

    mockClipboard.readText.mockImplementation(({ offset = 0 } = {}) => {
      // After copying, the new item becomes position 0
      if (offset === 0) return Promise.resolve(currentClipboard);
      return Promise.resolve(clipboardHistory[offset] || null);
    });

    mockClipboard.paste.mockResolvedValue();

    // Mock copy to update the current clipboard
    mockClipboard.copy.mockImplementation((content: string) => {
      currentClipboard = content;
      return Promise.resolve();
    });

    // Execute pop
    await popClipboardAtPosition(0, "current");

    // The fix: Only one copy, so the correct item becomes current
    // We WANT: clipboard should contain 'B' (item that was at position 1)
    // We GET: clipboard contains 'B' (FIXED! ✅)

    expect(currentClipboard).toBe("B"); // Fixed behavior!
    expect(mockClipboard.copy).toHaveBeenCalledTimes(1); // Only one copy
    expect(mockClipboard.copy).toHaveBeenCalledWith("B"); // Correct item
  });

  it("should handle empty next position gracefully", async () => {
    // Test edge case: no item at position 1

    const clipboardHistory = ["only-item"]; // Only one item in history

    mockClipboard.readText.mockImplementation(({ offset = 0 } = {}) => {
      return Promise.resolve(clipboardHistory[offset] || null);
    });

    mockClipboard.paste.mockResolvedValue();
    mockClipboard.copy.mockResolvedValue();

    // Execute pop
    await popClipboardAtPosition(0, "current");

    // Verify: Should paste but not copy anything (no position 1)
    expect(mockClipboard.paste).toHaveBeenCalledWith("only-item");
    expect(mockClipboard.copy).not.toHaveBeenCalled(); // No position 1 to copy
    expect(mockShowHUD).toHaveBeenCalledWith("Popped current: only-item (moved to next)");
  });
});
