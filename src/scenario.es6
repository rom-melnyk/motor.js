import Helpers from './helpers/helpers.es6';
import Action from './action.es6';

const _namePrefix = 'scenario';
let _index = 0;

const _storage = {};

function _generateName () {
    return Helpers.generateName(_namePrefix, _index);
}

/**
 * Convert the sequence of actions/strings into sequence of actions
 * @param {Action[]|String[]} args
 */
function retrieveActions(args) {
    let actions = [];

    args.forEach(function (action, idx) {
        action = Action.get(action);
        if (!action) {
            Helpers.warn(`Scenario "${self.name}"`, `The argument #${idx} is not an action; ignored`);
        } else {
            actions.push(action);
        }
    });

    return actions;
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

    this.actions = retrieveActions( Array.prototype.slice.call(arguments, 1) );

    _storage[this.name] = this;
    _index++;
}

Scenario.prototype.run = function (input) {
    if (this.actions.length === 0) { return input; }

    let result = input;
    let i = 0;

    do {
        result = this.actions[i].run(result);
        i++;
    } while (i < this.actions.length && result !== undefined);


    // ------------ ------------ ------------
    // TODO async actions!
    // ------------ ------------ ------------
    /*let next;
    for (let i = 0; i < this.actions.length; i++) {
        next = (action, idx) => {
            return (input) => {
                if (input === undefined) {
                    // terminate the scenario
                } else {
                    // this.actions[i + 1]
                }
            }
        };

        result = this.actions[i].payload(input, (input) => {
            if (input === undefined) {
                // stop running the scenario
            } else {
                // i++
                // this.actions[i];
                // ^^^ ()
            }
        });
        if (result === undefined) {
            break; // stop running the scenario when the action returns `undefined`
        }
    }*/
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
