const eslint_config_react_app = require('eslint-config-react-app/index');

// Add custom eslint plugins
const plugins = ['node'];

// HACK: Seems not working for *.tsx
eslint_config_react_app.plugins.push.apply(eslint_config_react_app.plugins, plugins);
eslint_config_react_app.overrides[0].plugins.push.apply(eslint_config_react_app.overrides[0].plugins, plugins);

module.exports = eslint_config_react_app;
