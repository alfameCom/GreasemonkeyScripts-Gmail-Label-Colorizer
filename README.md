# Greasemonkey Scripts - QOL Collection

This repository is a curated collection of Greasemonkey scripts designed to enhance and improve the quality of life while browsing the web. Each script aims to address specific annoyances or add useful functionalities to websites.

## How to Install Scripts

To use scripts from this collection, you will need a user script manager extension such as Greasemonkey for Firefox or Tampermonkey for Chrome and other Chromium-based browsers.

### Installing a Script

1. Choose the script you want to install from this collection.
2. Click on the "Raw" button next to the script file on GitHub. This action should prompt the user script manager to open an installation window.
3. Review the script code to ensure it's safe and meets your needs, then confirm the installation by following the prompts provided by your user script manager.

## How to Enable Automatic Updates

Scripts in this collection can be automatically updated if the `@updateURL` metadata is included in the script header and points to the raw URL of the script hosted on GitHub or a similar service.

### Ensuring Your Script is Updatable

Make sure the script includes the `@updateURL` metadata in its header, like so:

```javascript
// ==UserScript==
// @name         Your Script Name Here
// @description  Brief description of what the script does.
// @version      1.0
// @updateURL    https://raw.githubusercontent.com/YourGitHubUsername/YourRepositoryName/main/YourScriptName.user.js
// ==/UserScript==
```

With @updateURL specified, the user script manager will check the provided URL for updates, allowing you to automatically receive the latest version of the script.

### Contributing

If you have improvements or new scripts to add to the collection, feel free to fork the repository, commit your changes, and submit a pull request.

### Disclaimer

Scripts are provided "as is", without warranty of any kind. Users should review the scripts before installation to ensure they do not interfere with their browsing experience or pose security risks.
