# Greasemonkey Scripts - Gmail Label Colorizer

Gmail Label Colorizer is a Greasemonkey script designed to enhance your Gmail experience by allowing you to customize the colors of your Gmail labels in the sidebar and inbox, making it easier to organize and prioritize your emails at a glance.

## Features

- **Customize Label Colors:** Assign custom background and text colors to your Gmail labels.
- **Improved Visibility:** Make important labels stand out with bright colors, or use subtle colors for less important labels.
- **Dynamic Updates:** Script automatically updates label colors in real-time, reflecting changes as you navigate through your Gmail.

## Installation

To use the Gmail Label Colorizer script, you'll need a user script manager like Greasemonkey (for Firefox) or Tampermonkey (for Chrome).

### Steps:

1. Install Greasemonkey (Firefox) or Tampermonkey (Chrome) extension in your browser.
2. Click on the "Raw" button of the `gmail-label-colorizer.user.js` script in this repository.
3. Your user script manager should prompt you to install the script. Confirm the installation.
4. Once installed, navigate to your Gmail, and you should see your labels colored as per the script's configuration.

## Configuration

The script comes with a predefined set of labels and colors, which can be customized to fit your needs. Open the `gmail-label-colorizer.user.js` file and modify the `labelColors` object with your desired labels and colors.

Example:

```javascript
const labelColors = {
  'Atlassian': '#3498db',
  'Azure DevOps': '#9b59b6',
  'Coding/Github': '#ffffff',
  // Add more labels and their corresponding colors here
};
```

### Usage

Once installed and configured, the script runs automatically. You'll see your Gmail labels in the sidebar and inbox updated with the colors you've specified.

### Contributing

Contributions are welcome! If you'd like to improve the Gmail Label Colorizer script, please feel free to fork this repository, make your changes, and submit a pull request.

### License

This project is open-source and available under the MIT License. See the LICENSE file for more information.

### Disclaimer

This script is not affiliated with, authorized by, or in any way officially connected with Gmail or Google. The name "Gmail" and other related marks are trademarks of Google Inc.
