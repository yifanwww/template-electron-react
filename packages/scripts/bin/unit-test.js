#!/usr/bin/env node

'use strict';

const lifecycleEvent = process.env.npm_lifecycle_event;

require('../dist/bin').unitTest(lifecycleEvent === 'test');
