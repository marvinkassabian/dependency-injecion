module.exports = () => {
    const callbacks = {};
    const services = {};

    const register = (name, callback) => callbacks[name] = () => callback(render);
    const render = (name) => {
        if (!services[name])
            services[name] = callbacks[name]();
        return services[name];
    };

    return Object.freeze({
        register,
        render,
    });
};

