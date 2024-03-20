// ==UserScript==
// @name         Context Menu for Data Extraction from Tooltip
// @version      1.0
// @description  Copy specific data from a tooltip to the clipboard using a custom context menu.
// @match        *://online.planmill.com/*/timesheet/*
// @grant        none
// @run-at       document-end
// @updateURL    https://github.com/alfameCom/GreasemonkeyScripts-QOL-collection/edit/main/PlanmillCopyCommentToClipboard.user.js
// ==/UserScript==

(function() {
    'use strict';

    const customContextMenu = document.createElement('div');
    customContextMenu.innerHTML = '<div id="copyComment">Kopioi kommentti</div>';
    customContextMenu.style.position = 'fixed';
    customContextMenu.style.zIndex = '10000';
    customContextMenu.style.backgroundColor = '#f0f0f0';
    customContextMenu.style.border = '1px solid #ccc';
    customContextMenu.style.padding = '5px';
    customContextMenu.style.display = 'none';
    document.body.appendChild(customContextMenu);

    document.addEventListener('contextmenu', function(event) {
        let target = event.target;

        if (target.matches('td[data-show-overlay="1"]')) {
            event.preventDefault();

            customContextMenu.style.left = `${event.pageX}px`;
            customContextMenu.style.top = `${event.pageY}px`;
            customContextMenu.style.display = 'block';

            document.getElementById('copyComment').onclick = function() {
                const commentText = document.querySelector('#tooltip .left.limited')?.textContent || 'Kommentti ei saatavilla';

                navigator.clipboard.writeText(commentText).then(() => {
                    console.log('Kommentti kopioitu leikepöydälle:', commentText);
                    customContextMenu.style.display = 'none';
                }).catch(err => {
                    console.error('Virhe kopioitaessa kommenttia leikepöydälle:', err);
                });
            };
        } else {
            customContextMenu.style.display = 'none';
        }
    });

    document.addEventListener('click', function() {
        customContextMenu.style.display = 'none';
    });
})();
