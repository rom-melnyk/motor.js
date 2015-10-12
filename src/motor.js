(function (window) {
    var Motor = {};

    if (!window) {
        module.exports = Motor;
    } else {
        window.Motor = Motor;
    }
})(window);
