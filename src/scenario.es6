import Helpers from './helpers/helpers.es6';
import Action from './action.es6';

const _namePrefix = 'scenario';
let _index = 0;

const _storage = {};

function _generateName () {
    return Helpers.generateName(_namePrefix, _index);
}

/**
 * A constructor for the Scenario instance.
 * @param {String} [name]
 * @param {...Action|String} [actions]
 * @constructor
 */
function Scenario (name, actions) {
    if (!this.name) {
        this.name = _generateName();
        console.warn('Scenario', `No name provided for the scenario; "${this.name}" was generated`);
    } else {
        if (_storage[name]) {
            throw new ReferenceError(
                Helpers.getSystemMessage('Scenario', `Cannot create the scenario with the name "${name}"; it already exists`)
            );
        }
        this.name = name;
    }

    this.actions = [];
    let self = this;
    Array.prototype.slice.call(arguments, 1).forEach(function (action, idx) {
        action = Action.get(action);
        if (!action) {
            Helpers.warn(`Scenario "${self.name}"`, `The argument #${idx} is not an action; ignored`);
        } else {
            self.actions.push(action);
        }
    });

    _storage[this.name] = this;
    _index++;
}

Scenario.prototype.run = function () {

};

/**
 * @static
 * @param {String|Scenario} name
 * @return {Scenario|undefined}
 */
Scenario.get = function (name) {
    if (typeof name === 'string') { return _storage[name]; }
    else if (name.constructor === Scenario) { return name; }
    return undefined;
};

export default Scenario;
