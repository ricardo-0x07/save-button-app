const angular = require('angular');
const uiRouter = require('angular-ui-router');
const upload = require('angular-base64-upload');
import routing from './main.routes';
const lodash = require('lodash');
// var canvas = document.querySelector('canvas');
import photoCaptureService from '../core/services/photoCapture/photoCapture.service';
export class MainController {
  $http;
  preCacheServiceWorker;
  socket;
  awesomeOpportunities = [];
  newOpportunity = '';
  image = {};
  showToast;
  public File = {};
  public canvas;
  public img;

  /*@ngInject*/
  constructor($http. public $timeout, public $rootScope, public $scope, socket, preCacheServiceWorker, public photoCapture) {
    var _that = this;
    this.$http = $http;
    this.socket = socket;
    this.preCacheServiceWorker = preCacheServiceWorker;
    _that.showToast = false;
    this.canvas = document.querySelector('canvas');
    this.img = document.querySelector('img#photo-op')
 
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
  updateFile() {
    console.log("canvas.toDataURL('image/webp')", this.canvas.toDataURL('image/webp'));
    console.log('update $ctrl.File');
    var data = this.canvas.toDataURL('image/webp');
    var replace = 'data:image/webp;base64,';
    var base64 = data.replace(replace, '');
    console.log('base64', base64);
    this.File.filename = 'photo';
    this.File.filetype = 'image/webp';
    this.File.filesize = 'photo';
    this.File.base64 = base64;
    console.log('this.File', this.File);
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
        // _that.i
      });
    this.newOpportunity = '';
  }
}
getImage(data) {
  // console.log('data', data);
  if (data && data.base64 && data.filetype) {
    var filetype = data.filetype ? data.filetype : ''
    var base64 = data.base64 ? data.base64 : ''
    return 'data:' + filetype + ';base64,' + base64;
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

export default angular.module('saveButtonAppApp.main', [photoCaptureService,
  uiRouter, upload])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
