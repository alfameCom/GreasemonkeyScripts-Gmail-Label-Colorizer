// ==UserScript==
// @name         Context Menu for Comment Text Extraction to Clipboard
// @version      1.1
// @description  Copy comment text from a time entry to the clipboard using a custom context menu.
// @match        *://online.planmill.com/*/timesheet/*
// @grant        none
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
    document.body.appendChild(customContextMenu);

    document.addEventListener('contextmenu', function(event) {
        customContextMenu.innerHTML = '';

        let target = event.target;

        if (target.matches('td[data-show-overlay="1"]')) {
            event.preventDefault();

            document.querySelectorAll('#tooltip .left.limited').forEach((commentElement, index) => {
                let comment = commentElement.textContent || 'Kommentti ei saatavilla';
                let menuItem = document.createElement('div');
                menuItem.textContent = `Kopioi: ${comment}`;
                menuItem.style.padding = '2px';
                menuItem.style.cursor = 'pointer';

                menuItem.onclick = function() {
                    navigator.clipboard.writeText(comment).then(() => {
                        console.log('Kommentti kopioitu leikepöydälle:', comment);
                        customContextMenu.style.display = 'none';
                    }).catch(err => {
                        console.error('Virhe kopioitaessa kommenttia leikepöydälle:', err);
                    });
                };

                customContextMenu.appendChild(menuItem);
            });

            customContextMenu.style.left = `${event.pageX}px`;
            customContextMenu.style.top = `${event.pageY}px`;
            customContextMenu.style.display = 'block';
        } else {
            customContextMenu.style.display = 'none';
        }
    });

    document.addEventListener('click', function() {
        customContextMenu.style.display = 'none';
    });
})();

