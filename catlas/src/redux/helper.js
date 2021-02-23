/**
 * Creates Redux action types.
 * @param {string} state - Redux store state.
 * @param {string} action - Redux action.
 */
export function createActionType(state, action) {
    const base = 'catlas';

    const result = `${base}/${state}/${action}`;

    return {
        START: result,
        SUCCESS: `${result}/SUCCESS`,
        FAIL: `${result}/FAIL`
    }
}