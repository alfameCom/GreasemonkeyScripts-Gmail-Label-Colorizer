// ==UserScript==
// @name         Highlight Rows With Time Entries
// @version      1.0
// @description  Highlight entire rows that contain time entries in a table.
// @match        *://online.planmill.com/*
// @grant        none
// @run-at       document-end
// @updateURL    https://raw.githubusercontent.com/alfameCom/GreasemonkeyScripts-QOL-collection/main/PlanmillFilledRowsHighlighter.user.js
// ==/UserScript==

(function() {
    'use strict';

    const cellsWithDataAttribute = document.querySelectorAll('td[data-show-overlay="1"]');

    cellsWithDataAttribute.forEach(function(cell) {
        const row = cell.closest('tr');

        if (row) {
            row.style.backgroundColor = 'rgba(255, 255, 0, 0.2)';
        }
    });
})();
