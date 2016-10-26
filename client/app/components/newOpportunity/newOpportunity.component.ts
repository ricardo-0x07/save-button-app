'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './newOpportunity.routes';

export class NewOpportunityComponent {
  newOpportunity = '';
  image = {};
  public img;
  public File;

  /*@ngInject*/
  constructor($scope, private $http, public $stateParams) {
    this.img = document.querySelector('img#photo-op')
    console.log('this', this);
    console.log('$scope', $scope);
    console.log('$stateParams.File', $stateParams.File);
    this.File = this.$stateParams.File;
  }
  addOpportunities() {
    var _that = this;
    console.log('this.newOpportunity', this.newOpportunity);
    if (this.newOpportunity) {
      var newFile: any = {};
      newFile.name = this.File.filename;
      newFile.type = this.File.filetype;
      newFile.size = this.File.filesize;
      newFile.base64 = this.File.base64;
      this.newOpportunity.File = newFile;
      this.$http.post('/api/opportunities', this.newOpportunity)
        .then(function (response) {
          console.log('response', response);
          _that.File = {};
        });
      this.newOpportunity = '';
    }
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
}

export default angular.module('saveButtonAppApp.newOpportunity', [uiRouter])
  .config(routes)
  .component('newOpportunity', {
    template: require('./newOpportunity.html'),
    controller: NewOpportunityComponent
  })
  .name;
