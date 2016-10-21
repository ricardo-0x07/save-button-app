'use strict';
const angular = require('angular');

/*@ngInject*/
export function notificationsService($window) {
  'ngInject';
  var isPushEnabled = false;
  var useNotifications = false;

  var subBtn = angular.element('.subscribe');
  if ($window.Notification && $window.Notification.permission !== "denied") {
    $window.Notification.requestPermission();
  }

  subBtn.addEventListener('click', function () {
    if (isPushEnabled) {
      unsubscribe();
    } else {
      subscribe();
    }
  });

  // AngularJS will instantiate a singleton by calling "new" on this function
}

export default angular.module('saveButtonAppApp.notifications', [])
  .service('notifications', notificationsService)
  .name;
