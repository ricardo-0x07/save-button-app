const angular = require('angular');
const uiRouter = require('angular-ui-router');
const upload = require('angular-base64-upload');
import routing from './main.routes';

export class MainController {
  $http;
  socket;
  awesomeOpportunities = [];
  newOpportunity = '';
  public myFile = null;

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
    this.$http.get('/api/files').then(response => {
      // this.awesomeOpportunities = response.data;
      console.log('files response', response);
      // this.socket.syncUpdates('opportunity', this.awesomeOpportunities);
    });
    // if (this.newOpportunity {
    //   this.$http.post('/api/opportunities', { name: this.newOpportunity });
    //   this.newOpportunity = '';
    // }
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
    console.log('this', this);
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
