#!/usr/bin/env node

'use strict';

console.info(require('chalk').green('Check in git hooks.'));

// git v2.9.0 supports a custom hooks directory. This means we just need to check in the hooks scripts.
require('child_process').spawnSync('git', ['config', 'core.hooksPath', '.githooks']);
