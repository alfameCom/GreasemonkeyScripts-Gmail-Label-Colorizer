// ==UserScript==
// @name         Fill Fields from Clipboard on Icon Click
// @version      1.0
// @description  Fill effort and comment fields from clipboard data on icon click.
// @match        *://online.planmill.com/*
// @grant        none
// @run-at       document-end
// @updateURL    https://github.com/alfameCom/GreasemonkeyScripts-QOL-collection/edit/main/PlanmillFillHoursAndCommentFromClipboard.user.js
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// ==/UserScript==

(function($) {
    'use strict';

    $(document).ready(function() {
        const newIconLi = $('<li><a href="#" class="tooltipped" data-tooltip="Fill from Clipboard"><i class="mdi mdi-content-paste" style="opacity: 1;"></i></a></li>');
        $("#ts-tabs ul").append(newIconLi);

        newIconLi.click(function(event) {
            event.preventDefault();

            navigator.clipboard.readText().then(text => {
                const parts = text.split(" ");
                const hours = parts[0];
                const comment = parts.slice(2).join(" ");

                $('#normal1').val(hours).trigger('input').trigger('change');
              	$('#normal1').focus().blur();
                $('#normalc1').val(comment).trigger('input').trigger('change');
              
                console.log('Fields filled from clipboard:', { hours, comment });
            }).catch(err => {
                console.error('Error reading from clipboard:', err);
            });
        });
    });
})(jQuery);
