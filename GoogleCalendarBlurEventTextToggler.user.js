// ==UserScript==
// @name         Blur Text in Google Calendar Events with Toggle
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Blurs only the text content of calendar events in Google Calendar, with a toggle to turn the blurring on and off
// @match        *://calendar.google.com/*
// @updateURL    https://github.com/alfameCom/GreasemonkeyScripts-QOL-collection/edit/main/GoogleCalendarBlurEventTextToggler.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let blurEnabled = false;

    const style = document.createElement('style');
    document.head.appendChild(style);
    let styleSheetIndex = style.sheet.insertRule('.NlL62b.GTG3wb.elYzab-cXXICe-Hjleke span { filter: none; }', 0);

    function createToggleButton() {
        const toggleBtn = document.createElement('div');
        toggleBtn.innerHTML = blurEnabled ? '🙈' : '🙉';
        toggleBtn.style.cssText = 'position: fixed; bottom: 20px; left: 20px; z-index: 1000; font-size: 36px; cursor: pointer;';
        toggleBtn.title = 'Toggle text blurring';

        toggleBtn.addEventListener('click', () => {
            blurEnabled = !blurEnabled;
            toggleBtn.innerHTML = blurEnabled ? '🙈' : '🙉';
            updateBlurEffect();
        });

        document.body.appendChild(toggleBtn);
    }

    function updateBlurEffect() {
        if (blurEnabled) {
            style.sheet.deleteRule(styleSheetIndex);
            styleSheetIndex = style.sheet.insertRule('.NlL62b.GTG3wb.elYzab-cXXICe-Hjleke span { filter: blur(4px); }', 0);
        } else {
            style.sheet.deleteRule(styleSheetIndex);
            styleSheetIndex = style.sheet.insertRule('.NlL62b.GTG3wb.elYzab-cXXICe-Hjleke span { filter: none; }', 0);
        }
    }

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const textElements = node.querySelectorAll('.NlL62b.GTG3wb.elYzab-cXXICe-Hjleke .ynRLnc');
                        textElements.forEach(textElement => {
                            textElement.style.filter = blurEnabled ? 'blur(4px)' : 'none';
                        });
                    }
                });
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    createToggleButton();
})();
