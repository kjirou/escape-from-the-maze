import assert from 'power-assert';

import App from 'app';
import EventManager from 'lib/event-manager';


describe('app', function() {

  beforeEach(function() {
    App.purgeInstances();
  });

  // blessed.screen() is executed in the ScreenManager.constructor
  // The process clears shell's output now
  it('should create instance');
  //it('should create instance', function() {
  //  let app = new App();
  //  assert.strictEqual(typeof app, 'object');
  //  assert.strictEqual(app instanceof App, true);
  //});

  it('purgeInstances', function() {
    assert.strictEqual(EventManager._instance, null);
    EventManager.getInstance();
    assert.strictEqual(EventManager._instance instanceof EventManager, true);
    App.purgeInstances();
    assert.strictEqual(EventManager._instance, null);
  });
});
