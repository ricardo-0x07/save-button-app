'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('newOpportunityCamera', {
      url: '/new/opportunity/camera',
      template: '<new-opportunity-camera></new-opportunity-camera>'
    });
}
