const angular = require('angular');
const uiRouter = require('angular-ui-router');
const upload = require('angular-base64-upload');
import routing from './main.routes';
const lodash = require('lodash');
import photoCaptureService from '../core/services/photoCapture/photoCapture.service';
export class MainController {
  $http;
  preCacheServiceWorker;
  socket;
  awesomeOpportunities = [];

  /*@ngInject*/
  constructor($http, public $timeout, public $rootScope, public $scope, socket, preCacheServiceWorker) {
    var _that = this;
    this.$http = $http;
    this.socket = socket;
    this.preCacheServiceWorker = preCacheServiceWorker;
    this.$scope.$on('$destroy', function () {
      socket.unsyncUpdates('opportunity');
    });
  }

  $onInit() {
    this.$http.get('/api/opportunities').then(response => {
      this.awesomeOpportunities = response.data;
      this.socket.syncUpdates('opportunity', this.awesomeOpportunities);
    });
  }

  deleteOpportunity(opportunity) {
    this.$http.delete('/api/opportunities/' + opportunity._id);
  }
}

export default angular.module('saveButtonAppApp.main', [photoCaptureService,
  uiRouter, upload])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
