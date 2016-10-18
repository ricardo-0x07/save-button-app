'use strict';

describe('Service: opportunitiesIndexedDb', function() {
  // load the service's module
  beforeEach(module('saveButtonAppApp.opportunitiesIndexedDb'));

  // instantiate service
  var opportunitiesIndexedDb;
  beforeEach(inject(function(_opportunitiesIndexedDb_) {
    opportunitiesIndexedDb = _opportunitiesIndexedDb_;
  }));

  it('should do something', function() {
    expect(!!opportunitiesIndexedDb).toBe(true);
  });
});
