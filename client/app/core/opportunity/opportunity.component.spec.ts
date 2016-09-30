'use strict';

describe('Component: opportunity', function() {
  // load the component's module
  beforeEach(module('saveButtonAppApp.opportunity'));

  var opportunityComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    opportunityComponent = $componentController('opportunity', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
