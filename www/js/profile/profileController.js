define(["app", "js/profile/profileView"], function (app, View) {
    var $ = jQuery;
    var $$ = Dom7;
    var user = {};

    var bindings = [
        {
            element: '#facebookAuth',
            event: 'click',
            handler: facebookAuth
        }, {
            element: '#gmailAuth',
            event: 'click',
            handler: gmailAuth
        }, {
            element: '#twitterAuth',
            event: 'click',
            handler: twitterAuth
        }
    ];

    function preparePage() {
        if (functions.hasCookie(cookienames.user)) {
            console.log('has profile on it');
            user = Cookies.getJSON(cookienames.user);
            View.fillUser(user);
            console.log(user);
            $('#logOut').on('click', function () {
                firebase.auth().signOut().then(function () {
                    Cookies.set(cookienames.user, null);
                    Cookies.remove(cookienames.user);
                    app.mainView.router.refreshPage();
                }).catch(function (error) {
                    console.log(error);
                });
            });
        }else{
            console.log('doesnt have user');
        }
    }

    function handleUser(result, auth) {
        console.log(result);
        var newUser = {};
        newUser.name = result.user.displayName;
        newUser.id = result.user.uid;
        newUser.photoURL = result.user.photoURL;
        newUser.auth = auth;
        Cookies.set(cookienames.user, JSON.stringify(newUser));
        app.f7.dialog.alert(JSON.stringify(newUser));
        app.mainView.router.refreshPage();
    }

    function facebookAuth() {
        /*var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithRedirect(provider).then(function () {
            return firebase.auth().getRedirectResult();
        }).then(function (result) {
            console.log(result);
            handleUser(result, 'Facebook');
        }).catch(function (error) {
            console.log(error);
            app.f7.dialog.alert(reason.message);
        });*/
        facebookConnectPlugin.login(['public_profile'], function (userData) {
            console.log(userData);
            app.f7.dialog.alert(JSON.stringify(userData));
        }, function (error) {
            console.log(error);
            app.f7.dialog.alert(error.errorMessage);
        });
    }

    function gmailAuth() {
        /*var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider).then(function () {
            return firebase.auth().getRedirectResult();
        }).then(function (result) {
            console.log(result);
            handleUser(result, 'Gmail')
        }).catch(function (error) {
            console.log(error);
            app.f7.dialog.alert(reason.message);
        });*/
        window.plugins.googleplus.login(
            {},
            function (obj) {
                console.log(obj);
                app.f7.dialog.alert(JSON.stringify(obj));
            },
            function (msg) {
                document.querySelector("#feedback").innerHTML = "error: " + msg;
                app.f7.dialog.alert(msg);
            }
        );
    }

    function twitterAuth() {
        var provider = new firebase.auth.TwitterAuthProvider();
        firebase.auth().signInWithRedirect(provider).then(function () {
            return firebase.auth().getRedirectResult();
        }).then(function (result) {
            handleUser(result, 'Twitter');
        }).catch(function (error) {
            console.log(error);
            app.f7.dialog.alert(reason.message);
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
        console.log('about outting');
    }


    return {
        init: init,
        onOut: onOut,
        reinit: reinit
    };
});