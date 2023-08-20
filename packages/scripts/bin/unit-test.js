#!/usr/bin/env node

import { unitTest } from '../dist/bin.js';

const lifecycleEvent = process.env.npm_lifecycle_event;

unitTest(lifecycleEvent === 'test');
