# Second Last Clipboard - Raycast Extension

![Raycast](https://img.shields.io/badge/Raycast-FF6363?style=for-the-badge&logo=raycast&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

A powerful Raycast extension that allows you to quickly access and paste the **second last item** from your clipboard history. Perfect for developers and power users who frequently need to access recently copied content.

## 🚀 Features

### ⚡ Quick Paste Command
- **Instant execution** with no-view mode
- **Keyboard shortcut support** for lightning-fast access
- **Smart previews** with content truncation
- **HUD confirmations** showing what was pasted

### 📋 Clipboard History Viewer
- **Visual interface** showing up to 6 recent clipboard items
- **Search functionality** to find specific content
- **Rich metadata** including character counts and timestamps
- **Action panel** with copy, paste, and refresh options
- **Special highlighting** for the target second-last item ⭐

### 🛡️ Robust Error Handling
- Graceful handling of empty clipboard history
- User-friendly error messages via toast notifications
- Comprehensive logging for debugging

## 🔧 Installation

### Development Installation

1. **Clone or download this repository:**
   ```bash
   git clone <your-repo-url>
   cd second-last-clipboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development mode:**
   ```bash
   npm run dev
   ```

4. **Open Raycast** - your extension will appear in the commands list

## 🎯 Usage

### Setting Up Keyboard Shortcuts (Recommended)

1. Open Raycast Settings (`⌘ + ,`)
2. Navigate to **Extensions** → **Second Last Clipboard**
3. Assign keyboard shortcuts:
   - **Quick Paste**: `⌘ + ⇧ + V` (recommended)
   - **History Viewer**: `⌘ + ⇧ + H` (recommended)

### Commands

#### 1. Paste Second Last Clipboard Item
- **Mode**: No-view (instant execution)
- **Function**: Retrieves and immediately pastes the second last clipboard item
- **Best for**: Quick workflows with keyboard shortcuts

#### 2. Clipboard History Viewer
- **Mode**: View (interactive interface)
- **Function**: Browse your clipboard history visually
- **Features**:
  - Search through clipboard items
  - Preview content before pasting
  - Copy items back to system clipboard
  - Refresh history on demand

## 🏗️ Technical Details

### Architecture
- **Framework**: React with TypeScript
- **API**: Raycast API v1.101.1
- **State Management**: React Hooks
- **Code Quality**: ESLint + Prettier

### Key API Usage
```typescript
// Access second last clipboard item
const content = await Clipboard.readText({ offset: 1 });

// Paste content to active application
await Clipboard.paste(content);

// Show confirmation
await showHUD(`Pasted: ${preview}`);
```

### Clipboard History Support
- Supports up to 6 items (Raycast API limitation)
- Offset 0 = current clipboard
- Offset 1 = second last (target item)
- Offsets 2-5 = further back in history

## 🧪 Development

### Prerequisites
- **Node.js** 16.10 or higher
- **npm** 7.0 or higher
- **Raycast** app installed on macOS

### Available Scripts

```bash
# Start development with hot reloading
npm run dev

# Build for production
npm run build

# Run linting (may require additional setup)
npm run lint

# Fix linting issues
npm run fix-lint

# Prepare for publishing
npm run publish
```

### Project Structure
```
second-last-clipboard/
├── package.json              # Extension manifest
├── tsconfig.json             # TypeScript configuration
├── .eslintrc.js              # ESLint configuration
├── .prettierrc               # Prettier configuration
├── .gitignore                # Git ignore rules
├── README.md                 # This file
├── LICENSE                   # MIT license
├── CHANGELOG.md              # Version history
├── CONTRIBUTING.md           # Contributing guidelines
├── .github/                  # GitHub templates
│   ├── workflows/ci.yml      # CI/CD pipeline
│   ├── ISSUE_TEMPLATE/       # Issue templates
│   └── pull_request_template.md
├── assets/
│   └── clipboard.png         # Extension icon (512x512)
└── src/
    ├── paste-second-last.tsx # Quick paste command
    └── clipboard-history.tsx # History viewer
```

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### Development Guidelines
- Follow the existing code style (ESLint + Prettier configured)
- Add proper TypeScript types
- Test your changes thoroughly
- Update documentation as needed

## 📋 Roadmap

- [ ] **Store Publication**: Submit to Raycast Extension Store
- [ ] **Enhanced Content Type Detection**: Support for images, files, etc.
- [ ] **History Persistence**: Save clipboard history across sessions
- [ ] **Customizable History Depth**: Allow users to configure item count
- [ ] **Fuzzy Search**: Enhanced search capabilities
- [ ] **Keyboard Navigation**: Full keyboard support in history viewer

## ❓ FAQ

**Q: Why specifically the "second last" clipboard item?**
A: Often when copying multiple items, you need to paste the previous item while keeping the most recent one for later use. This extension makes that workflow instant.

**Q: How many clipboard items can I access?**
A: The extension can access up to 6 recent clipboard items due to Raycast API limitations.

**Q: Does this work with images or files?**
A: Currently, the extension focuses on text content. Support for other content types is planned for future releases.

**Q: Can I customize the keyboard shortcuts?**
A: Yes! Assign any keyboard shortcuts through Raycast Settings → Extensions → Second Last Clipboard.

## 🐛 Issues and Support

If you encounter any issues or have feature requests:

1. **Check existing issues** in the repository
2. **Create a new issue** with detailed description and steps to reproduce
3. **Include system information**: Raycast version, macOS version, etc.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Raycast Team** for the amazing platform and APIs
- **React Team** for the excellent framework
- **TypeScript Team** for type safety and developer experience

## ⭐ Show Your Support

If this extension helps your workflow, please consider:
- ⭐ **Starring the repository**
- 🐦 **Sharing on social media**
- 🤝 **Contributing improvements**
- 📝 **Writing a review** when it's available in the store

---

<div align="center">
  <sub>Built with ❤️ using Raycast Extensions API</sub>
</div> 