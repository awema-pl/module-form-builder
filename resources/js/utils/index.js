/**
 * Exports helpers to global
 *
 * @param {Object} context - global variable
 * @param {Object} helperObject - object with helper methods
 *
 * @returns global variable with added utils
 *
 */

export function wrapUtils(context, helperObject) {

    context.utils = context.utils || {}

    Object.assign(context.utils, helperObject)

    return context
}