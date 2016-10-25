'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './newOpportunityPhoto.routes';

export class NewOpportunityPhotoComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('saveButtonAppApp.newOpportunityPhoto', [uiRouter])
  .config(routes)
  .component('newOpportunityPhoto', {
    template: require('./newOpportunityPhoto.html'),
    controller: NewOpportunityPhotoComponent,
    controllerAs: 'newOpportunityPhotoCtrl'
  })
  .name;
