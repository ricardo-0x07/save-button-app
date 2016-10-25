'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('newOpportunity', {
      url: '/new/opportunity',
      template: '<new-opportunity></new-opportunity>'
    });
}
