var _namePrefix = 'scenario-';
var _index = 0;

var _storage = {};

function _generateName () {
    return _namePrefix + _index;
}

/**
 * A constructor for the Scenario instance.
 * @param {String} [name]
 * @param {...Action|String} [actions]
 * @constructor
 */
var Scenario = function (name, actions) {
    actions = Array.prototype.slice.call(arguments, 1);

    if (!this.name) {
        this.name = _generateName();
        console.warn('[ // Motor.Scenario ] No name provided for the action; "' + this.name + '" was generated');
    } else {
        if (_storage[name]) {
            throw new ReferenceError('[ // Motor.Scenario ] Cannot create the scenario with the name "' + name + '"; it already exists');
        }
        this.name = name;
    }

    this.actions = [];
    Array.prototype.slice.call(arguments, 1).forEach(function (action, idx) {
        action = Motor.Action.get(action);
        if (!action) {
            console.warn('[ // Motor.Scenario ] ')
        }
    });

    _storage[this.name] = this;
    _index++;
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

module.exports = Scenario;
