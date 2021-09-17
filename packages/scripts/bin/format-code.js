#!/usr/bin/env node

'use strict';

const { execSync } = require('child_process');

function format() {
    // As of writing, Prettier's Node API (https://prettier.io/docs/en/api.html) only supports running on a single file.
    // So to easily format multiple files, we have to use the CLI.

    const command = 'prettier --write "**/*.{cjs,css,html,js,jsx,mjs,json,less,scss,ts,tsx,yaml,yml}"';
    execSync(command, { stdio: 'inherit' });
}

format();
