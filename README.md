# Pastable Clipboard History

![CI](https://github.com/wook/pastable-clipboard-history/workflows/CI/badge.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Raycast](https://img.shields.io/badge/Raycast-FF6363?logo=raycast&logoColor=white)

A powerful Raycast extension that provides instant access to your clipboard history with dedicated keyboard shortcuts for positions 0-5.

## ✨ Features

- **🎯 6 Instant Paste Commands**: Direct access to clipboard positions 0-5 (Raycast's full range)

- **🔥 No-View Mode**: All commands execute instantly without opening UI
- **⌨️ Keyboard-First**: Perfect for hotkey assignment and rapid workflows
- **🛡️ Error Handling**: Graceful handling of empty clipboard positions
- **📱 HUD Notifications**: Visual confirmation with content preview

## 🚀 Commands

### Paste Commands (6 total)

| Command         | Description                       | Offset |
| --------------- | --------------------------------- | ------ |
| `paste-current` | Paste Current Clipboard Item      | 0      |
| `paste-first`   | Paste 1st Previous Clipboard Item | 1      |
| `paste-second`  | Paste 2nd Previous Clipboard Item | 2      |
| `paste-third`   | Paste 3rd Previous Clipboard Item | 3      |
| `paste-fourth`  | Paste 4th Previous Clipboard Item | 4      |
| `paste-fifth`   | Paste 5th Previous Clipboard Item | 5      |

## 🎮 Usage

### Setting Up Keyboard Shortcuts (Highly Recommended!)

1. Open Raycast Settings (`⌘ + ,`)
2. Navigate to **Extensions** → **Pastable Clipboard History**
3. Assign keyboard shortcuts for frequently used positions:

**Suggested Shortcuts:**

```
⌘ + ⇧ + 0   →   Paste Current Clipboard Item
⌘ + ⇧ + 1   →   Paste 1st Previous Clipboard Item
⌘ + ⇧ + 2   →   Paste 2nd Previous Clipboard Item
⌘ + ⇧ + 3   →   Paste 3rd Previous Clipboard Item
⌘ + ⇧ + 4   →   Paste 4th Previous Clipboard Item
```

### Available Commands

| Command                | Description            | Clipboard Offset | Best For               |
| ---------------------- | ---------------------- | ---------------- | ---------------------- |
| **Paste Current**      | Current clipboard item | offset: 0        | Same as ⌘+V            |
| **Paste 1st Previous** | 1st previous item      | offset: 1        | Most frequently needed |
| **Paste 2nd Previous** | 2nd previous item      | offset: 2        | Secondary choice       |
| **Paste 3rd Previous** | 3rd previous item      | offset: 3        | Tertiary option        |
| **Paste 4th Previous** | 4th previous item      | offset: 4        | Occasional use         |
| **Paste 5th Previous** | 5th previous item      | offset: 5        | Deep history           |

## 🏗️ Technical Details

### Architecture

- **Framework**: TypeScript with Raycast API
- **Pattern**: Shared utility function with position-specific commands
- **Mode**: No-view for instant execution
- **API**: Raycast API v1.101.1

### Key Implementation

```typescript
// Shared utility function
async function pasteClipboardAtPosition(offset: number, positionName: string);

// Usage in each command
await pasteClipboardAtPosition(0, "current"); // For paste-current
await pasteClipboardAtPosition(1, "1st previous"); // For paste-first
// ... etc
```

### Error Handling

- **Missing items**: Graceful handling with user-friendly messages
- **API failures**: Comprehensive error logging and user feedback
- **Position validation**: Clear feedback about what position was attempted

## 💡 Use Cases

### For Developers

- **Code snippets**: Quick access to recently copied functions/classes
- **URLs**: Switch between different API endpoints or documentation links
- **Commands**: Rapid access to terminal commands or scripts

### For Writers

- **Research**: Quick access to quotes, references, or sources
- **Templates**: Faster insertion of boilerplate text
- **Revisions**: Easy access to previous versions of sentences/paragraphs

### For Designers

- **Color codes**: Quick access to hex codes or CSS values
- **Asset paths**: Faster insertion of file paths or URLs
- **Measurements**: Quick access to dimensions or specifications

## 🧪 Development

### Prerequisites

- **Node.js** 16.10 or higher
- **npm** 7.0 or higher
- **Raycast** app installed on macOS

### Project Structure

```
pastable-clipboard-history/
├── package.json                 # Extension manifest with 10 commands
├── tsconfig.json                # TypeScript configuration
├── assets/
│   └── clipboard.png            # Extension icon (512x512)
└── src/
    ├── paste-utils.ts           # Shared utility function
    ├── paste-current.tsx        # Position 0 command
    ├── paste-first.tsx          # Position 1 command
    ├── paste-second.tsx         # Position 2 command
    ├── paste-third.tsx          # Position 3 command
    ├── paste-fourth.tsx         # Position 4 command
    ├── paste-fifth.tsx          # Position 5 command
    ├── paste-sixth.tsx          # Position 6 command
    ├── paste-seventh.tsx        # Position 7 command
    ├── paste-eighth.tsx         # Position 8 command
    └── paste-ninth.tsx          # Position 9 command
```

### Available Scripts

```bash
# Start development with hot reloading
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Fix linting issues
npm run fix-lint
```

## 🔄 Workflow Integration

### Typical Usage Pattern

1. **Copy multiple items** during research/development
2. **Assign shortcuts** to positions 1-4 for frequent access
3. **Use muscle memory** - `⌘⇧1` becomes automatic
4. **Get instant feedback** via HUD confirmations

### Pro Tips

- Start with shortcuts for positions 1-3 (most commonly needed)
- Use consistent modifier keys across all positions
- The HUD preview helps confirm you pasted the right item
- Combine with Raycast's built-in clipboard history for full workflow

## ❓ FAQ

**Q: Why not just use Raycast's built-in clipboard history?**
A: This extension is for power users who want instant access without opening any interface. Think of it as "speed dial" for your clipboard.

**Q: How many positions can I access?**
A: This extension covers positions 0-9. Position 0 is the current clipboard (same as ⌘+V).

**Q: What happens if a position doesn't exist?**
A: You'll get a clear error message indicating that position is empty in your clipboard history.

**Q: Can I customize the position names?**
A: The position names are built-in (current, 1st previous, etc.), but you can assign any keyboard shortcuts you prefer.

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Raycast Team** for the excellent platform and clipboard APIs
- **Power users** who inspired this streamlined approach

---

<div align="center">
  <sub>Built for speed ⚡ - optimized for keyboard warriors</sub>
</div>
