# Pastable Clipboard History - Raycast Extension

![Raycast](https://img.shields.io/badge/Raycast-FF6363?style=for-the-badge&logo=raycast&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

A streamlined Raycast extension that provides **instant paste commands** for clipboard positions 2-10. Perfect for power users who need quick access to recent clipboard items with dedicated keyboard shortcuts.

## 🚀 Why This Extension?

While Raycast has excellent built-in clipboard history, **Pastable Clipboard History** provides **lightning-fast access** to specific positions with dedicated keyboard shortcuts. No menus, no navigation - just instant paste!

## ⚡ Features

### 🔢 Position-Based Paste Commands
- **9 dedicated commands** for clipboard positions 2nd through 10th
- **No-view mode** for instant execution
- **Smart previews** showing what was pasted
- **Error handling** for missing clipboard items

### ⌨️ Perfect for Keyboard Shortcuts
- Assign hotkeys like `⌘⇧2`, `⌘⇧3`, etc.
- **Muscle memory friendly** - consistent pattern
- **Zero UI** - paste happens immediately
- **HUD confirmations** showing pasted content

### 🛡️ Robust & Reliable
- Graceful handling when positions don't exist
- Clear error messages
- Comprehensive logging for debugging
- TypeScript for type safety

## 🔧 Installation

### Development Installation

1. **Clone or download this repository:**
   ```bash
   git clone <your-repo-url>
   cd pastable-clipboard-history
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development mode:**
   ```bash
   npm run dev
   ```

4. **Open Raycast** - all 9 paste commands will appear

## 🎯 Usage

### Setting Up Keyboard Shortcuts (Highly Recommended!)

1. Open Raycast Settings (`⌘ + ,`)
2. Navigate to **Extensions** → **Pastable Clipboard History**
3. Assign keyboard shortcuts for frequently used positions:

**Suggested Shortcuts:**
```
⌘ + ⇧ + 2   →   Paste 2nd Clipboard Item
⌘ + ⇧ + 3   →   Paste 3rd Clipboard Item  
⌘ + ⇧ + 4   →   Paste 4th Clipboard Item
⌘ + ⇧ + 5   →   Paste 5th Clipboard Item
⌘ + ⇧ + 6   →   Paste 6th Clipboard Item
```

### Available Commands

| Command | Description | Clipboard Offset | Best For |
|---------|-------------|------------------|----------|
| **Paste 2nd** | Second last item | offset: 1 | Most frequently needed |
| **Paste 3rd** | Third last item | offset: 2 | Secondary choice |
| **Paste 4th** | Fourth last item | offset: 3 | Tertiary option |
| **Paste 5th** | Fifth last item | offset: 4 | Occasional use |
| **Paste 6th** | Sixth last item | offset: 5 | Deep history |
| **Paste 7th** | Seventh last item | offset: 6 | Extended history |
| **Paste 8th** | Eighth last item | offset: 7 | Advanced use |
| **Paste 9th** | Ninth last item | offset: 8 | Power user |
| **Paste 10th** | Tenth last item | offset: 9 | Maximum depth |

## 🏗️ Technical Details

### Architecture
- **Framework**: TypeScript with Raycast API
- **Pattern**: Shared utility function with position-specific commands
- **Mode**: No-view for instant execution
- **API**: Raycast API v1.101.1

### Key Implementation
```typescript
// Shared utility function
async function pasteClipboardAtPosition(offset: number, positionName: string)

// Usage in each command
await pasteClipboardAtPosition(1, "2nd");  // For paste-second
await pasteClipboardAtPosition(2, "3rd");  // For paste-third
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
├── package.json              # Extension manifest with 9 commands
├── tsconfig.json             # TypeScript configuration
├── .eslintrc.js              # ESLint configuration
├── assets/
│   └── clipboard.png         # Extension icon (512x512)
└── src/
    ├── paste-utils.ts        # Shared utility function
    ├── paste-second.tsx      # 2nd position command
    ├── paste-third.tsx       # 3rd position command
    ├── paste-fourth.tsx      # 4th position command
    ├── paste-fifth.tsx       # 5th position command
    ├── paste-sixth.tsx       # 6th position command
    ├── paste-seventh.tsx     # 7th position command
    ├── paste-eighth.tsx      # 8th position command
    ├── paste-ninth.tsx       # 9th position command
    └── paste-tenth.tsx       # 10th position command
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
2. **Assign shortcuts** to positions 2-5 for frequent access
3. **Use muscle memory** - `⌘⇧2` becomes automatic
4. **Get instant feedback** via HUD confirmations

### Pro Tips
- Start with shortcuts for positions 2-4 (most commonly needed)
- Use consistent modifier keys across all positions
- The HUD preview helps confirm you pasted the right item
- Combine with Raycast's built-in clipboard history for full workflow

## ❓ FAQ

**Q: Why not just use Raycast's built-in clipboard history?**
A: This extension is for power users who want instant access without opening any interface. Think of it as "speed dial" for your clipboard.

**Q: How many positions can I access?**
A: This extension covers positions 2-10. Position 1 (most recent) is accessible via standard `⌘+V`.

**Q: What happens if a position doesn't exist?**
A: You'll get a clear error message indicating that position is empty in your clipboard history.

**Q: Can I customize the position names?**
A: The position names are built-in (2nd, 3rd, etc.), but you can assign any keyboard shortcuts you prefer.

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