(function (Motor) {
    var _namePrefix = 'action-';
    var _index = 0;

    var _storage = {};

    function _generateName () {
        return _namePrefix + _index;
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
    Motor.Action = function (name, actionFn) {
        if (!this.name) {
            this.name = _generateName();
            console.warn('[ // Motor.Action ] No name provided for the action; "' + this.name + '" was generated');
        } else {
            if (_storage[name]) {
                throw new ReferenceError('[ // Motor.Action ] Cannot create the action with the name "' + name + '"; it already exists');
            }
            this.name = name;
        }

        this.payload = typeof actionFn === 'function' ? actionFn : function () {};

        _storage[this.name] = this;
        _index++;
    };

    /**
     * @static
     * @param {String|Motor.Action} name
     * @return {Motor.Action|undefined}
     */
    Motor.Action.get = function (name) {
        if (typeof name === 'string') { return _storage[name]; }
        else if (name.constructor === Motor.Action) { return name; }
        return undefined;
    };

    Motor.Action.ASYNC = undefined;
})(Motor);
