'use strict';

describe('Component: toast', function() {
  // load the component's module
  beforeEach(module('saveButtonAppApp.toast'));

  var toastComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    toastComponent = $componentController('toast', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
