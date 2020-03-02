#!/usr/bin/env node
const ensureResolutions = require('../lib/ensureResolutions');

// Call using current working directory
try {
  ensureResolutions(process.cwd());
} catch (err) {
  console.log('An error occurred:\n');
  console.log(err.message);
  process.exit(1);
}
