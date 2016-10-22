const angular = require('angular');
const uiRouter = require('angular-ui-router');
const upload = require('angular-base64-upload');
import routing from './main.routes';
const lodash = require('lodash');

export class MainController {
  $http;
  preCacheServiceWorker;
  socket;
  awesomeOpportunities = [];
  newOpportunity = '';
  image = {};
  public showToast: boolean = false;
  public File;

  /*@ngInject*/
  constructor($http, $rootScope, $scope, socket, preCacheServiceWorker) {
    var _that = this;
    this.$http = $http;
    this.socket = socket;
    this.preCacheServiceWorker = preCacheServiceWorker;
    $rootScope.$on('updateready', function () {
      _that.showToast = true;
      console.log('_that.showToast', _that.showToast);
      console.log('toast update ready event');
    });

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('opportunity');
    });
  }

  $onInit() {
    this.$http.get('/api/opportunities').then(response => {
      this.awesomeOpportunities = response.data;
      console.log('this.awesomeOpportunities', this.awesomeOpportunities);
      this.socket.syncUpdates('opportunity', this.awesomeOpportunities);
    });
  }

  addOpportunities() {
    console.log('this.newOpportunity', this.newOpportunity);
    if (this.newOpportunity) {
      var newFile = {};
      newFile.name = this.File.filename;
      newFile.type = this.File.filetype;
      newFile.size = this.File.filesize;
      newFile.base64 = this.File.base64;
      this.newOpportunity.File = newFile;
      this.$http.post('/api/opportunities', this.newOpportunity)
        .then(function (response) {
          console.log('response', response);
        });
      this.newOpportunity = '';
    }
  }

  deleteOpportunity(opportunity) {
    this.$http.delete('/api/opportunities/' + opportunity._id);
  }
  getImage() {
    console.log('this.newOpportunity', this.newOpportunity);
    var imageData = 'data:' + this.newOpportunity.File.filetype + ';base64,' + this.newOpportunity.File.base64;
    console.log('imageData', imageData);
    return imageData;
  }
}

export default angular.module('saveButtonAppApp.main', [
  uiRouter, upload])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
