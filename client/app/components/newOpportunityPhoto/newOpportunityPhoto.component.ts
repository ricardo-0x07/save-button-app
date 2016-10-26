'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './newOpportunityPhoto.routes';

export class NewOpportunityPhotoComponent {
  public File;
  /*@ngInject*/
  constructor(public $stateParams, private $state) {
    this.File = this.$stateParams.File;
  }
  getImage(data) {
    console.log('data', data);
    console.log('$ctrl.File', this.File);
    if (data && data.base64 && data.filetype) {
      var filetype = data.filetype ? data.filetype : ''
      var base64 = data.base64 ? data.base64 : ''
      return 'data:' + filetype + ';base64,' + base64;
    }
    return '';
  }

  use() {
   this.$state.go('newOpportunity', {File: this.File}) 
  }
}

export default angular.module('saveButtonAppApp.newOpportunityPhoto', [uiRouter])
  .config(routes)
  .component('newOpportunityPhoto', {
    template: require('./newOpportunityPhoto.html'),
    controller: NewOpportunityPhotoComponent,
    // controllerAs: 'newOpportunityPhotoCtrl'
  })
  .name;
