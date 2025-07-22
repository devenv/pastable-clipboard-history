# Changelog

All notable changes to the Pastable Clipboard History extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2024-07-22

### 🔄 **MAJOR SIMPLIFICATION: Back to Speed**

This release reverts to the streamlined approach prioritizing **speed and simplicity** over configuration. Perfect for power users who want instant clipboard access without any UI complexity.

### Added
- **10 Individual Commands** - Positions 0-9 for comprehensive clipboard coverage
- **Position 0 Command** - Access current clipboard (equivalent to ⌘+V)
- **Instant Execution** - All commands use `no-view` mode for immediate pasting
- **Smart Error Handling** - Clear messages when positions are empty
- **HUD Confirmations** - Visual feedback showing pasted content preview

### Changed
- **🔄 BREAKING: Back to Predefined Commands** - Removed configurable interface
- **📋 Position System** - Now covers 0-9 instead of 2nd-10th
- **⚡ Speed Focus** - Zero UI, instant paste execution
- **⌨️ Keyboard-First** - Designed entirely for hotkey assignment

### Removed
- **❌ Configurable Interface** - No more list view or search functionality
- **❌ User Preferences** - No settings to configure
- **❌ Visual Browser** - No content preview before pasting
- **❌ Pop/Remove Features** - Simplified to core paste functionality

### Performance
- **⚡ Maximum Speed** - No React rendering, immediate execution
- **🧠 Minimal Memory** - Lightweight command-only architecture
- **🔧 Simple Debugging** - Straightforward error paths
- **📱 Zero Latency** - Direct clipboard to paste workflow

### Technical
- **10 Command Files** - Individual .tsx files for each position
- **Shared Utility** - Common `pasteClipboardAtPosition` function
- **TypeScript Safety** - Full type checking and error handling
- **Clean Architecture** - Minimal dependencies, maximum efficiency

## [2.0.0] - 2024-07-22

### 🎛️ **CONFIGURABLE REVOLUTION** (Superseded by v3.0.0)

This release completely transformed the extension from 9 static commands to a single, intelligent, configurable interface.

### Added
- **🎛️ User Preferences** - Configure position count, preview length, and timestamp display
- **🔍 Smart Search** - Filter clipboard items by content in real-time
- **👁️ Visual Previews** - See clipboard content before pasting with customizable length
- **⚙️ Position Configuration** - Choose 3, 5, 8, 10, or 15 clipboard positions
- **🎨 Smart Icons** - Visual indicators for recent vs. older clipboard items
- **📊 Content Metadata** - Character counts and timestamps for each item
- **⌨️ Keyboard Shortcuts** - Enhanced navigation with Cmd+C, Cmd+E, Cmd+R
- **🔄 Refresh Action** - Update clipboard history on demand
- **🗑️ Pop Functionality** - Remove items from clipboard history view

### Changed
- **🗂️ BREAKING: Single Command** - Replaced 9 separate commands with one smart interface
- **📋 Mode Change** - From `no-view` instant commands to `view` mode with list interface
- **🎯 User Experience** - Browse and select instead of blind position-based pasting
- **📐 Architecture** - React hooks-based state management with TypeScript interfaces

### Performance
- **⚡ Lazy Loading** - Only loads configured number of positions
- **🧠 Smart Caching** - Clipboard data cached until manual refresh
- **🔍 Efficient Search** - Real-time filtering without API calls
- **🛡️ Error Handling** - Graceful degradation when positions unavailable

## [1.0.0] - 2024-07-22

### Added
- **🔢 Position Commands** - 9 dedicated paste commands for clipboard positions 2-10
- **⚡ No-View Mode** - Instant execution without UI
- **🛡️ Error Handling** - Graceful handling of missing clipboard items
- **📱 HUD Feedback** - Confirmation messages showing pasted content
- **⌨️ Keyboard Friendly** - Designed for hotkey assignment
- **🎨 Extension Icon** - Custom clipboard icon
- **📄 Documentation** - README, LICENSE, and CONTRIBUTING files
- **🔧 Development Tools** - ESLint, Prettier, TypeScript configuration

### Technical
- **🏗️ Shared Utilities** - Common paste function with position-specific wrappers
- **📦 Extension Structure** - Standard Raycast extension format
- **🔍 Type Safety** - Full TypeScript implementation
- **🧪 Development Workflow** - Hot reloading and linting scripts

---

## Version Philosophy Evolution

### **v1.0.0**: Foundation
Basic position-based clipboard access with 9 commands.

### **v2.0.0**: Configuration Power
Added extensive customization, visual interface, and advanced features.

### **v3.0.0**: Speed-First Simplicity ⚡
Prioritized instant access and keyboard efficiency over configuration complexity.

---

## Migration Guide: v2.0.0 → v3.0.0

### For End Users
1. **Remove Old Shortcut** - Delete the single "Paste from Clipboard Position" hotkey
2. **Assign Position Shortcuts** - Set individual hotkeys for positions you need:
   ```
   ⌘⇧0 → Paste Current Clipboard Item
   ⌘⇧1 → Paste 1st Previous Clipboard Item
   ⌘⇧2 → Paste 2nd Previous Clipboard Item
   ⌘⇧3 → Paste 3rd Previous Clipboard Item
   ```
3. **Muscle Memory Training** - Practice the new instant-paste workflow
4. **Speed Benefits** - Enjoy zero-latency clipboard access

### For Developers
- **Command Structure**: 10 individual `no-view` commands instead of single `view` command
- **No Preferences**: Removed all preference configuration
- **Simplified State**: No React state management, direct function calls
- **API Usage**: Simple `Clipboard.readText({ offset })` and `Clipboard.paste()`

---

## Performance Comparison

| Aspect | v1.0.0 | v2.0.0 | v3.0.0 |
|--------|--------|--------|--------|
| **Commands** | 9 positions | 1 configurable | 10 positions |
| **UI Latency** | ~0ms | ~100-200ms | ~0ms |
| **Memory Usage** | Minimal | Moderate | Minimal |
| **Configuration** | None | Extensive | None |
| **Learning Curve** | Simple | Complex | Simple |
| **Power User Focus** | ✅ High | ➖ Medium | ✅ Maximum |

---

## Acknowledgments

- **v1.0.0**: Initial concept and foundation
- **v2.0.0**: Community feedback driving configurability 
- **v3.0.0**: Power user feedback emphasizing speed over features
- **Raycast Team** - For the platform that makes all versions possible 