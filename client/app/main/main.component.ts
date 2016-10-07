const angular = require('angular');
const uiRouter = require('angular-ui-router');
const upload = require('angular-base64-upload');
import routing from './main.routes';
const lodash = require('lodash');

export class MainController {
  $http;
  socket;
  awesomeOpportunities = [];
  newOpportunity = '';
  image = {};
  public File;

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('opportunity');
    });
  }

  $onInit() {
    this.$http.get('/api/opportunities').then(response => {
      this.awesomeOpportunities = response.data;
      console.log('this.awesomeOpportunities', this.awesomeOpportunities);
      this.socket.syncUpdates('opportunity', this.awesomeOpportunities);
    })
      .then(() => {
        // this.$http.get('/api/files').then(response => {
        //   // this.awesomeOpportunities = response.data;
        //   console.log('files response', response);
        //   // this.socket.syncUpdates('opportunity', this.awesomeOpportunities);
        // });

      });
  }

  addOpportunities() {
    console.log('this.newOpportunity', this.newOpportunity);
    if (this.newOpportunity) {
      var newFile = {};
      // this.File = this.newOpportunity.File;
      newFile.name = this.File.filename;
      newFile.type = this.File.filetype;
      newFile.size = this.File.filesize;
      newFile.base64 = this.File.base64;
      this.newOpportunity.File = newFile;
      // console.log('File', File);
      // this.newOpportunity = lodash.omit(this.newOpportunity, ['File']);
      // console.log('this.newOpportunity less file: ', this.newOpportunity);
      this.$http.post('/api/opportunities', this.newOpportunity)
        // .then(function(response) {
        //   console.log('response', response);
        //   File.OpportunityId = response.data.id;
        //   return this.$http.post('/api/files', File)
        // })
        .then(function (response) {
          console.log('response', response);
        });
      this.newOpportunity = '';
    }
  }

  deleteOpportunity(opportunity) {
    this.$http.delete('/api/opportunities/' + opportunity._id);
  }

  // uploadFiles = function () {
  //   var files = angular.copy(this.files);
  //   if (this.file) {
  //     files.push(this.file);
  //   }
  // };
  onload() {
    // console.log('event', event);
    // console.log('reader', reader);
    // console.log('file', file);
    // console.log('this', this);
    // console.log('fileList', fileList);
    // console.log('fileObjs', fileObjs);
    // console.log('this.newOpportunity', this.newOpportunity);
    // console.log('$ctrl.newOpportunity', $ctrl.newOpportunity);
    // var File = this.newOpportunity['File'];
    // console.log('File', File);
    // this.image = 'data:' + fileList[0].filetype + ';base64,' + fileList[0].base64;
    // this.image.dataUrl = 'data:' + this.File.filetype + ';base64,' + this.File.base64;
  }
  getImage() {
    console.log('this.newOpportunity', this.newOpportunity);
    var imageData = 'data:' + this.newOpportunity.File.filetype + ';base64,' + this.newOpportunity.File.base64;
    console.log('imageData', imageData);
    return imageData;
  }

  // angular.element("#imgInp").change(() => {
  //   if (this.files && this.files[0]) {
  //     var reader = new FileReader();

  //     reader.onload = function (e) {
  //       angular.element('#blah').attr('src', e.target.result);
  //     }

  //     reader.readAsDataURL(this.files[0]);
  //   }
  // })
}

export default angular.module('saveButtonAppApp.main', [
  uiRouter, upload])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
