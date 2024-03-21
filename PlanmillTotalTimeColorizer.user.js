// ==UserScript==
// @name         Planmill Specific Column Highlighter Based on Hours with Enhanced DOM Observing
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Highlight specific columns based on the hours from the 'timesheet-totals' table, handling dynamic content more effectively.
// @author       You
// @match        *://online.planmill.com/*
// @grant        none
// @run-at       document-end
// @updateURL    https://github.com/alfameCom/GreasemonkeyScripts-QOL-collection/edit/main/PlanmillTotalTimeColorizer.user.js
// ==/UserScript==

(function() {
    'use strict';

    const targetNode = document.getElementById('datafooter');

    if (!targetNode) {
        const bodyObserver = new MutationObserver(mutations => {
            if (document.getElementById('datafooter')) {
                bodyObserver.disconnect();
                setupDataFooterObserver();
            }
        });

        bodyObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    } else {
        setupDataFooterObserver();
    }

    function setupDataFooterObserver() {
        const dataFooterObserver = new MutationObserver(mutations => {
            const timesheetTotalsTable = document.querySelector('#timesheet-totals');
            if (timesheetTotalsTable) {
                dataFooterObserver.disconnect();
                highlightColumnsBasedOnHours();
            }
        });

        dataFooterObserver.observe(document.getElementById('datafooter'), {
            childList: true,
            subtree: true
        });
    }

    function highlightColumnsBasedOnHours() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const holidays = [
            '01.01.2024', '06.01.2024', '29.03.2024', '31.03.2024',
            '01.04.2024', '01.05.2024', '09.05.2024', '19.05.2024',
            '22.06.2024', '02.11.2024', '06.12.2024', '25.12.2024', '26.12.2024',
        ];

        document.querySelectorAll('#timesheet-totals td.center').forEach((cell, index) => {
            const a = cell.querySelector('a');
            if (!a) return;

            const dateString = a.getAttribute('onmouseover').match(/,'(\d{2}\.\d{2}\.\d{4})',/)[1];
            const [day, month, year] = dateString.split('.');
            const date = new Date(year, month - 1, day);

            if (holidays.includes(dateString) || date.getDay() === 0 || date.getDay() === 6 || date >= today) {
                return;
            }

            const hoursText = cell.textContent.trim();
            const hours = parseFloat(hoursText.replace(',', '.'));
            if (!isNaN(hours)) {
                const color = hours < 7.5 ? 'rgba(255, 0, 0, 0.2)' : 'rgba(0, 255, 0, 0.2)';
                highlightColumn(index + 7, color);
            }
        });
    }



    function highlightColumn(columnIndex, color) {
        const thElements = document.querySelectorAll(`th:nth-child(${columnIndex}), td:nth-child(${columnIndex})`);
        if (thElements.length > 0) {
            const rect = thElements[0].getBoundingClientRect();
            const highlightDiv = document.createElement('div');
            highlightDiv.style.position = 'fixed';
            highlightDiv.style.left = `${rect.left}px`;
            highlightDiv.style.top = `${rect.top + window.scrollY}px`;
            highlightDiv.style.width = `${rect.width}px`;
            highlightDiv.style.height = `${document.documentElement.scrollHeight}px`;
            highlightDiv.style.backgroundColor = color;
            highlightDiv.style.zIndex = '1000';
            highlightDiv.style.pointerEvents = 'none';
            document.body.appendChild(highlightDiv);
        } else {
            console.log(`Planmill Column Highlighter: No elements found for column ${columnIndex}, cannot highlight.`);
        }
    }
})();
