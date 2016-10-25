'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './newOpportunity.routes';

export class NewOpportunityComponent {
  newOpportunity = '';
  image = {};
  public File = {};
  public canvas;
  public img;

  /*@ngInject*/
  constructor(private $http, public  preCacheServiceWorker, public photoCapture) {
    this.canvas = document.querySelector('canvas');
    this.img = document.querySelector('img#photo-op')
    console.log('$ctrl.File', this.File);
    this.photoCapture.initPHotoCapture();
  }
  takePhoto() {
    this.photoCapture.takePhoto()
      .then(() => {
        console.log("canvas.toDataURL('image/webp')", this.canvas.toDataURL('image/webp'));
        console.log('update $ctrl.File', this.File);
        var data = this.canvas.toDataURL('image/webp');
        var replace = 'data:image/webp;base64,';
        var base64 = data.replace(replace, '');
        console.log('base64', base64);
        this.File.filename = 'photo';
        this.File.filetype = 'image/webp';
        this.File.filesize = 'photo';
        this.File.base64 = base64;
        console.log('this.File', this.File);
      });
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

}

export default angular.module('saveButtonAppApp.newOpportunity', [uiRouter])
  .config(routes)
  .component('newOpportunity', {
    template: require('./newOpportunity.html'),
    controller: NewOpportunityComponent,
    controllerAs: 'newOpportunityCtrl'
  })
  .name;
