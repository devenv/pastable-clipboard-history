import { pasteClipboardAtPosition } from '../src/paste-utils';
import { Clipboard, showHUD, showToast } from '@raycast/api';

// Mock the Raycast API
jest.mock('@raycast/api');
const mockClipboard = Clipboard as jest.Mocked<typeof Clipboard>;
const mockShowHUD = showHUD as jest.MockedFunction<typeof showHUD>;
const mockShowToast = showToast as jest.MockedFunction<typeof showToast>;

describe('Paste Commands Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Normal Operations', () => {
    it('should paste from each position correctly', async () => {
      const clipboardHistory = ['current', 'first', 'second', 'third', 'fourth', 'fifth'];
      
      mockClipboard.readText.mockImplementation(({ offset = 0 } = {}) => {
        return Promise.resolve(clipboardHistory[offset] || null);
      });
      mockClipboard.paste.mockResolvedValue();

      // Test each position
      for (let i = 0; i < 6; i++) {
        await pasteClipboardAtPosition(i, `position-${i}`);
        
        expect(mockClipboard.readText).toHaveBeenCalledWith({ offset: i });
        expect(mockClipboard.paste).toHaveBeenCalledWith(clipboardHistory[i]);
        expect(mockShowHUD).toHaveBeenCalledWith(`Pasted position-${i}: ${clipboardHistory[i]}`);
        
        jest.clearAllMocks();
      }
    });

    it('should handle long content with preview truncation', async () => {
      const longContent = 'A'.repeat(100);
      const expectedPreview = 'A'.repeat(50) + '…';
      
      mockClipboard.readText.mockResolvedValue(longContent);
      mockClipboard.paste.mockResolvedValue();

      await pasteClipboardAtPosition(0, 'current');

      expect(mockShowHUD).toHaveBeenCalledWith(`Pasted current: ${expectedPreview}`);
    });
  });

  describe('Repeating Content Scenarios', () => {
    it('should handle duplicate content in different positions', async () => {
      const clipboardHistory = ['duplicate', 'unique', 'duplicate', 'another', 'duplicate'];
      
      mockClipboard.readText.mockImplementation(({ offset = 0 } = {}) => {
        return Promise.resolve(clipboardHistory[offset] || null);
      });
      mockClipboard.paste.mockResolvedValue();

      // Test pasting from position 0 (first duplicate)
      await pasteClipboardAtPosition(0, 'current');
      expect(mockClipboard.paste).toHaveBeenCalledWith('duplicate');
      expect(mockShowHUD).toHaveBeenCalledWith('Pasted current: duplicate');

      jest.clearAllMocks();

      // Test pasting from position 2 (second duplicate) 
      await pasteClipboardAtPosition(2, 'second');
      expect(mockClipboard.paste).toHaveBeenCalledWith('duplicate');
      expect(mockShowHUD).toHaveBeenCalledWith('Pasted second: duplicate');

      jest.clearAllMocks();

      // Test pasting from position 4 (third duplicate)
      await pasteClipboardAtPosition(4, 'fourth');
      expect(mockClipboard.paste).toHaveBeenCalledWith('duplicate');
      expect(mockShowHUD).toHaveBeenCalledWith('Pasted fourth: duplicate');
    });

    it('should handle all positions having identical content', async () => {
      const identicalContent = 'same-content';
      
      mockClipboard.readText.mockResolvedValue(identicalContent);
      mockClipboard.paste.mockResolvedValue();

      // Test multiple positions with same content
      for (let i = 0; i < 3; i++) {
        await pasteClipboardAtPosition(i, `position-${i}`);
        
        expect(mockClipboard.paste).toHaveBeenCalledWith(identicalContent);
        expect(mockShowHUD).toHaveBeenCalledWith(`Pasted position-${i}: ${identicalContent}`);
        
        jest.clearAllMocks();
      }
    });

    it('should handle whitespace-only duplicates', async () => {
      const clipboardHistory = ['   spaces   ', 'content', '   spaces   ', '\t\ttabs\t\t'];
      
      mockClipboard.readText.mockImplementation(({ offset = 0 } = {}) => {
        return Promise.resolve(clipboardHistory[offset] || null);
      });
      mockClipboard.paste.mockResolvedValue();

      // Test first whitespace content
      await pasteClipboardAtPosition(0, 'current');
      expect(mockClipboard.paste).toHaveBeenCalledWith('   spaces   ');

      jest.clearAllMocks();

      // Test duplicate whitespace content
      await pasteClipboardAtPosition(2, 'second'); 
      expect(mockClipboard.paste).toHaveBeenCalledWith('   spaces   ');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty strings', async () => {
      mockClipboard.readText.mockResolvedValue('');
      mockClipboard.paste.mockResolvedValue();

      await pasteClipboardAtPosition(0, 'current');

      expect(mockClipboard.paste).not.toHaveBeenCalled();
      expect(mockShowToast).toHaveBeenCalledWith({
        style: 'failure',
        title: 'No Content',
        message: 'No content found at current clipboard position',
      });
    });

    it('should handle whitespace-only content', async () => {
      mockClipboard.readText.mockResolvedValue('   \t\n   ');
      mockClipboard.paste.mockResolvedValue();

      await pasteClipboardAtPosition(0, 'current');

      expect(mockClipboard.paste).not.toHaveBeenCalled();
      expect(mockShowToast).toHaveBeenCalledWith({
        style: 'failure',
        title: 'No Content', 
        message: 'No content found at current clipboard position',
      });
    });

    it('should handle null content', async () => {
      mockClipboard.readText.mockResolvedValue(null);
      mockClipboard.paste.mockResolvedValue();

      await pasteClipboardAtPosition(0, 'current');

      expect(mockClipboard.paste).not.toHaveBeenCalled();
      expect(mockShowToast).toHaveBeenCalledWith({
        style: 'failure',
        title: 'No Content',
        message: 'No content found at current clipboard position',
      });
    });

    it('should handle clipboard read errors', async () => {
      mockClipboard.readText.mockRejectedValue(new Error('Clipboard access denied'));
      mockClipboard.paste.mockResolvedValue();

      await pasteClipboardAtPosition(0, 'current');

      expect(mockClipboard.paste).not.toHaveBeenCalled();
      expect(mockShowToast).toHaveBeenCalledWith({
        style: 'failure',
        title: 'Paste Failed',
        message: 'Could not paste the current clipboard item',
      });
    });

    it('should handle paste operation errors', async () => {
      mockClipboard.readText.mockResolvedValue('valid content');
      mockClipboard.paste.mockRejectedValue(new Error('Paste operation failed'));

      await pasteClipboardAtPosition(0, 'current');

      expect(mockClipboard.readText).toHaveBeenCalled();
      expect(mockClipboard.paste).toHaveBeenCalledWith('valid content');
      expect(mockShowToast).toHaveBeenCalledWith({
        style: 'failure',
        title: 'Paste Failed',
        message: 'Could not paste the current clipboard item',
      });
    });
  });

  describe('Special Characters and Encoding', () => {
    it('should handle unicode and special characters', async () => {
      const specialContent = '🎉 Unicode: 你好 Emoji: 🚀 Special: ñáéíóú';
      
      mockClipboard.readText.mockResolvedValue(specialContent);
      mockClipboard.paste.mockResolvedValue();

      await pasteClipboardAtPosition(0, 'current');

      expect(mockClipboard.paste).toHaveBeenCalledWith(specialContent);
      expect(mockShowHUD).toHaveBeenCalledWith(`Pasted current: ${specialContent}`);
    });

    it('should handle newlines and formatting', async () => {
      const multilineContent = 'Line 1\nLine 2\r\nLine 3\tTabbed';
      
      mockClipboard.readText.mockResolvedValue(multilineContent);
      mockClipboard.paste.mockResolvedValue();

      await pasteClipboardAtPosition(0, 'current');

      expect(mockClipboard.paste).toHaveBeenCalledWith(multilineContent);
      expect(mockShowHUD).toHaveBeenCalledWith(`Pasted current: ${multilineContent}`);
    });

    it('should handle very long content with proper truncation', async () => {
      const veryLongContent = 'A'.repeat(1000);
      const expectedPreview = 'A'.repeat(50) + '…';
      
      mockClipboard.readText.mockResolvedValue(veryLongContent);
      mockClipboard.paste.mockResolvedValue();

      await pasteClipboardAtPosition(0, 'current');

      expect(mockClipboard.paste).toHaveBeenCalledWith(veryLongContent);
      expect(mockShowHUD).toHaveBeenCalledWith(`Pasted current: ${expectedPreview}`);
    });
  });

  describe('Clipboard History Boundaries', () => {
    it('should handle accessing beyond available history', async () => {
      // Only 3 items in history, trying to access position 5
      const clipboardHistory = ['item1', 'item2', 'item3'];
      
      mockClipboard.readText.mockImplementation(({ offset = 0 } = {}) => {
        if (offset >= clipboardHistory.length) {
          throw new Error('Invalid offset: the maximum value is 2');
        }
        return Promise.resolve(clipboardHistory[offset]);
      });

      await pasteClipboardAtPosition(5, 'fifth');

      expect(mockClipboard.paste).not.toHaveBeenCalled();
      expect(mockShowToast).toHaveBeenCalledWith({
        style: 'failure',
        title: 'Paste Failed',
        message: 'Could not paste the fifth clipboard item',
      });
    });

    it('should handle empty clipboard history', async () => {
      mockClipboard.readText.mockImplementation(() => {
        throw new Error('Invalid offset: the maximum value is -1');
      });

      await pasteClipboardAtPosition(0, 'current');

      expect(mockClipboard.paste).not.toHaveBeenCalled();
      expect(mockShowToast).toHaveBeenCalledWith({
        style: 'failure',
        title: 'Paste Failed',
        message: 'Could not paste the current clipboard item',
      });
    });
  });
}); 