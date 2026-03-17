# Logo Installation Instructions

## Adding Jharkhand State Government Logo

The CIVIC application is now configured to use the official Jharkhand state government logo. To complete the setup:

### Step 1: Download the Official Logo
1. Visit the official Jharkhand government website or Wikipedia page for the state emblem
2. Download the official high-resolution PNG logo (recommended: 512x512 pixels or higher)
3. Ensure the logo has a transparent background for best results

### Step 2: Replace the Placeholder
1. Save the downloaded logo as `jharkhand-logo.png` 
2. Replace the existing placeholder file in the `public` folder:
   ```
   CIVIC_2/CIVIC/public/jharkhand-logo.png
   ```

### Step 3: Optional Favicon
For better branding, also replace the favicon:
1. Convert the logo to ICO format (16x16, 32x32, 48x48 sizes)
2. Replace `public/favicon.ico`

### Logo Sources
- Official Jharkhand Government Website
- Wikipedia: https://en.wikipedia.org/wiki/Emblem_of_Jharkhand
- Wikimedia Commons: Government emblems

### Logo Usage in App
The logo is used in:
- Login pages (large with text)
- Header navigation (small, icon only)
- Government portal pages
- App manifest for PWA installation

### Technical Details
- Component: `src/components/JharkhandLogo.js`
- Props: `size` (number), `showText` (boolean)
- Fallback: Shows "JH" in orange circle if logo fails to load
- Supports both English and Hindi text