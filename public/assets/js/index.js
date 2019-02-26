const BASE_URL = 'https://us-central1-retail-future.cloudfunctions.net/api';
// const BASE_URL = 'http://localhost:5000/test-project-2fffa/us-central1/api';
const VAPID_KEY = 'BOYJVh0rYj0SzeB2JM5osoYbr0NSEm84bY5CGfYaLlRFK2Dv7uVmPazS00KmNSz_dP9e6fK3lgQbNTbo_kY1AzA';
// [START get_messaging_object]
// Retrieve Firebase Messaging object.
const messaging = firebase.messaging();
// [END get_messaging_object]
// [START set_public_vapid_key]
// Add the public key generated from the console here.
messaging.usePublicVapidKey(VAPID_KEY);
// [END set_public_vapid_key]

// [START refresh_token]
// Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(function () {
    messaging.getToken().then(function (refreshedToken) {
        console.log('Token refreshed.');
        // Indicate that the new Instance ID token has not yet been sent to the
        // app server.
        setTokenSentToServer(false);
        // Send Instance ID token to app server.
        sendTokenToServer(refreshedToken);
        // [START_EXCLUDE]
        // Display new Instance ID token and clear UI of all previous messages.
        resetUI();
        // [END_EXCLUDE]
    }).catch(function (err) {
        console.log('Unable to retrieve refreshed token ', err);
        showToken('Unable to retrieve refreshed token ', err);
    });
});
// [END refresh_token]

// [START receive_message]
// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.setBackgroundMessageHandler` handler.
messaging.onMessage(function (payload) {
    // write a function to reset UI
    const messageJSON = JSON.parse(payload.data.payload);
    console.log("payload received", messageJSON);
    handleNotification(messageJSON);
});
// [END receive_message]


function resetUI() {
    // [START get_token]
    // Get Instance ID token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    messaging.getToken().then(function (currentToken) {
        if (currentToken) {
            console.log("current token is ", currentToken);
            sendTokenToServer(currentToken);
        } else {
            // Show permission request.
            console.log('No Instance ID token available. Request permission to generate one.');
            setTokenSentToServer(false);
        }
    }).catch(function (err) {
        console.log('An error occurred while retrieving token. ', err);
        setTokenSentToServer(false);
    });
    // [END get_token]
}

// Send the Instance ID token your application server, so that it can:
// - send messages back to this app
// - subscribe/unsubscribe the token from topics
function sendTokenToServer(currentToken) {
    if (!isTokenSentToServer()) {
        if (window.location.pathname == "/" || window.location.pathname == "/index.html"  || window.location.pathname == "/product_dashboard.html") {
            console.log("sending product page token to server");
            const tokenData = { "id": "digitalWall", "token": currentToken };
            $.post(BASE_URL + '/notification/token', tokenData, function (data2, status) {
                console.log("status", status);
                setTokenSentToServer(true); // so that token is sent everytime
            });
        }
        else if (window.location.pathname == "/retail_dashboard.html") {
            console.log("sending retail page token to server");
            const tokenData = { "id": "retailWall", "token": currentToken };
            $.post(BASE_URL + '/notification/token', tokenData, function (data2, status) {
                console.log("status", status);
                setTokenSentToServer(true);
            });
        }
        else {
            console.log("no notification required for the current page, not sending any token");
        }
    } else {
        console.log('Token already sent to server so won\'t send it again ' +
            'unless it changes');
    }

}

function isTokenSentToServer() {
    // return window.localStorage.getItem('sentToServer') === '1';
    return window.sessionStorage.getItem('sentToServer') === '1';
}

function setTokenSentToServer(sent) {
    // window.localStorage.setItem('sentToServer', sent ? '1' : '0');
    window.sessionStorage.setItem('sentToServer', sent ? '1' : '0');
}

function requestPermission() {
    console.log('Requesting permission...');
    // [START request_permission]
    messaging.requestPermission().then(function () {
        console.log('Notification permission granted.');
        // TODO(developer): Retrieve an Instance ID token for use with FCM.
        // [START_EXCLUDE]
        // In many cases once an app has been granted notification permission, it
        // should update its UI reflecting this.
        resetUI();
        // [END_EXCLUDE]
    }).catch(function (err) {
        console.log('Unable to get permission to notify.', err);
    });
    // [END request_permission]
}

function deleteToken() {
    // Delete Instance ID token.
    // [START delete_token]
    messaging.getToken().then(function (currentToken) {
        messaging.deleteToken(currentToken).then(function () {
            console.log('Token deleted.');
            setTokenSentToServer(false);
            // [START_EXCLUDE]
            // Once token is deleted update UI.
            resetUI();
            // [END_EXCLUDE]
        }).catch(function (err) {
            console.log('Unable to delete token. ', err);
        });
        // [END delete_token]
    }).catch(function (err) {
        console.log('Error retrieving Instance ID token. ', err);
        showToken('Error retrieving Instance ID token. ', err);
    });

}
// resetUI();

function handleNotification(messageJSON) {
    const notificationKey = Object.keys(messageJSON)[0];
    switch (notificationKey) {
        case "product": {
            console.log("product pickup notification");
            const productId = messageJSON.product;
            sessionStorage.setItem('productId', productId);
            if (window.location.pathname == "/" || window.location.pathname == "/index.html") {
                window.location = 'product_dashboard.html'; // to change page to product dashboard
                loadProductDetail(productId);
            }
            if (window.location.pathname == "/product_dashboard.html") {
                loadProductDetail(productId);
            }
            break;
        }
        /* case "crowdcount": {
            console.log("crowd count notification", messageJSON.crowdcount);
            const count = messageJSON.crowdcount;
            sessionStorage.setItem('crowdcount', count);
            break;
        } */
        case "salesAverage": {
            if (window.location.pathname == "/retail_dashboard.html") {
                console.log("Sales Average notification", messageJSON.salesAverage);
                setAverageSaleData(messageJSON.salesAverage); // calling retail dashboard function to change the data
            }
            break;
        }
        default: {
            console.log("Undefined notification");
            break;
        }
    }
}