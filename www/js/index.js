$(document).on('ready', function (e) {
    console.log('on device ready called');
    databaseHandler.createDatabase(database.name, database.version, database.displayName);

    var lazy = lazyload();
    lazy.loadImages();

    if (!functions.hasCookie(cookienames.has_settings)) {
        functions.appDefaultSettings();
    }

    firebase.auth().getRedirectResult().then(function (result) {
        if (result.credential) {
            var user = {};
            user.name = result.user.displayName;
            user.id = result.user.uid;
            user.photoURL = result.user.photoURL;
            user.auth = result.credential.signInMethod;
            Cookies.set(cookienames.user, JSON.stringify(user));
        }
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
    });

    FCMPlugin.onNotification(function (data) {
        if (data.wasTapped) {
            //when notification received in background
        } else {
            //when received in foreground
            navigator.notification.alert(JSON.stringify(data), undefined);
        }
    });

    FCMPlugin.onTokenRefresh(function (token) {
        console.log(token);
    });
});
