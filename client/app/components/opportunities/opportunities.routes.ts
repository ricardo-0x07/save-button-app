'use strict';

export default function ($stateProvider) {
  'ngInject';
  $stateProvider
    .state('opportunities', {
      url: '/opportunities',
      template: '<opportunities></opportunities>',
    });
}
