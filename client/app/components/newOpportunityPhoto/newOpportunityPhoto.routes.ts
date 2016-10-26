'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('newOpportunityPhoto', {
      url: '/new/opportunity/photo',
      template: '<new-opportunity-photo></new-opportunity-photo>',
      params: {
        File: {}
      }
    });
}
