# deputies-dev-repo

Utilities and tests for the Deputies development workflow.

## Picker state

`src/exclusivePickerState.js` centralizes the open/closed state for the repo,
branch, and model pickers. Use a single `openPicker` value instead of separate
booleans so opening one picker automatically closes the others.

```js
const { createExclusivePickerState } = require('./src/exclusivePickerState');

const pickerState = createExclusivePickerState();
pickerState.open('repo');
pickerState.open('branch'); // repo is now closed
```

## Tests

```bash
npm test
```
