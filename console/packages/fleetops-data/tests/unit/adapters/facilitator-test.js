import { module, test } from 'qunit';
import { setupTest } from 'dummy/tests/helpers';

module('Unit | Adapter | facilitator', function (hooks) {
    setupTest(hooks);

    // Replace this with your real tests.
    test('it exists', function (assert) {
        let adapter = this.owner.lookup('adapter:facilitator');
        assert.ok(adapter);
    });
});
