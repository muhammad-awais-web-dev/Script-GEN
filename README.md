<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/17lBtwCHdDmWp7VaH_iRX8VYLLUTPAH9C

## 🚀 Quick Start - Standalone Version (No Installation Required!)

For the easiest way to use this app **with a single click**:

1. Open `standalone.html` in a text editor
2. Replace `'YOUR_API_KEY_HERE'` with your Gemini API key (around line 25)
3. Save and double-click `standalone.html` to open in your browser
4. Click "Generate Story Script" and enjoy!

📖 See [STANDALONE_USAGE.md](STANDALONE_USAGE.md) for detailed instructions.

**Note:** The standalone version includes all core features except voice generation (TTS).

## Run Locally (Development Version)

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

The development version includes all features including voice generation.
