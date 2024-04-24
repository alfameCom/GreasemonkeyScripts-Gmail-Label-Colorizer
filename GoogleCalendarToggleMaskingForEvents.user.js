// ==UserScript==
// @name         Toggle Masking for Google Calendar Events
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Toggle the content masking of calendar events with an eye icon
// @match        *://calendar.google.com/*
// @updateURL 	https://github.com/alfameCom/GreasemonkeyScripts-QOL-collection/edit/main/GoogleCalendarToggleMaskingForEvents.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let maskingEnabled = false;

    function updateEventText(element) {
        if (!maskingEnabled) return;

        const originalText = element.textContent;
        const timePattern = /\b\d{2}:\d{2}(?: to | – )\d{2}:\d{2}\b/g;
        let newText = 'VARATTU';

        const times = [];
        let match;
        while ((match = timePattern.exec(originalText)) !== null) {
            times.push(match[0]);
        }
        if (times.length > 0) {
            newText = times.join(', ') + ' - ' + newText;
        }

        if (element.textContent !== newText) {
            element.textContent = newText;
        }
    }

    function createToggleButton() {
        const toggleBtn = document.createElement('div');
        toggleBtn.innerHTML = maskingEnabled ? '🙈' : '🙉';
        toggleBtn.style.cssText = 'position: fixed; bottom: 20px; left: 20px; z-index: 1000; font-size: 36px; cursor: pointer;';
        toggleBtn.title = 'Toggle event masking';

        toggleBtn.addEventListener('click', () => {
            maskingEnabled = !maskingEnabled;
            toggleBtn.innerHTML = maskingEnabled ? '🙈' : '🙉';
            document.querySelectorAll('.NlL62b.GTG3wb.elYzab-cXXICe-Hjleke').forEach(el => {
                if (maskingEnabled) {
                    updateEventText(el);
                } else {
                    el.textContent = el.dataset.originalText || el.textContent;
                }
            });
        });

        document.body.appendChild(toggleBtn);
    }

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    if (node.matches('.NlL62b.GTG3wb.elYzab-cXXICe-Hjleke') || (node.parentNode && node.parentNode.matches('.NlL62b.GTG3wb.elYzab-cXXICe-Hjleke'))) {
                        node.dataset.originalText = node.textContent;
                        updateEventText(node);
                    }
                    if (node.hasChildNodes()) {
                        const elements = node.querySelectorAll('.NlL62b.GTG3wb.elYzab-cXXICe-Hjleke');
                        elements.forEach(textElement => {
                            textElement.dataset.originalText = textElement.textContent;
                            updateEventText(textElement);
                        });
                    }
                }
            });
            
            if (mutation.type === 'characterData' && mutation.target.parentNode && mutation.target.parentNode.matches('.NlL62b.GTG3wb.elYzab-cXXICe-Hjleke')) {
                updateEventText(mutation.target.parentNode);
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: ['class', 'style', 'textContent']
    });

    createToggleButton();
})();
