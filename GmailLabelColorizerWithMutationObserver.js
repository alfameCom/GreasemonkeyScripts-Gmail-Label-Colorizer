// ==UserScript==
// @name     Gmail Label Colorizer with MutationObserver
// @version  8
// @grant    none
// @run-at   document-idle
// @match    *://mail.google.com/*
// ==/UserScript==

(function() {
    'use strict';

    const labelColors = {
	// Add your labels and suitable background colors in this format. Text color will be set to white or black depending on contrast.
	// https://mail.google.com/mail/u/0/#settings/labels
	// 'Important': '#e67e22',
    };

    function luminance(r, g, b) {
        var a = [r, g, b].map(function (v) {
            v /= 255;
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    }

    function contrast(colorHex) {
        var rgb = parseInt(colorHex.substring(1), 16);
        var r = (rgb >> 16) & 0xff;
        var g = (rgb >>  8) & 0xff;
        var b = (rgb >>  0) & 0xff;

        var colorLuminance = luminance(r, g, b);
        var blackLuminance = luminance(0, 0, 0);
        var whiteLuminance = luminance(255, 255, 255);

        var blackContrast = (colorLuminance + 0.05) / (blackLuminance + 0.05);
        var whiteContrast = (whiteLuminance + 0.05) / (colorLuminance + 0.05);

        return blackContrast > whiteContrast ? 'black' : 'white';
    }

    function colorizeLabel() {
        for (let [label, color] of Object.entries(labelColors)) {
            const menuLabels = document.querySelectorAll(`a[aria-label^="${label}"]`);

            menuLabels.forEach(menuLabel => {
                menuLabel.style.backgroundColor = color;
                menuLabel.style.setProperty('color', contrast(color), 'important');
            });

            const labels = document.querySelectorAll(`[title="${label}"]`);

            labels.forEach(label => {
                label.style.backgroundColor = color;
                const textElement = label.querySelector('.av');
                if (textElement) {
                    textElement.style.setProperty('color', contrast(color), 'important');
                }
            });
        }
    }

    colorizeLabel();
    const observer = new MutationObserver(colorizeLabel);
    observer.observe(document.body, { childList: true, subtree: true });
})();
