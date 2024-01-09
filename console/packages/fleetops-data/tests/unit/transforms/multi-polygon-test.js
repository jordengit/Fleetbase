import { module, test } from 'qunit';
import { setupTest } from 'dummy/tests/helpers';

module('Unit | Transform | multi polygon', function (hooks) {
    setupTest(hooks);

    // Replace this with your real tests.
    test('it exists', function (assert) {
        let transform = this.owner.lookup('transform:multi-polygon');
        assert.ok(transform);
    });
});
