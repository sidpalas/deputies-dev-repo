const assert = require('node:assert/strict');
const { createExclusivePickerState } = require('../src/exclusivePickerState');

const pickerState = createExclusivePickerState();
assert.equal(pickerState.getOpenPicker(), null);

pickerState.open('repo');
assert.equal(pickerState.isOpen('repo'), true);
assert.equal(pickerState.isOpen('branch'), false);
assert.equal(pickerState.isOpen('model'), false);

pickerState.open('branch');
assert.equal(pickerState.isOpen('repo'), false);
assert.equal(pickerState.isOpen('branch'), true);
assert.equal(pickerState.isOpen('model'), false);

pickerState.toggle('model');
assert.equal(pickerState.isOpen('repo'), false);
assert.equal(pickerState.isOpen('branch'), false);
assert.equal(pickerState.isOpen('model'), true);

pickerState.toggle('model');
assert.equal(pickerState.getOpenPicker(), null);

pickerState.open('repo');
pickerState.close('branch');
assert.equal(pickerState.getOpenPicker(), 'repo');

pickerState.close('repo');
assert.equal(pickerState.getOpenPicker(), null);

assert.throws(() => pickerState.open('settings'), /Unknown picker/);

const notifications = [];
const unsubscribe = pickerState.subscribe((openPicker) => notifications.push(openPicker));
pickerState.open('repo');
pickerState.open('repo');
pickerState.open('branch');
pickerState.close();
unsubscribe();
pickerState.open('model');
assert.deepEqual(notifications, ['repo', 'branch', null]);

console.log('exclusivePickerState tests passed');
