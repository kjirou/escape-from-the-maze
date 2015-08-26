import assert from 'power-assert';

import App from 'app';
import EventManager from 'lib/event-manager';
import {heading} from 'test/support/helpers';


describe(heading(__filename), function() {

  beforeEach(function() {
    App.purgeInstances();
  });

  it('should create instance', function() {
    let app = new App();
    assert.strictEqual(typeof app, 'object');
    assert.strictEqual(app instanceof App, true);
  });

  it('purgeInstances', function() {
    assert.strictEqual(EventManager._instance, null);
    EventManager.getInstance();
    assert.strictEqual(EventManager._instance instanceof EventManager, true);
    App.purgeInstances();
    assert.strictEqual(EventManager._instance, null);
  });
});
