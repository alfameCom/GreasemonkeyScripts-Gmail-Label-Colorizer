// ==UserScript==
// @name         Fill Fields from Clipboard on Icon Click
// @version      1.0
// @description  Fill effort and comment fields from clipboard data on icon click.
// @match        *://online.planmill.com/*
// @grant        none
// @run-at       document-end
// @updateURL    https://github.com/alfameCom/GreasemonkeyScripts-QOL-collection/edit/main/PlanmillFillHoursAndCommentFromClipboard.user.js
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('load', function() {
        const newIconLi = document.createElement('li');
        newIconLi.innerHTML = `<a href="#" class="tooltipped" data-tooltip="Fill from Clipboard"><i class="mdi mdi-content-paste" style="opacity: 1;"></i></a>`;
        document.querySelector("#ts-tabs ul").appendChild(newIconLi);

        newIconLi.addEventListener('click', function(event) {
            event.preventDefault();

            navigator.clipboard.readText().then(text => {
                const parts = text.split(" ");
                const hours = parts[0];
                const comment = parts.slice(2).join(" ");

                const effortInput = document.querySelector(".effort-input");
                const commentTextarea = document.querySelector(".commentvalue.input-field.materialize-textarea");

                if (effortInput) effortInput.value = hours;
                if (commentTextarea) commentTextarea.value = comment;

                console.log('Fields filled from clipboard:', { hours, comment });
            }).catch(err => {
                console.error('Error reading from clipboard:', err);
            });
        });
    });
})();
