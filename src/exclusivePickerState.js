const PICKERS = Object.freeze(['repo', 'branch', 'model']);

function assertValidPicker(picker) {
  if (!PICKERS.includes(picker)) {
    throw new Error(`Unknown picker "${picker}". Expected one of: ${PICKERS.join(', ')}`);
  }
}

/**
 * Creates a tiny state container for the repo/branch/model picker menu state.
 *
 * The invariant is that at most one picker can be open at any time. Opening a
 * picker always replaces the currently open picker instead of adding to it.
 */
function createExclusivePickerState(initialOpenPicker = null) {
  if (initialOpenPicker !== null) {
    assertValidPicker(initialOpenPicker);
  }

  let openPicker = initialOpenPicker;
  const listeners = new Set();

  function notify() {
    for (const listener of listeners) {
      listener(openPicker);
    }
  }

  return {
    getOpenPicker() {
      return openPicker;
    },

    isOpen(picker) {
      assertValidPicker(picker);
      return openPicker === picker;
    },

    open(picker) {
      assertValidPicker(picker);
      if (openPicker !== picker) {
        openPicker = picker;
        notify();
      }
      return openPicker;
    },

    close(picker) {
      if (picker !== undefined) {
        assertValidPicker(picker);
        if (openPicker !== picker) {
          return openPicker;
        }
      }

      if (openPicker !== null) {
        openPicker = null;
        notify();
      }
      return openPicker;
    },

    toggle(picker) {
      assertValidPicker(picker);
      return openPicker === picker ? this.close(picker) : this.open(picker);
    },

    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

module.exports = {
  PICKERS,
  createExclusivePickerState,
};
