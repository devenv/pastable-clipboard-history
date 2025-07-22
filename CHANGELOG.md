# Changelog

All notable changes to the Pastable Clipboard History extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2024-07-22

### 🎛️ **MAJOR REDESIGN: Configurable Revolution**

This release completely transforms the extension from 9 static commands to a single, intelligent, configurable interface.

### Added
- **🎛️ User Preferences** - Configure position count, preview length, and timestamp display
- **🔍 Smart Search** - Filter clipboard items by content in real-time
- **👁️ Visual Previews** - See clipboard content before pasting with customizable length
- **⚙️ Position Configuration** - Choose 3, 5, 8, 10, or 15 clipboard positions
- **🎨 Smart Icons** - Visual indicators for recent vs. older clipboard items
- **📊 Content Metadata** - Character counts and timestamps for each item
- **⌨️ Keyboard Shortcuts** - Enhanced navigation with Cmd+C, Cmd+E, Cmd+R
- **🔄 Refresh Action** - Update clipboard history on demand

### Changed
- **🗂️ BREAKING: Single Command** - Replaced 9 separate commands with one smart interface
- **📋 Mode Change** - From `no-view` instant commands to `view` mode with list interface
- **🎯 User Experience** - Browse and select instead of blind position-based pasting
- **📐 Architecture** - React hooks-based state management with TypeScript interfaces

### Removed
- **❌ 9 Individual Commands** - No longer need separate "Paste 2nd", "Paste 3rd", etc.
- **❌ Utility File** - Consolidated into single component architecture

### Performance
- **⚡ Lazy Loading** - Only loads configured number of positions
- **🧠 Smart Caching** - Clipboard data cached until manual refresh
- **🔍 Efficient Search** - Real-time filtering without API calls
- **🛡️ Error Handling** - Graceful degradation when positions unavailable

### Documentation
- **📖 Complete README Rewrite** - Configuration guide, usage examples, comparisons
- **💡 Use Case Examples** - Scenarios for developers, writers, designers
- **🆚 Comparison Table** - Feature comparison with alternatives
- **❓ Comprehensive FAQ** - Common questions and troubleshooting

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

## Migration Guide: v1.0.0 → v2.0.0

### For End Users
1. **Remove Old Shortcuts** - Delete individual position shortcuts (⌘⇧2, ⌘⇧3, etc.)
2. **Assign New Shortcut** - Set hotkey for "Paste from Clipboard Position" (suggested: ⌘⇧V)
3. **Configure Preferences** - Go to Raycast Settings → Extensions → Pastable Clipboard History
4. **Set Position Count** - Choose how many positions you want (default: 5)
5. **Adjust Preview Length** - Set comfortable preview size (default: 60 chars)

### For Developers
- **Command Structure**: Single command with `mode: "view"` instead of 9 `mode: "no-view"` commands
- **Preferences**: New preference schema with dropdown and checkbox types
- **State Management**: React hooks instead of utility function calls
- **API Usage**: Dynamic clipboard loading based on user configuration

---

## Acknowledgments

- **Community Feedback** - This redesign was driven by user requests for configurability
- **Raycast Team** - For the extensible platform that made this redesign possible
- **Power Users** - Who inspired the intelligent interface approach 