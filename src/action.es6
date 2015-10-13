import Helpers from './helpers/helpers.es6';

const _namePrefix = 'action';
let _index = 0;

const _storage = {};

function _generateName () {
    return Helpers.generateName(_namePrefix, _index);
}

/**
 * @callback Action
 * @param {*} [input]           any input data for the Action
 * @param {Function} next       makes sense if the Action is async.
 *                              In that case `next()` should be called with Action output as single parameter.

 * @return {*|undefined}        if `undefined`, the Action is considered as async.
 *                              Otherwise return the data for the next action
 */

/**
 * A constructor for the Action instance.
 * @param {String} [name]
 * @param {Action} actionFn
 * @constructor
 */
function Action (name, actionFn) {
    if (!name) {
        this.name = _generateName();
        Helpers.warn('Action', `No name provided for the action; "${this.name}" was generated`);
    } else {
        if (_storage[name]) {
            throw new ReferenceError(
                Helpers.getSystemMessage('Action', `Cannot create the action with the name "${name}"; it already exists`)
            );
        }
        this.name = name;
    }

    this.payload = typeof actionFn === 'function' ? actionFn : function () {};

    _storage[this.name] = this;
    _index++;
}

/**
 * @static
 * @param {String|Action} name
 * @return {Action|undefined}
 */
Action.get = function (name) {
    if (typeof name === 'string') { return _storage[name]; }
    else if (name.constructor === Action) { return name; }
    return undefined;
};

/**
 * @static
 */
Action.ASYNC = undefined;

export default Action;
