'use strict';

describe('Component: NewOpportunityPhotoComponent', function() {
  // load the controller's module
  beforeEach(module('saveButtonAppApp.newOpportunityPhoto'));

  var NewOpportunityPhotoComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    NewOpportunityPhotoComponent = $componentController('newOpportunityPhoto', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
