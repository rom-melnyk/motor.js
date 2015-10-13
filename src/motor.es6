import Action from './action.es6';

const Motor = {
    Action
};

if (window) {
    window.Motor = Motor;
} else {
    module.exports = Motor;
}
