#!/usr/bin/env node

'use strict';

const lifecycle_event = process.env.npm_lifecycle_event;
const package_name = process.env.npm_package_name;

const type = package_name.includes('@tecra') ? 'package' : 'project';

console.info(`NPM script \`${lifecycle_event}\` in ${type} \`${package_name}\` is skipped.`);
