const eslint_config_react_app = require('eslint-config-react-app/index');

// Add custom eslint plugins
const plugins = [];

eslint_config_react_app.plugins.push.apply(eslint_config_react_app.plugins, plugins);

module.exports = eslint_config_react_app;
