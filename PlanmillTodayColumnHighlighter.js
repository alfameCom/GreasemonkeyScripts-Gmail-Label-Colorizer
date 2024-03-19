// ==UserScript==
// @name         Planmill Today Column Highlighter
// @version      1.1
// @description  Highlight the column from 'today' element to a specified link with adjustment
// @match        *://online.planmill.com/*
// @grant        none
// @run-at       document-end
// @updateURL    https://raw.githubusercontent.com/alfameCom/GreasemonkeyScripts-QOL-collection/main/PlanmillTodayColumnHighlighter.js
// ==/UserScript==

(function() {
    'use strict';

    const startElement = document.querySelector('th.today');
    const endElement = document.querySelector('td.center.today');

    if (startElement && endElement) {
        const startRect = startElement.getBoundingClientRect();
        const endRect = endElement.getBoundingClientRect();
        
        const adjustment = 20;
        const highlightHeight = endRect.bottom - startRect.top - adjustment;
        
        const highlightDiv = document.createElement('div');
        highlightDiv.style.position = 'fixed';
        highlightDiv.style.left = `${startRect.left}px`;
        highlightDiv.style.top = `${startRect.top + window.scrollY}px`;
        highlightDiv.style.width = `${startRect.width}px`;
        highlightDiv.style.height = `${highlightHeight}px`;
        highlightDiv.style.backgroundColor = 'rgba(255, 255, 0, 0.2)';
        highlightDiv.style.zIndex = '899';
        highlightDiv.style.pointerEvents = 'none';

        document.body.appendChild(highlightDiv);
    }
})();
