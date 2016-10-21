/// <reference path="../../../../../typings/tsd.d.ts"/>'use strict';
const angular = require('angular');
var $: JQueryStatic = require('jquery');
var Notify = require('notifyjs').default;

export function preCacheServiceWorkerService($state, $window, $document) {
  'ngInject';
  var isPushEnabled = false;
  var displaySubBtn = true;
  var useNotifications = false;
  var myNotification;
  var _that = this;
  var reg;

  var subBtn = $document.find('subscribe');
  subBtn.prop('disabled', true);

  console.log('subBtn', subBtn);
  // var myNotification = new Notify('Yo dawg!', {
  //   body: 'This is an awesome notification',
  //   notifyShow: onNotifyShow
  // });

  // function onNotifyShow() {
  //   console.log('notification was shown!');
  // }
  // AngularJS will instantiate a singleton by calling "new" on this function
  return {
    _registerServiceWorker() {
      var _that = this;
      // if (Notify.isSupported()) {
      //   Notify.requestPermission();
      // }

      // Request permission to send user nitification if needed
      if (!Notify.needsPermission) {
        this.doNotification();
      } else if (Notify.isSupported()) {
        Notify.requestPermission(_that.onPermissionGranted, _that.onPermissionDenied);
      }

      // myNotification.show();

      if (isPushEnabled) {
        console.log('isPushEnabled');
      }
      console.log("subBtn.on('click', function () {");
      // subBtn.on('click', function () {
      //   console.log('subcription button clicked');
      //   if (isPushEnabled) {
      //     _that.unsubscribe();
      //   } else {
      //     _that.subscribe();
      //   }
      // });
      // console.log('subBtn', subBtn)

      // Check if browser supports service worker.
      if (!navigator.serviceWorker) {
        console.log('this browser does NOT support service worker');
        return;
      }
      // Register service worker 
      navigator.serviceWorker.register('my-service-worker.js').then(function (registration: ServiceWorkerRegistration) {
        reg = registration;
        // At this point, registration has taken place.
        // The service worker will not handle requests until this page and any
        // other instances of this page (in other tabs, etc.) have been
        // closed/reloaded.
        var serviceWorker: ServiceWorker;
        if (!navigator.serviceWorker.controller) {
          return;
        }

        if (registration.installing) {
          serviceWorker = registration.installing;
        } else if (registration.waiting) {
          serviceWorker = registration.waiting;
        } else if (registration.active) {
          serviceWorker = registration.active;
        }
        if (serviceWorker) {
          // console.log(serviceWorker.state);
          serviceWorker.onstatechange = function (e: any) {
            // console.log(e.target.state);
          };
        }

        registration.onupdatefound = function () {
          console.log('updated service worker found');
        };
        console.log('_that.initialiseState(registration);');
        console.log('this', this);
        _that.initialiseState(registration);
      }).catch(function () {
        console.log('registration failed');
      });

      // Ensure refresh is only called once.
      // This works around a bug in "force update on reload".
      var refreshing;
      navigator.serviceWorker.oncontrollerchange = () => {
        if (refreshing) {
          return;
        }
        $state.reload();
        refreshing = true;
      };
    },
    // displaySubBtn: false,
    displaySubBtnFn() {
      var _that = this;
      console.log('btnFn displaySubBtn', displaySubBtn);
      return displaySubBtn;
    },
    regReady(reg) {
      return new Promise((resolve, reject) => {
        if (reg.active) {
          // resolve();
          return resolve(reg);
        }

        if (!reg.installing && !reg.waiting) {
          return reject(Error('Install failed'));
          // return;
        }

        (reg.installing || reg.waiting).addEventListener('statechange', function () {
          if (this.state == 'redundant') {
            return reject(Error('Install failed'));
          } else if (this.state == 'activated') {
            return resolve(reg);
          }
        });
      });
    },
    // Once the service worker is registered set the initial state  
    initialiseState(reg) {
      console.log('reg', reg);
      var _that = this;
      console.log('initialiseState(reg: any) {');
      // var _that = this;
      // Are Notifications supported in the service worker?  
      if (!(reg.showNotification)) {
        console.log('Notifications aren\'t supported on service workers.');
        useNotifications = false;
      } else {
        useNotifications = true;
      }
      console.log("if (Notify.permission === 'denied') {");
      // Check the current Notification permission.  
      // If its denied, it's a permanent block until the  
      // user changes the permission  
      if (Notify.permission === 'denied') {
        console.log('The user has blocked notifications.');
        return;
      }
      console.log("if (!('PushManager' in $window)) {");
      // Check if push messaging is supported  
      if (!('PushManager' in $window)) {
        console.log('Push messaging isn\'t supported.');
        return;
      }

      console.log('navigator.serviceWorker.ready');
      // We need the service worker registration to check for a subscription  
      _that.regReady(reg).then(function (reg) {
        console.log('reg.pushManager.getSubscription()');
        // Do we already have a push message subscription?  
        reg.pushManager.getSubscription()
          .then(function (subscription: any) {
            // Enable any UI which subscribes / unsubscribes from  
            // push messages.  

            // subBtn.prop('disabled', false);
            console.log('displaySubBtn = true;');
            displaySubBtn = true;
            _that.displaySubBtnFn();
            console.log('displaySubBtn', displaySubBtn);

            if (!subscription) {
              console.log('Not yet subscribed to Push')
              // We aren't subscribed to push, so set UI  
              // to allow the user to enable push  
              return;
            }

            // Set your UI to show they have subscribed for  
            // push messages  
            // subBtn.textContent = 'Unsubscribe from Push Messaging';
            isPushEnabled = true;

            // initialize status, which includes setting UI elements for subscribed status
            // and updating Subscribers list via push
            console.log(subscription.toJSON());
            var endpoint = subscription.endpoint;
            var key = subscription.getKey('p256dh');
            console.log(key);
            _that.updateStatus(endpoint, key, 'init');
          })
          .catch(function (err) {
            console.log('Error during getSubscription()', err);
          });

        // set up a message channel to communicate with the SW
        var channel = new MessageChannel();
        channel.port1.onmessage = function (e) {
          console.log(e);
          _that.handleChannelMessage(e.data);
        }

        var mySW = reg.active;
        mySW.postMessage('hello', [channel.port2]);
      });
    },
    subscribe() {
      var _that = this;
      // Disable the button so it can't be changed while
      // we process the permission request

      // subBtn.prop('disabled', true);
      displaySubBtn = false;

      _that.regReady(reg).then(function (reg: any) {
        reg.pushManager.subscribe({ userVisibleOnly: true })
          .then(function (subscription) {
            console.log('subscription', subscription);
            // The subscription was successful
            isPushEnabled = true;
            // subBtn.textContent = 'Unsubscribe from Push Messaging';
            // subBtn.prop('disabled', false);
            displaySubBtn = true;

            // Update status to subscribe current user on server, and to let
            // other users know this user has subscribed
            var endpoint = subscription.endpoint;
            var key = subscription.getKey('p256dh');
            _that.updateStatus(endpoint, key, 'subscribe');
          })
          .catch(function (e) {
            if ($window.Notification.permission === 'denied') {
              // The user denied the notification permission which
              // means we failed to subscribe and the user will need
              // to manually change the notification permission to
              // subscribe to push messages
              console.log('Permission for Notifications was denied');

            } else {
              // A problem occurred with the subscription, this can
              // often be down to an issue or lack of the gcm_sender_id
              // and / or gcm_user_visible_only
              console.log('Unable to subscribe to push.', e);
              // subBtn.prop('disabled', false);
              displaySubBtn = true;
              subBtn.textContent = 'Subscribe to Push Messaging';
            }
          });
      });
      //   }
      // });  
    },
    sendSubscriptionToServer(subscription) {
      // TODO: Send the subscription.endpoint
      // to your server and save it to send a
      // push message at a later date
      //
      // For compatibly of Chrome 43, get the endpoint via
      // endpointWorkaround(subscription)
      console.log('TODO: Implement sendSubscriptionToServer()');
    },
    unsubscribe() {
      var _that = this;
      // subBtn.disabled = true;
      displaySubBtn = false;

      _that.regReady(reg).then(function (reg) {
        // To unsubscribe from push messaging, you need get the
        // subcription object, which you can call unsubscribe() on.
        reg.pushManager.getSubscription().then(
          function (subscription: any) {

            // Update status to unsubscribe current user from server (remove details)
            // and let other subscribers know they have unsubscribed  
            var endpoint = subscription.endpoint;
            var key = subscription.getKey('p256dh');
            _that.updateStatus(endpoint, key, 'unsubscribe');

            // Check we have a subscription to unsubscribe
            if (!subscription) {
              // No subscription object, so set the state
              // to allow the user to subscribe to push
              isPushEnabled = false;
              // subBtn.prop('disabled', false);
              displaySubBtn = true;
              subBtn.textContent = 'Subscribe to Push Messaging';
              return;
            }

            isPushEnabled = false;

            // setTimeout used to stop unsubscribe being called before the message
            // has been sent to everyone to tell them that the unsubscription has
            // occurred, including the person unsubscribing. This is a dirty
            // hack, and I'm probably going to hell for writing this.
            setTimeout(function () {
              // We have a subcription, so call unsubscribe on it
              subscription.unsubscribe().then(function (successful) {
                // subBtn.prop('disabled', false);
                displaySubBtn = true;
                subBtn.textContent = 'Subscribe to Push Messaging';
                isPushEnabled = false;
              }).catch(function (e) {
                // We failed to unsubscribe, this can lead to
                // an unusual state, so may be best to remove
                // the subscription id from your data store and
                // inform the user that you disabled push

                console.log('Unsubscription error: ', e);
                // subBtn.prop('disabled', false);
                displaySubBtn = true;
              })
            }, 3000);
          }).catch(function (e) {
            console.log('Error thrown while unsubscribing from ' +
              'push messaging.', e);
          });
      });
    },
    postSubscribeObj(statusType, name, endpoint, key) {
      // Create a new XHR and send an array to the server containing
      // the type of the request, the name of the user subscribing, 
      // and the push subscription endpoint + key the server needs
      // to send push messages
      console.log('send subcription request to server');
      // var request = new XMLHttpRequest();

      // request.open('POST', 'https://127.0.0.1:7000');
      // request.setRequestHeader('Content-Type', 'application/json');

      // var subscribeObj = {
      //   statusType: statusType,
      //   name: nameInput.value,
      //   endpoint: endpoint,
      //   key: btoa(String.fromCharCode.apply(null, new Uint8Array(key)))
      // }
      // console.log(subscribeObj);
      // request.send(JSON.stringify(subscribeObj));
    },

    updateStatus(endpoint, key, statusType) {
      console.log("updateStatus, endpoint: " + endpoint);
      console.log("updateStatus, key: " + key);

      // If we are subscribing to push
      if (statusType === 'subscribe' || statusType === 'init') {
        // // Create the input and button to allow sending messages
        // sendBtn = document.createElement('button');
        // sendInput = document.createElement('input');

        // sendBtn.textContent = 'Send Chat Message';
        // sendInput.setAttribute('type', 'text');
        // // Append them to the document
        // controlsBlock.appendChild(sendBtn);
        // controlsBlock.appendChild(sendInput);

        // // Set up a listener so that when the Send Chat Message button is clicked,
        // // the sendChatMessage() function is fun, which handles sending the message 
        // sendBtn.onclick = function () {
        //   sendChatMessage(sendInput.value);
        // }

        this.postSubscribeObj(statusType, name, endpoint, key);

      } else if (statusType === 'unsubscribe') {
        // If we are unsubscribing from push

        // Remove the UI elements we added when we subscribed
        // controlsBlock.removeChild(sendBtn);
        // controlsBlock.removeChild(sendInput);

        this.postSubscribeObj(statusType, name, endpoint, key);

      }

    },

    handleChannelMessage(data) {
      console.log('handleChannelMessage');
      // if (data.action === 'subscribe' || data.action === 'init') {
      //   var listItem = document.createElement('li');
      //   listItem.textContent = data.name;
      //   subscribersList.appendChild(listItem);
      // } else if (data.action === 'unsubscribe') {
      //   for (i = 0; i < subscribersList.children.length; i++) {
      //     if (subscribersList.children[i].textContent === data.name) {
      //       subscribersList.children[i].parentNode.removeChild(subscribersList.children[i]);
      //     }
      //   }
      //   nameInput.disabled = false;
      // } else if (data.action === 'chatMsg') {
      //   var listItem = document.createElement('li');
      //   listItem.textContent = data.name + ": " + data.msg;
      //   messagesList.appendChild(listItem);
      //   sendInput.value = '';
      // }
    },
    // isPushEnabled() {
    //   return isPushEnabled
    // },
    onShowNotification() {
      console.log('notification is shown!');
    },
    onCloseNotification() {
      console.log('notification is closed!');
      myNotification.show();
    },
    onClickNotification() {
      console.log('notification was clicked!');
    },
    onErrorNotification() {
      console.error('Error showing notification. You may need to request permission.');
    },
    onPermissionGranted() {
      console.log('Permission has been granted by the user');
      _that.doNotification();
    },
    onPermissionDenied() {
      console.warn('Permission has been denied by the user');
    },
    doNotification() {
      myNotification = new Notify('Yo dawg!', {
        body: 'This is an awesome notification',
        tag: 'My unique id',
        notifyShow: _that.onShowNotification,
        notifyClose: _that.onCloseNotification,
        notifyClick: _that.onClickNotification,
        notifyError: _that.onErrorNotification,
        renotify: true,
        timeout: 4
      });
      myNotification.show();
    },
    isPushEnabled: false,

    notifyMe() {
      var _that = this;
      console.log('subcription button clicked');
      if (isPushEnabled) {
        _that.unsubscribe();
      } else {
        _that.subscribe();
      }

      // var myNotification;
      // function onShowNotification() {
      //   console.log('notification is shown!');
      // }
      // function onCloseNotification() {
      //   console.log('notification is closed!');
      //   myNotification.show();
      // }
      // function onClickNotification() {
      //   console.log('notification was clicked!');
      // }
      // function onErrorNotification() {
      //   console.error('Error showing notification. You may need to request permission.');
      // }
      // function onPermissionGranted() {
      //   console.log('Permission has been granted by the user');
      //   doNotification();
      // }
      // function onPermissionDenied() {
      //   console.warn('Permission has been denied by the user');
      // }
      // // var Notify = window.Notify.default;
      // function doNotification() {
      //   myNotification = new Notify('Yo dawg!', {
      //     body: 'This is an awesome notification',
      //     tag: 'My unique id',
      //     notifyShow: onShowNotification,
      //     notifyClose: onCloseNotification,
      //     notifyClick: onClickNotification,
      //     notifyError: onErrorNotification,
      //     renotify: true,
      //     timeout: 4
      //   });
      //   myNotification.show();
      // }
      // if (!Notify.needsPermission) {
      //   _that.doNotification();
      // } else if (Notify.isSupported()) {
      //   Notify.requestPermission(_that.onPermissionGranted, _that.onPermissionDenied);
      // }
    }
  }
}

export default angular.module('saveButtonAppApp.preCacheServiceWorker', [])
  .service('preCacheServiceWorker', preCacheServiceWorkerService)
  .name;
