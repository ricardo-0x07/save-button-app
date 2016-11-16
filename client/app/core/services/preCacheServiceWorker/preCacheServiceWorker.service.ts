/// <reference path="../../../../../typings/tsd.d.ts"/>'use strict';
const angular = require('angular');
var $: JQueryStatic = require('jquery');
var Notify = require('notifyjs').default;

export function preCacheServiceWorkerService($state, $window, $document, $http, $rootScope) {
  'ngInject';
  var isPushEnabled = false;
  var displaySubBtn = true;
  var useNotifications = false;
  var myNotification;
  var _that = this;
  var reg;

  // AngularJS will instantiate a singleton by calling "new" on this function
  return {
    _registerServiceWorker() {
      var _that = this;
      // Request permission to send user nitification if needed
      if (!Notify.needsPermission) {
      } else if (Notify.isSupported()) {
        Notify.requestPermission(_that.onPermissionGranted, _that.onPermissionDenied);
      }

      if (_that.isPushEnabled) {
        console.log('isPushEnabled');
      }
      // Check if browser supports service worker.
      if (!navigator.serviceWorker) {
        console.log('this browser does NOT support service worker');
        return;
      }
      console.log('navigator', navigator);
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
          _that.trackInstalling(serviceWorker);
        } else if (registration.waiting) {
          serviceWorker = registration.waiting;
          _that.updateReady(serviceWorker);
        } else if (registration.active) {
          serviceWorker = registration.active;
        }
        registration.onupdatefound = function () {
          console.log('updated service worker found');
          _that.trackInstalling(registration.installing);
        };
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
        console.log('oncontrollerchange');
        $state.reload();
        refreshing = true;
      };
    },
    trackInstalling(worker: ServiceWorker) {
      console.log('trackInstalling');
      var _that = this;
      worker.onstatechange = function () {
        console.log('service worker state chnaged', worker.state);
        if (worker.state === 'installed') {
          _that.updateReady(worker);
        }
      };
    },
    updateReady(worker: ServiceWorker) {
      console.log('updateready');
      $rootScope.$broadcast('updateready');
      $rootScope.$on('update_version', function () {
        worker.postMessage({action: 'skipWaiting'})
      });

    },
    displaySubBtnFn() {
      var _that = this;
      return displaySubBtn;
    },
    regReady(reg) {
      return new Promise((resolve, reject) => {
        if (reg.active) {
          return resolve(reg);
        }

        if (!reg.installing && !reg.waiting) {
          return reject(Error('Install failed'));
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
      var _that = this;
      // Are Notifications supported in the service worker?  
      if (!(reg.showNotification)) {
        console.log('Notifications aren\'t supported on service workers.');
        useNotifications = false;
      } else {
        useNotifications = true;
      }
      // console.log("if (Notify.permission === 'denied') {");
      // Check the current Notification permission.  
      // If its denied, it's a permanent block until the  
      // user changes the permission  
      if (Notify.permission === 'denied') {
        console.log('The user has blocked notifications.');
        return;
      }
      // Check if push messaging is supported  
      if (!('PushManager' in $window)) {
        console.log('Push messaging isn\'t supported.');
        return;
      }

      // We need the service worker registration to check for a subscription  
      _that.regReady(reg).then(function (reg) {
        // Do we already have a push message subscription?  
        reg.pushManager.getSubscription()
          .then(function (subscription: any) {
            // Enable any UI which subscribes / unsubscribes from  
            // push messages.  

            displaySubBtn = true;
            _that.displaySubBtnFn();

            if (!subscription) {
              console.log('Not yet subscribed to Push')
              // We aren't subscribed to push, so set UI  
              // to allow the user to enable push  
              return;
            }

            // Set your UI to show they have subscribed for  
            // push messages  
            _that.isPushEnabled = true;

            // initialize status, which includes setting UI elements for subscribed status
            // and updating Subscribers list via push
            var endpoint = subscription.endpoint;
            // var key = subscription.getKey('p256dh');
            var pushSubscription = JSON.stringify(subscription);
            _that.updateStatus(pushSubscription, 'init');
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

      displaySubBtn = false;

      _that.regReady(reg).then(function (reg: any) {
        reg.pushManager.subscribe({ userVisibleOnly: true })
          .then(function (subscription) {
            var pushSubcription: any = JSON.stringify(subscription);
            // The subscription was successful
            _that.isPushEnabled = true;
            displaySubBtn = true;

            // Update status to subscribe current user on server, and to let
            // other users know this user has subscribed
            var endpoint = pushSubcription.endpoint;
            var keys = pushSubcription.keys;
            _that.updateStatus(pushSubcription, 'subscribe');
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
            }
          });
      });
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
      displaySubBtn = false;

      _that.regReady(reg).then(function (reg) {
        // To unsubscribe from push messaging, you need get the
        // subcription object, which you can call unsubscribe() on.
        reg.pushManager.getSubscription().then(
          function (subscription: any) {

            // Update status to unsubscribe current user from server (remove details)
            // and let other subscribers know they have unsubscribed  
            var endpoint = subscription.endpoint;
            var pushSubscription = JSON.stringify(subscription);
            _that.updateStatus(pushSubscription, 'unsubscribe');

            // Check we have a subscription to unsubscribe
            if (!subscription) {
              // No subscription object, so set the state
              // to allow the user to subscribe to push
              _that.isPushEnabled = false;
              displaySubBtn = true;
              return;
            }

            _that.isPushEnabled = false;

            // setTimeout used to stop unsubscribe being called before the message
            // has been sent to everyone to tell them that the unsubscription has
            // occurred, including the person unsubscribing. This is a dirty
            // hack, and I'm probably going to hell for writing this.
            setTimeout(function () {
              // We have a subcription, so call unsubscribe on it
              subscription.unsubscribe().then(function (successful) {
                displaySubBtn = true;
                _that.isPushEnabled = false;
              }).catch(function (e) {
                // We failed to unsubscribe, this can lead to
                // an unusual state, so may be best to remove
                // the subscription id from your data store and
                // inform the user that you disabled push

                console.log('Unsubscription error: ', e);
                displaySubBtn = true;
              })
            }, 3000);
          }).catch(function (e) {
            console.log('Error thrown while unsubscribing from ' +
              'push messaging.', e);
          });
      });
    },
    postSubscribeObj(subscription, statusType) {
      var pushSubscription = JSON.parse(subscription);
      console.log('pushSubscription.keys', pushSubscription['keys']);
      // Create a new XHR and send an array to the server containing
      // the type of the request, the name of the user subscribing, 
      // and the push subscription endpoint + key the server needs
      // to send push messages
      console.log('send subcription request to server');

      var sub = {
        statusType: statusType,
        name: 'name',
        endpoint: pushSubscription.endpoint,
        p256dh: pushSubscription.keys.p256dh,
        auth: pushSubscription.keys.auth,
        subscription: subscription
      }
      $http.post('/api/subscriptions', sub)
        .then(function (response) {
        });

    },

    updateStatus(pushSubscription, statusType) {
      console.log("updateStatus, pushSubscription: " + pushSubscription);
      // If we are subscribing to push
      if (statusType === 'subscribe' || statusType === 'init') {
        this.postSubscribeObj(pushSubscription, statusType);

      } else if (statusType === 'unsubscribe') {
        this.postSubscribeObj(pushSubscription, statusType);
      }
    },
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
    },
    onPermissionDenied() {
      console.warn('Permission has been denied by the user');
    },
    isPushEnabled: false,

    notifyMe() {
      var _that = this;
      console.log('subcription button clicked');
      if (_that.isPushEnabled) {
        _that.unsubscribe();
      } else {
        _that.subscribe();
      }
    }
  }
}

export default angular.module('saveButtonAppApp.preCacheServiceWorker', ['ui-notification'])
  .service('preCacheServiceWorker', preCacheServiceWorkerService)
  .name;
