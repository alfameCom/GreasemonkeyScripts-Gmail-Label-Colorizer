// ==UserScript==
// @name         Fill Fields from Clipboard on Icon Click
// @version      1.1
// @description  Fill effort and comment fields from clipboard data on icon click.
// @match        *://online.planmill.com/*
// @run-at       document-end
// @grant        GM_addStyle
// @grant        GM_setClipboard
// @grant        GM_notification
// @grant        GM_getResourceText
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @updateURL    https://github.com/alfameCom/GreasemonkeyScripts-QOL-collection/edit/main/PlanmillFillHoursAndCommentFromClipboardTampermonkey.user.js
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// ==/UserScript==

(function($) {
    'use strict';

    $(document).ready(function() {
        const newIconLi = $('<li><a href="#" class="tooltipped" data-tooltip="Paste from Clipboard"><i class="mdi mdi-content-paste" style="opacity: 1;"></i></a></li>');
        $("#ts-tabs ul").append(newIconLi);

        newIconLi.click(function(event) {
            event.preventDefault();
            promptForClipboardText().then(text => {
                if (text === null) { // User cancelled the prompt
                    console.log('Clipboard paste cancelled by the user.');
                    return;
                }
                const parts = text.split(" ");
                const hours = parts[0];
                const comment = parts.slice(2).join(" ");

                $('#normal1').val(hours).trigger('input').trigger('change');
                $('#normal1').focus().blur();
                $('#normalc1').val(comment).trigger('input').trigger('change');

                console.log('Fields filled from clipboard:', { hours, comment });
            });
        });
    });

    function promptForClipboardText() {
        return new Promise(resolve => {
            // Simple prompt for user to paste the clipboard content
            const text = prompt("Please paste the clipboard content here:");
            resolve(text);
        });
    }
})(jQuery);
