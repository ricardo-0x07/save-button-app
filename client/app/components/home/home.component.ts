'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './home.routes';

export class HomeComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('saveButtonAppApp.home', [uiRouter])
  .config(routes)
  .component('home', {
    template: require('./home.html'),
    controller: HomeComponent,
    controllerAs: 'homeCtrl'
  })
  .name;
