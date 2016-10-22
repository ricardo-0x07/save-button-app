'use strict';
const angular = require('angular');

export class toastComponent {
  /*@ngInject*/
  constructor(private $rootScope, private $state: ng.ui.IStateService) {
  }
  refresh() {
    console.log('update_version btn pressed');
    this.$rootScope.$broadcast('update_version');
    // this.$state.reload();
  }
}

export default angular.module('saveButtonAppApp.toast', [])
  .component('toast', {
    template: require('./toast.component.html'),
    // bindings: { showToast: '<' },
    controller: toastComponent
  })
  .name;
