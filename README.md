# Pastable Clipboard History - Raycast Extension

![Raycast](https://img.shields.io/badge/Raycast-FF6363?style=for-the-badge&logo=raycast&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

A smart, configurable Raycast extension that provides **instant access to clipboard positions** with intelligent search, visual previews, and user-customizable settings. Perfect for power users who want more than basic clipboard access.

## 🚀 Why This Extension?

While Raycast has excellent built-in clipboard history, **Pastable Clipboard History** provides:
- **🎛️ Configurable positions** - Choose 3-15 clipboard slots
- **🔍 Smart search** - Find clipboard items by content
- **👁️ Visual previews** - See what you're pasting before selection
- **⚙️ Customizable display** - Adjust preview length and timestamps
- **⌨️ Keyboard shortcuts** - Fast navigation and actions

## ⚡ Features

### 🎛️ **Fully Configurable**
- **Position Count**: Choose 3, 5, 8, 10, or 15 clipboard positions
- **Preview Length**: Short (30), Medium (60), Long (100), or Extra Long (150) characters
- **Timestamps**: Toggle display of when items were copied

### 🔍 **Smart Interface**
- **Intelligent Search**: Filter clipboard items by content
- **Visual Previews**: See content before pasting
- **Position Indicators**: Clear 2nd, 3rd, 4th, etc. labeling
- **Character Counts**: Know how much content you're pasting
- **Smart Icons**: Different icons for recent vs. older items

### ⚡ **Fast Actions**
- **Instant Paste**: Primary action on each item
- **Copy to Current**: Move items to top of clipboard
- **Show Full Content**: View complete content in toast
- **Refresh History**: Update clipboard data on demand

## 🔧 Installation & Setup

### Development Installation

1. **Clone this repository:**
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

4. **Open Raycast** - the extension will appear as "Paste from Clipboard Position"

## ⚙️ Configuration

### Setting Up Preferences

1. Open Raycast Settings (`⌘ + ,`)
2. Navigate to **Extensions** → **Pastable Clipboard History**
3. Configure your preferences:

#### **Number of Clipboard Positions**
Choose how many positions to show:
- **3 positions** (2nd-4th) - Minimal, fast
- **5 positions** (2nd-6th) - **Default**, balanced
- **8 positions** (2nd-9th) - Extended history
- **10 positions** (2nd-11th) - Power user
- **15 positions** (2nd-16th) - Maximum depth

#### **Content Preview Length**
Set preview text length:
- **Short (30 chars)** - Compact display
- **Medium (60 chars)** - **Default**, good balance
- **Long (100 chars)** - More context
- **Extra Long (150 chars)** - Maximum preview

#### **Show Timestamps**
- **Enabled** (default) - Shows "2m ago", "1h ago", etc.
- **Disabled** - Hide timestamps for cleaner display

### Recommended Keyboard Shortcut
Assign `⌘ + ⇧ + V` to "Paste from Clipboard Position" for instant access.

## 🎯 Usage Guide

### **Quick Access Workflow**
1. **Trigger**: Use your keyboard shortcut or search "Paste from Clipboard Position"
2. **Browse**: See visual list of clipboard positions with previews
3. **Search**: Type to filter items by content
4. **Select**: Press Enter or click to paste instantly

### **Keyboard Navigation**
- **↑/↓ Arrows**: Navigate through items
- **Enter**: Paste selected item
- **⌘ + C**: Copy item to current clipboard position
- **⌘ + E**: Show full content in toast
- **⌘ + R**: Refresh clipboard history
- **Escape**: Close without action

### **Visual Indicators**
- **⭐ Yellow Star**: 2nd position (most commonly needed)
- **📋 Blue Clipboard**: 3rd-4th positions (frequent use)
- **📄 Document**: 5th+ positions (occasional use)

## 💡 Use Cases

### **For Developers**
```
Scenario: API development
1. Copy API endpoint → Copy authentication token → Copy request body
2. Open extension → Select "3rd" for endpoint → Paste
3. Switch contexts → Select "2nd" for token → Paste
```

### **For Writers**
```
Scenario: Research article
1. Copy multiple quotes and references
2. Use search to find specific quote: "according to"
3. Preview before pasting to ensure correct citation
```

### **For Designers**
```
Scenario: CSS styling
1. Copy hex colors, measurements, font names
2. Use position labels to remember: 2nd=primary color, 3rd=spacing
3. Quick paste without losing workflow
```

## 🏗️ Technical Details

### **Smart Architecture**
- **Single Command**: Clean, uncluttered Raycast interface
- **Dynamic Lists**: Content loads based on user preferences
- **React Hooks**: Modern state management
- **TypeScript**: Full type safety

### **Preference Integration**
```typescript
interface Preferences {
  maxPositions: string;    // "3" | "5" | "8" | "10" | "15"
  previewLength: string;   // "30" | "60" | "100" | "150"
  showTimestamps: boolean; // true | false
}
```

### **Performance Features**
- **Lazy Loading**: Only loads configured number of positions
- **Efficient Search**: Real-time filtering without API calls
- **Smart Caching**: Clipboard data cached until refresh
- **Error Handling**: Graceful degradation when positions unavailable

## 🆚 Comparison with Alternatives

| Feature | Pastable Clipboard History | Raycast Built-in | Other Extensions |
|---------|---------------------------|------------------|------------------|
| **Configurable Positions** | ✅ 3-15 positions | ❌ Fixed | ❌ Usually fixed |
| **Smart Search** | ✅ Content filtering | ✅ Basic | ➖ Varies |
| **Visual Previews** | ✅ Customizable length | ➖ Limited | ➖ Varies |
| **Position Labels** | ✅ 2nd, 3rd, etc. | ❌ None | ❌ Usually none |
| **Quick Keyboard Access** | ✅ Single hotkey | ✅ Single hotkey | ➖ Varies |
| **Timestamp Display** | ✅ Configurable | ✅ Always shown | ➖ Varies |

## 🛠️ Development

### **Project Structure**
```
pastable-clipboard-history/
├── package.json                    # Extension manifest + preferences
├── src/
│   └── paste-from-position.tsx    # Main command implementation
├── assets/
│   └── clipboard.png              # Extension icon
└── docs/                          # Documentation
```

### **Key Components**
- **Preferences**: User configuration via Raycast settings
- **ClipboardItem Interface**: Structured clipboard data
- **Dynamic Loading**: Position-based clipboard access
- **Smart UI**: Responsive list with search and actions

### **Available Scripts**
```bash
npm run dev        # Start development with hot reload
npm run build      # Build for production  
npm run lint       # Check code quality
npm run fix-lint   # Auto-fix linting issues
```

## 🔄 Changelog

### **v2.0.0 - Configurable Revolution**
- 🎛️ **NEW**: User-configurable position count (3-15)
- 🔍 **NEW**: Smart search and filtering
- 👁️ **NEW**: Customizable preview lengths  
- ⚙️ **NEW**: Preference-based configuration
- 🗂️ **CHANGED**: Single smart command instead of 9 separate commands
- ⚡ **IMPROVED**: Better UX with visual indicators and shortcuts

### **v1.0.0 - Initial Release**
- Basic 9-command clipboard position access

## ❓ FAQ

**Q: How is this different from Raycast's built-in clipboard history?**
A: We provide configurable position counts, smart search, visual previews, and quick access without opening the full history interface.

**Q: Can I still use keyboard shortcuts for instant access?**
A: Yes! Assign a hotkey to "Paste from Clipboard Position" and you get instant access to the visual interface.

**Q: What happens if I configure more positions than I have clipboard items?**
A: The extension gracefully shows only available items. Empty positions don't appear.

**Q: Can I search through clipboard content?**
A: Yes! Just start typing in the search box to filter items by their content.

**Q: How do timestamps work?**
A: Timestamps are approximated based on clipboard position. Toggle them on/off in preferences.

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### **Development Priorities**
1. **Performance optimizations** for large clipboard histories
2. **Additional content type support** (images, files)
3. **Advanced search features** (regex, content type filtering)
4. **Export/backup functionality** for clipboard history

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Raycast Team** for the extensible platform and clipboard APIs
- **Community feedback** that drove the configurable redesign
- **Power users** who inspired the smart interface approach

---

<div align="center">
  <sub>⚡ Configurable • 🔍 Searchable • 👁️ Visual • ⌨️ Fast</sub>
</div> 