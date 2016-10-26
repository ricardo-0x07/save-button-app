'use strict';

describe('Component: NewOpportunityCameraComponent', function() {
  // load the controller's module
  beforeEach(module('saveButtonAppApp.newOpportunityCamera'));

  var NewOpportunityCameraComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    NewOpportunityCameraComponent = $componentController('newOpportunityCamera', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
