import { minAdmins } from 'preprint-service/helpers/min-admins';
import { module, test } from 'qunit';
import EmberObject from '@ember/object';


module('Unit | Helper | min admins');

test('Modifying sole contributor does not leave min number of admins', function(assert) {
    var contrib = EmberObject.create({
        'id': '12345',
        'permission': 'admin',
        'unregisteredContributor': null

    });
    var contributors = [contrib];

  let result = minAdmins([contrib, contributors]);
  assert.equal(result, false);
});

test('Can modify contributor permissions if have other admins', function(assert) {
    var contrib = EmberObject.create({
        'id': '12345',
        'permission': 'admin',
        'unregisteredContributor': null

    });

    var otherContrib = EmberObject.create({
        'id': 'abcde',
        'permission': 'admin',
        'unregisteredContributor': null
    });

    var contributors = [contrib, otherContrib];

  let result = minAdmins([contrib, contributors]);
  assert.equal(result, true);
});

test('Cannot modify contributor permissions if other contributors read-only', function(assert) {
    var contrib = EmberObject.create({
        'id': '12345',
        'permission': 'admin',
        'unregisteredContributor': null

    });

    var otherContrib = EmberObject.create({
        'id': 'abcde',
        'permission': 'read',
        'unregisteredContributor': null
    });

    var contributors = [contrib, otherContrib];

  let result = minAdmins([contrib, contributors]);
  assert.equal(result, false);
});
