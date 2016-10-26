const angular = require('angular');

export class FooterComponent {
  showToast;
  constructor(public $timeout, public $rootScope, public preCacheServiceWorker) {
    var _that = this;
    this.showToast = false;
    this.$rootScope.$on('updateready', function () {
      _that.showToast = true;
      console.log('_that.showToast', _that.showToast);
      console.log('toast update ready event');
      _that.$timeout(angular.noop)
    });
    this.$rootScope.$on('update_version', function() {
       _that.showToast = false;
    });
  }
  showToastr() {
    return this.showToast;
  }
}

export default angular.module('directives.footer', [])
  .component('footer', {
    template: require('./footer.html'),
    controller: FooterComponent
  })
  .name;
