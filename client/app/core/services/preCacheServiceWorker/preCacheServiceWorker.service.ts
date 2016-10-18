/// <reference path="../../../../../typings/tsd.d.ts"/>'use strict';
const angular = require('angular');

export function preCacheServiceWorkerService($state) {
  'ngInject';
  // AngularJS will instantiate a singleton by calling "new" on this function
  return {
    _registerServiceWorker() {
      if (!navigator.serviceWorker) {
        console.log('this browser does NOT support service worker');
        return;
      }

      navigator.serviceWorker.register('my-service-worker.js').then(function (registration) {

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
    }
  }
}

export default angular.module('saveButtonAppApp.preCacheServiceWorker', [])
  .service('preCacheServiceWorker', preCacheServiceWorkerService)
  .name;
