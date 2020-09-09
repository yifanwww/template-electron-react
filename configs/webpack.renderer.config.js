// const fs = require("fs");

const Base = require("./webpack.base.config");

// Write configurations as json data into file, for debugging.
// function WriteConfigs(config, filename) {
//     const configStr = JSON.stringify(config, "", "    ");
//     fs.writeFileSync(filename, configStr);
// }

// Override webpack configurations.
// The Webpack config to use when compiling your react app for development or production.
function OverrideWebpackConfigs(webpack, env) {
    webpack.module.rules[1].include = [Base.Paths.AppSrcRenderer, Base.Paths.AppSrcUtils];
    webpack.module.rules[2].oneOf[1].include = [Base.Paths.AppSrcRenderer, Base.Paths.AppSrcUtils];
    // WriteConfigs(webpack.module.rules, "webpack.json");

    // Use custom aliases

    for (let index in Base.Alias)
        webpack.resolve.alias[index] = Base.Alias[index];
    // WriteConfigs(webpack.resolve.alias, "webpack.json");

    // Use custom eslint rc
    // We have three options to custom:
    // 'ignore', 'baseConfig' and 'useEslintrc' (line 350-356 in 'react-scrips' 3.4.1)

    // HACK: Why it works fine if the 'ignore' option is 'true'?
    // For example: if it is false, definition for rule 'node/no-deprecated-api' is not found in
    // 'node_modules/safer-buffer/safer.js' when you're using 'iconv-lite'
    webpack.module.rules[1].use[0].options.ignore = true;
    webpack.module.rules[1].use[0].options.baseConfig.extends = [Base.EslintConfigPath];
    // WriteConfigs(webpack.module.rules[1].use[0].options, "webpack.json");

    return webpack;
}

// Override paths configurations.
function OverridePathsConfigs(paths, env) {
    paths.appPublic = Base.Paths.AppPublic;
    paths.appHtml = Base.Paths.AppHtml;
    paths.appIndexJs = Base.Paths.AppIndexJsRenderer;
    paths.appSrc = Base.Paths.AppSrc;
    paths.appTsConfig = Base.Paths.AppTsConfigRenderer;
    paths.testsSetup = Base.Paths.TestsSetup;
    paths.proxySetup = Base.Paths.ProxySetup;

    // WriteConfigs(paths, "paths.json");

    return paths;
}

module.exports = {
    webpack: OverrideWebpackConfigs,
    paths: OverridePathsConfigs
}
