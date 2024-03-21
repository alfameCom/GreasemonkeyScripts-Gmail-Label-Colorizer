// ==UserScript==
// @name         Planmill Today Column Highlighter
// @version      1.2
// @description  Highlight the column from 'today' element to a specified link with adjustment
// @match        *://online.planmill.com/*
// @grant        none
// @run-at       document-end
// @updateURL    https://raw.githubusercontent.com/alfameCom/GreasemonkeyScripts-QOL-collection/main/PlanmillTodayColumnHighlighter.user.js
// ==/UserScript==

(function() {
    'use strict';

    const highlightDiv = document.createElement('div');
    document.body.appendChild(highlightDiv);
    highlightDiv.style.backgroundColor = 'rgba(255, 255, 0, 0.2)';
    highlightDiv.style.zIndex = '899';
    highlightDiv.style.pointerEvents = 'none';
    highlightDiv.style.position = 'fixed';

    function updateHighlight() {
        const startElement = document.querySelector('th.today');
        const endBoundaryElement = document.getElementById('timecard-toggle-btn');

        if (startElement && endBoundaryElement) {
            const startRect = startElement.getBoundingClientRect();
            const endBoundaryRect = endBoundaryElement.getBoundingClientRect();

            const highlightTop = startRect.top + window.scrollY;
            const highlightHeight = endBoundaryRect.top - startRect.top;

            highlightDiv.style.left = `${startRect.left}px`;
            highlightDiv.style.top = `${highlightTop}px`;
            highlightDiv.style.width = `${startRect.width}px`;
            highlightDiv.style.height = `${highlightHeight}px`;
        }
    }

    setTimeout(updateHighlight, 100);
    window.addEventListener('resize', updateHighlight);
})();
