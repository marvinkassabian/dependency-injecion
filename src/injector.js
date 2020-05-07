const getFunctionArguments = require('@marvinkassabian/get-function-arguments');

module.exports = () => {
    const constructors = {};
    const services = {};

    const register = (name, create) => {
        constructors[name] = () => inject(create);
    };
    const render = (name) => {
        console.log('creates', constructors)
        console.log('services', services)
        console.log('render', name)
        if (!services[name])
            services[name] = constructors[name]();
        return services[name];
    };
    const inject = create => {
        const argNames = getFunctionArguments({ prefix: '$' })(create);
        console.log('argNames', argNames);
        const args = new Map(argNames.map(argName => [argName, render(argName)]));
        const dependencies = Object.fromEntries(args);

        console.log(dependencies);
        return create(dependencies);
    };

    return Object.freeze({
        register,
        render,
    });
};
