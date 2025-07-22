import { popClipboardAtPosition } from '../src/paste-utils';
import { Clipboard, showHUD, showToast } from '@raycast/api';

// Mock the Raycast API
jest.mock('@raycast/api');
const mockClipboard = Clipboard as jest.Mocked<typeof Clipboard>;
const mockShowHUD = showHUD as jest.MockedFunction<typeof showHUD>;
const mockShowToast = showToast as jest.MockedFunction<typeof showToast>;

describe('Edge Cases and Repeating Content', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Repeating Content Scenarios', () => {
    it('should handle clipboard with all identical content', async () => {
      const repeatingContent = 'repeated-item';
      
      mockClipboard.readText.mockResolvedValue(repeatingContent);
      mockClipboard.paste.mockResolvedValue();
      mockClipboard.copy.mockResolvedValue();

      await popClipboardAtPosition(0, 'current');

      // Should still work normally even with identical content
      expect(mockClipboard.paste).toHaveBeenCalledWith(repeatingContent);
      expect(mockClipboard.copy).toHaveBeenCalledWith(repeatingContent);
      expect(mockShowHUD).toHaveBeenCalledWith('Popped current: repeated-item (moved to next)');
    });

    it('should handle alternating repeated patterns', async () => {
      const alternatingHistory = ['A', 'B', 'A', 'B', 'A', 'B'];
      
      mockClipboard.readText.mockImplementation(({ offset = 0 } = {}) => {
        return Promise.resolve(alternatingHistory[offset] || null);
      });
      mockClipboard.paste.mockResolvedValue();
      mockClipboard.copy.mockResolvedValue();

      await popClipboardAtPosition(0, 'current');

      expect(mockClipboard.paste).toHaveBeenCalledWith('A');  // Position 0
      expect(mockClipboard.copy).toHaveBeenCalledWith('B');   // Position 1
    });

    it('should handle mostly empty with some repeating content', async () => {
      const sparseHistory = ['content', '', 'content', '', '', 'content'];
      
      mockClipboard.readText.mockImplementation(({ offset = 0 } = {}) => {
        const content = sparseHistory[offset];
        return Promise.resolve(content || null);
      });
      mockClipboard.paste.mockResolvedValue();
      mockClipboard.copy.mockResolvedValue();

      await popClipboardAtPosition(0, 'current');

      expect(mockClipboard.paste).toHaveBeenCalledWith('content');
      // Should attempt to copy from position 1, but it's empty so nothing happens
      expect(mockClipboard.copy).not.toHaveBeenCalled();
    });

    it('should handle gradual content degradation pattern', async () => {
      // Simulate clipboard where content gets progressively shorter
      const degradingHistory = [
        'Full original content here',
        'Full original content',
        'Full original',
        'Full',
        'F',
        ''
      ];
      
      mockClipboard.readText.mockImplementation(({ offset = 0 } = {}) => {
        return Promise.resolve(degradingHistory[offset] || null);
      });
      mockClipboard.paste.mockResolvedValue();
      mockClipboard.copy.mockResolvedValue();

      await popClipboardAtPosition(0, 'current');

      expect(mockClipboard.paste).toHaveBeenCalledWith('Full original content here');
      expect(mockClipboard.copy).toHaveBeenCalledWith('Full original content');
    });
  });

  describe('Content Duplication Edge Cases', () => {
    it('should handle exact duplicates with different whitespace', async () => {
      const similarContent = [
        'content',
        ' content',
        'content ',
        ' content ',
        '\tcontent\t',
        '\ncontent\n'
      ];
      
      mockClipboard.readText.mockImplementation(({ offset = 0 } = {}) => {
        return Promise.resolve(similarContent[offset] || null);
      });
      mockClipboard.paste.mockResolvedValue();
      mockClipboard.copy.mockResolvedValue();

      await popClipboardAtPosition(0, 'current');

      // Should paste exact content including whitespace
      expect(mockClipboard.paste).toHaveBeenCalledWith('content');
      expect(mockClipboard.copy).toHaveBeenCalledWith(' content');
    });

    it('should handle case-sensitive duplicates', async () => {
      const caseVariations = [
        'Content',
        'content', 
        'CONTENT',
        'Content',
        'cOnTeNt'
      ];
      
      mockClipboard.readText.mockImplementation(({ offset = 0 } = {}) => {
        return Promise.resolve(caseVariations[offset] || null);
      });
      mockClipboard.paste.mockResolvedValue();
      mockClipboard.copy.mockResolvedValue();

      await popClipboardAtPosition(0, 'current');

      expect(mockClipboard.paste).toHaveBeenCalledWith('Content');
      expect(mockClipboard.copy).toHaveBeenCalledWith('content');
    });

    it('should handle unicode normalization differences', async () => {
      const unicodeVariations = [
        'café',          // é as single character
        'cafe\u0301',    // é as e + combining acute accent
        'café',          // back to single character
      ];
      
      mockClipboard.readText.mockImplementation(({ offset = 0 } = {}) => {
        return Promise.resolve(unicodeVariations[offset] || null);
      });
      mockClipboard.paste.mockResolvedValue();
      mockClipboard.copy.mockResolvedValue();

      await popClipboardAtPosition(0, 'current');

      expect(mockClipboard.paste).toHaveBeenCalledWith('café');
      expect(mockClipboard.copy).toHaveBeenCalledWith('cafe\u0301');
    });
  });

  describe('Memory and Performance Edge Cases', () => {
    it('should handle very large repeated content', async () => {
      const largeContent = 'A'.repeat(10000);
      
      mockClipboard.readText.mockResolvedValue(largeContent);
      mockClipboard.paste.mockResolvedValue();
      mockClipboard.copy.mockResolvedValue();

      await popClipboardAtPosition(0, 'current');

      expect(mockClipboard.paste).toHaveBeenCalledWith(largeContent);
      expect(mockClipboard.copy).toHaveBeenCalledWith(largeContent);
      
      // Verify HUD shows truncated preview
      const expectedPreview = 'A'.repeat(50) + '…';
      expect(mockShowHUD).toHaveBeenCalledWith(`Popped current: ${expectedPreview} (moved to next)`);
    });

    it('should handle many small duplicates', async () => {
      // Simulate clipboard with many short duplicates
      const history = Array(100).fill('x');
      
      mockClipboard.readText.mockImplementation(({ offset = 0 } = {}) => {
        return Promise.resolve(history[offset] || null);
      });
      mockClipboard.paste.mockResolvedValue();
      mockClipboard.copy.mockResolvedValue();

      await popClipboardAtPosition(0, 'current');

      expect(mockClipboard.paste).toHaveBeenCalledWith('x');
      expect(mockClipboard.copy).toHaveBeenCalledWith('x');
    });
  });

  describe('System Behavior with Duplicates', () => {
    it('should handle clipboard system returning inconsistent results', async () => {
      let callCount = 0;
      
      mockClipboard.readText.mockImplementation(({ offset = 0 } = {}) => {
        callCount++;
        // Simulate system behavior changing between calls
        if (callCount === 1) return Promise.resolve('first-call');
        if (callCount === 2) return Promise.resolve('second-call');
        return Promise.resolve('default');
      });
      mockClipboard.paste.mockResolvedValue();
      mockClipboard.copy.mockResolvedValue();

      await popClipboardAtPosition(0, 'current');

      expect(mockClipboard.paste).toHaveBeenCalledWith('first-call');
      expect(mockClipboard.copy).toHaveBeenCalledWith('second-call');
    });

    it('should handle rapid clipboard changes during pop operation', async () => {
      let operationStep = 0;
      
      mockClipboard.readText.mockImplementation(({ offset = 0 } = {}) => {
        if (offset === 0) {
          return Promise.resolve('stable-current');
        } else {
          // Simulate clipboard changing during operation
          operationStep++;
          return Promise.resolve(`changing-next-${operationStep}`);
        }
      });
      mockClipboard.paste.mockResolvedValue();
      mockClipboard.copy.mockResolvedValue();

      await popClipboardAtPosition(0, 'current');

      expect(mockClipboard.paste).toHaveBeenCalledWith('stable-current');
      expect(mockClipboard.copy).toHaveBeenCalledWith('changing-next-1');
    });
  });

  describe('Pop Operation with Repeating Content', () => {
    it('should handle pop when current and next are identical', async () => {
      const identicalContent = 'same-content';
      
      mockClipboard.readText.mockResolvedValue(identicalContent);
      mockClipboard.paste.mockResolvedValue();
      mockClipboard.copy.mockResolvedValue();

      await popClipboardAtPosition(0, 'current');

      // Should still execute both operations even if content is identical
      expect(mockClipboard.paste).toHaveBeenCalledWith(identicalContent);
      expect(mockClipboard.copy).toHaveBeenCalledWith(identicalContent);
    });

    it('should handle pop when only current position has content', async () => {
      mockClipboard.readText.mockImplementation(({ offset = 0 } = {}) => {
        return Promise.resolve(offset === 0 ? 'only-current' : null);
      });
      mockClipboard.paste.mockResolvedValue();
      mockClipboard.copy.mockResolvedValue();

      await popClipboardAtPosition(0, 'current');

      expect(mockClipboard.paste).toHaveBeenCalledWith('only-current');
      expect(mockClipboard.copy).not.toHaveBeenCalled(); // No position 1 content
    });

    it('should handle pop operation errors with duplicated content', async () => {
      const duplicatedContent = 'duplicate';
      
      mockClipboard.readText.mockResolvedValue(duplicatedContent);
      mockClipboard.paste.mockRejectedValue(new Error('Paste failed'));
      mockClipboard.copy.mockResolvedValue();

      await popClipboardAtPosition(0, 'current');

      expect(mockClipboard.paste).toHaveBeenCalledWith(duplicatedContent);
      expect(mockClipboard.copy).not.toHaveBeenCalled(); // Should not copy if paste fails
      expect(mockShowToast).toHaveBeenCalledWith({
        style: 'failure',
        title: 'Pop Failed',
        message: 'Could not pop the current clipboard item',
      });
    });
  });
}); 