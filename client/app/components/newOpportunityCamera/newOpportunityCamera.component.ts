'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './newOpportunityCamera.routes';

export class NewOpportunityCameraComponent {
  public File = {};
   public canvas;

  /*@ngInject*/
  constructor(public photoCapture, private $state) {
    this.canvas = document.querySelector('canvas');
    console.log('$ctrl.File', this.File);
    this.photoCapture.initPHotoCapture();
    // this.$state.reload();
  }
  takePhoto() {
    var _that = this;
    this.photoCapture.takePhoto()
      .then(() => {
        console.log("canvas.toDataURL('image/webp')", _that.canvas.toDataURL('image/webp'));
        console.log('update $ctrl.File', _that.File);
        var data = _that.canvas.toDataURL('image/webp');
        var replace = 'data:image/webp;base64,';
        var base64 = data.replace(replace, '');
        console.log('base64', base64);
        _that.File.filename = 'photo';
        _that.File.filetype = 'image/webp';
        // _that.File.filesize = 'photo';
        _that.File.base64 = base64;
        console.log('_that.File', _that.File);
        return _that.File;
      })
      .then(function(File) {
        console.log('_that.File', _that.File);
        _that.$state.go('newOpportunityPhoto', {File: _that.File})
      });
  }

}

export default angular.module('saveButtonAppApp.newOpportunityCamera', [uiRouter])
  .config(routes)
  .component('newOpportunityCamera', {
    template: require('./newOpportunityCamera.html'),
    controller: NewOpportunityCameraComponent
    // controllerAs: 'newOpportunityCameraCtrl'
  })
  .name;
