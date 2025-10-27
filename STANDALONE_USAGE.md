# Standalone HTML Version - Usage Guide

This repository includes standalone HTML files that allow you to use the Cinematic Horror Story Generator without running a development server or installing dependencies.

## 🌟 Recommended: Vanilla JavaScript Version

**File:** `standalone-vanilla.html`

This is the **recommended** standalone version. It uses pure vanilla JavaScript and CSS with no external dependencies (except for Google Fonts and the Gemini API).

### Quick Start

1. **Set Your API Key**
   - Open `standalone-vanilla.html` in a text editor
   - Find the line that says:
     ```javascript
     const HARDCODED_API_KEY = 'YOUR_API_KEY_HERE';
     ```
   - Replace `'YOUR_API_KEY_HERE'` with your actual Gemini API key
   - Save the file

2. **Open the File**
   - Simply double-click `standalone-vanilla.html` to open it in your default web browser
   - Or right-click and select "Open with" to choose a specific browser

3. **Generate Stories**
   - Click the "Generate Story Script" button
   - Wait for the AI to generate your horror story (this may take 10-30 seconds)
   - View and interact with the generated content

## Alternative: React Version

**File:** `standalone.html`

This version uses React from CDN. It has the same features but requires external React libraries to load.

## Features

The standalone version includes all the core features:
- ✅ Generate cinematic horror story scripts
- ✅ Scene-by-scene B-roll plans
- ✅ Veo 3 image prompts
- ✅ Music and SFX design notes
- ✅ Voiceover direction
- ✅ Viral titles and hooks
- ✅ Thumbnail prompts
- ✅ Copy to clipboard functionality
- ✅ Download individual sections as text files
- ✅ Collapsible sections for easy navigation

## Getting Your Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key
5. Paste it into the `standalone.html` file as described above

## Browser Requirements

- Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- Requires internet connection for:
  - Loading Tailwind CSS styles
  - Loading React library from CDN
  - Making API calls to Google Gemini

## Limitations

The standalone version does NOT include:
- ❌ Voice generation (TTS) - This feature requires more complex setup and is only available in the full development version
- ❌ The ability to modify the source code easily (it's all in one file)

## Security Note

⚠️ **Important**: Your API key will be visible in the HTML file and in browser developer tools. 

- Do not share this file with others once you've added your API key
- Do not deploy this file to a public website
- Only use this for personal, local use

If you need a more secure solution for production use, please use the full development version of this project.

## Troubleshooting

**Error: "Please set your Gemini API key"**
- Make sure you've replaced `'YOUR_API_KEY_HERE'` with your actual API key
- Ensure the API key is enclosed in quotes

**Nothing happens when I click the button**
- Check your browser's developer console (F12) for errors
- Verify you have an internet connection
- Make sure your API key is valid

**API Error messages**
- Verify your API key is correct
- Check that your Google Cloud project has the Gemini API enabled
- Ensure you haven't exceeded your API quota

## Going Back to Development Mode

If you prefer to use the full development version:

1. Install dependencies: `npm install`
2. Create a `.env.local` file with your API key: `API_KEY=your-key-here`
3. Run the development server: `npm run dev`
4. Open http://localhost:5173 in your browser

The development version includes voice generation and a better development experience.
