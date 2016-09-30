'use strict';

describe('Component: OpportunitiesComponent', function() {
  // load the controller's module
  beforeEach(module('saveButtonAppApp.opportunities'));

  var OpportunitiesComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    OpportunitiesComponent = $componentController('opportunities', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
