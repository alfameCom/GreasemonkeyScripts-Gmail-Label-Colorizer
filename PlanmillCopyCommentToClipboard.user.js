// ==UserScript==
// @name         Context Menu for Effort and Comment Text Extraction to Clipboard
// @version      1.2
// @description  Copy comment text and effort from a time entry to the clipboard using a custom context menu.
// @match        *://online.planmill.com/*/timesheet/*
// @run-at       document-end
// @updateURL    https://github.com/alfameCom/GreasemonkeyScripts-QOL-collection/edit/main/PlanmillCopyCommentToClipboard.user.js
// ==/UserScript==

(function() {
    'use strict';

    const customContextMenu = document.createElement('div');
    customContextMenu.style.position = 'fixed';
    customContextMenu.style.zIndex = '10000';
    customContextMenu.style.backgroundColor = '#f0f0f0';
    customContextMenu.style.border = '1px solid #ccc';
    customContextMenu.style.padding = '5px';
    customContextMenu.style.display = 'none';
    customContextMenu.style.cursor = 'pointer';
    document.body.appendChild(customContextMenu);

    document.addEventListener('contextmenu', function(event) {
        let target = event.target;
        if (!target.matches('td[data-show-overlay="1"], td[data-show-overlay="1"] *')) {
            return;
        }

        event.preventDefault();
        customContextMenu.innerHTML = '';

        const tooltip = document.querySelector('#tooltip');
        if (!tooltip) {
            console.error('Tooltip ei löytynyt.');
            return;
        }

        const entries = tooltip.querySelectorAll('.table tbody tr');
        entries.forEach((entry, index) => {
            let hours = entry.querySelector('td.left.bold')?.textContent.trim() || "0,00 h";
            let comment = entry.querySelector('td.left.limited')?.textContent.trim() || "Kommentti ei saatavilla";
            let clipboardText = `${hours} ${comment}`;

            let menuItem = document.createElement('div');
            menuItem.textContent = `Kopioi ${index + 1}: ${hours}, ${comment}`;
            menuItem.style.padding = '2px';
            menuItem.onclick = function() {
                navigator.clipboard.writeText(clipboardText).then(() => {
                    console.log(`Merkintä ${index + 1} kopioitu leikepöydälle:`, clipboardText);
                    customContextMenu.style.display = 'none';
                }).catch(err => {
                    console.error('Virhe kopioitaessa merkintää leikepöydälle:', err);
                });
            };
            customContextMenu.appendChild(menuItem);
        });

        customContextMenu.style.left = `${event.pageX}px`;
        customContextMenu.style.top = `${event.pageY}px`;
        customContextMenu.style.display = 'block';
    });

    document.addEventListener('click', function() {
        customContextMenu.style.display = 'none';
    });
})();

