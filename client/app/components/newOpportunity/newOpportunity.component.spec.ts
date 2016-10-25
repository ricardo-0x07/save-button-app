'use strict';

describe('Component: NewOpportunityComponent', function() {
  // load the controller's module
  beforeEach(module('saveButtonAppApp.newOpportunity'));

  var NewOpportunityComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    NewOpportunityComponent = $componentController('newOpportunity', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
