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
  showToast;
  public File;

  /*@ngInject*/
  constructor($http. public $timeout, public $rootScope, public $scope, socket, preCacheServiceWorker) {
    var _that = this;
    this.$http = $http;
    this.socket = socket;
    this.preCacheServiceWorker = preCacheServiceWorker;
    _that.showToast = false;
    this.$rootScope.$on('updateready', function () {
      _that.showToast = true;
      console.log('_that.showToast', _that.showToast);
      console.log('toast update ready event');
      _that.$timeout(angular.noop)
    });

    this.$scope.$on('$destroy', function () {
      socket.unsyncUpdates('opportunity');
    });
  }

  $onInit() {
    this.$http.get('/api/opportunities').then(response => {
      this.awesomeOpportunities = response.data;
      // console.log('this.awesomeOpportunities', this.awesomeOpportunities);
      this.socket.syncUpdates('opportunity', this.awesomeOpportunities);
    });
  }
  showToastr() {
    // this.$rootScope.$apply();
    return this.showToast;
  }

  // if(!!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
  //     navigator.mozGetUserMedia || navigator.msGetUserMedia)) {
  //   console.log('getUserMedia() is supported in your browser');
  // } else {
  //   console.log('getUserMedia() is not supported in your browser');
  // }

addOpportunities() {
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
      });
    this.newOpportunity = '';
  }
}
getImage(data) {
  // console.log('data', data);
  if (data) {
    return 'data:' + data.filetype + ';base64,' + data.base64;
  }
  return '';
}

deleteOpportunity(opportunity) {
  this.$http.delete('/api/opportunities/' + opportunity._id);
}
  // getImage() {
  //   console.log('this.newOpportunity', this.newOpportunity);
  //   var imageData = 'data:' + this.File.filetype + ';base64,' + this.File.base64;
  //   console.log('imageData', imageData);
  //   return imageData;
  // }
}

export default angular.module('saveButtonAppApp.main', [
  uiRouter, upload])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
