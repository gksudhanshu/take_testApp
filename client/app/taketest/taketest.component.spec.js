'use strict';

describe('Component: TaketestComponent', function() {
  // load the controller's module
  beforeEach(module('testApp.taketest'));

  var TaketestComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    TaketestComponent = $componentController('taketest', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
