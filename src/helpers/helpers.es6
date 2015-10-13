const Helpers = {
    generateName: (prefix, index) => {
        return prefix + '-' + index;
    },

    getSystemMessage: (module, msg) => {
        return `[ // Motor.${module} ] ${msg}`;
    },

    warn: (module, msg) => {
        console.warn(Helpers.getSystemMessage(module, msg));
    },

    error: (module, msg) => {
        console.error(Helpers.getSystemMessage(module, msg));
    }
};

export default Helpers;
