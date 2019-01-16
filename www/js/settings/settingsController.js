define(["app", "js/settings/settingsView"], function (app, View) {
    var $ = jQuery;
    var $$ = Dom7;

    var bindings = [
        {
            element: '#restoreDefaults',
            event: 'click',
            handler: restoreDefaults
        }, {
            element: '#resetSettings',
            event: 'click',
            handler: restoreDefaults
        }
    ];

    function preparePage() {
        sermonsStaff();
        messagesStaff();
        commentsStaff();
        fontStaff();
    }

    function sermonsStaff() {
        var sermonsCount = Cookies.get(cookienames.sermons_count);
        $('#sermonsCount').val(sermonsCount);
        $('#sermonsCount').on('keyup', function () {
            sermonsCount = $(this).val();
            if (sermonsCount.length != 0) {
                Cookies.set(cookienames.sermons_count, sermonsCount);
            } else {
                Cookies.set(cookienames.sermons_count, 10);
            }
        });
    }

    function messagesStaff() {
        var messagesCount = Cookies.get(cookienames.messages_count);
        $('#messagesCount').val(messagesCount);
        $('#messagesCount').on('keyup', function () {
            messagesCount = $(this).val();
            if (messagesCount.length != 0) {
                Cookies.set(cookienames.messages_count, messagesCount);
            } else {
                Cookies.set(cookienames.messages_count, 5);
            }
        });
    }

    function commentsStaff() {
        var commentsCount = Cookies.get(cookienames.comments_count);
        $('#commentsCount').val(commentsCount);
        $('#commentsCount').on('keyup', function () {
            commentsCount = $(this).val();
            if (commentsCount.length != 0) {
                Cookies.set(cookienames.comments_count, commentsCount);
            } else {
                Cookies.set(cookienames.comments_count, 15);
            }
        });
    }

    function fontStaff() {
        var fontSize = Cookies.get(cookienames.font_size);
        $('#fontSize').val(fontSize);
        $('#fontSize').on('keyup', function () {
            fontSize = $(this).val();
            if (fontSize.length != 0) {
                Cookies.set(cookienames.font_size, fontSize);
            } else {
                Cookies.set(cookienames.font_size, 15);
            }
        });
    }

    function restoreDefaults() {
        app.f7.dialog.confirm("Are you sure you want to revert back to defaults?", messages.notice, function () {
            functions.appDefaultSettings();
            init();
        });
    }

    function init() {
        preparePage();
        View.render({
            bindings: bindings
        });
    }

    function reinit() {
        console.log('reinitialising');
    }

    function onOut() {
        console.log('settings outting');
    }


    return {
        init: init,
        onOut: onOut,
        reinit: reinit
    };
});