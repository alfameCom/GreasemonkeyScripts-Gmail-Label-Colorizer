// ==UserScript==
// @name         Planmill Total Time Colorizer
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Change text color to red for days with less than 7.5 hours worked, excluding holidays, weekends, and future dates.
// @author       You
// @match        *://online.planmill.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    const holidays = [
        '01.01.2024', // Uudenvuodenpäivä
        '06.01.2024', // Loppiainen
        '29.03.2024', // Pitkäperjantai
        '31.03.2024', // Pääsiäispäivä
        '01.04.2024', // 2. pääsiäispäivä
        '01.05.2024', // Vappu, Työn päivä
        '09.05.2024', // Helatorstai
        '19.05.2024', // Helluntaipäivä
        '22.06.2024', // Juhannuspäivä
        '02.11.2024', // Pyhäinpäivä
        '06.12.2024', // Itsenäisyyspäivä
        '25.12.2024', // Joulupäivä
        '26.12.2024', // Tapaninpäivä
    ];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    document.querySelectorAll('td.center').forEach(function(td) {
        const a = td.querySelector('a');
        if (!a) return;

        const dateString = a.getAttribute('onmouseover').match(/,'(\d{2}\.\d{2}\.\d{4})',/)[1];
        const hours = parseFloat(a.textContent.trim().replace(',', '.'));

        const [day, month, year] = dateString.split('.');
        const date = new Date(year, month - 1, day);

        if (holidays.includes(dateString) || date.getDay() === 0 || date.getDay() === 6 || date > today) return;

        if (hours < 7.5) {
            a.style.color = 'red';
        }
      	else a.style.color = 'green';
    });
})();
