const { join } = require('path');
const { writeFileSync } = require('fs');
const createFieldSorter = require('./sortFields');

const sortFields = createFieldSorter(['resolutions', 'dependencies', 'devDependencies'])

function floorSemver(version) {
  const firstChar = version[0];
  // Only simple ranges are supported
  if (firstChar === '^' || firstChar === '~') {
    return version.slice(1);
  }

  return version;
}

/**
 * Ensures yarn's resolutions in package.json matches
 * our dependency / devDependency version.
 * Yarn v1 doesn't automatically update the "resolution" field.
 *
 * @param {string} workingDir - Current working directory
 */
function ensureResolutions(workingDir) {
  const pkgPath = join(workingDir, 'package.json');
  const pkg = require(pkgPath);

  const dependencies = {
    ...pkg.devDependencies,
    // Dependencies should take priority
    ...pkg.dependencies,
  };

  const updatedResolutions = {};

  console.log(
    '🏷  Ensuring package.json "resolution" are in sync with dependencies\' versions and flooring.'
  );

  // Check for resolutions
  if (pkg.resolutions == null) {
    throw new Error(`No package resolutions found at "${pkgPath}"`)
  }

  for (let [dep, version] of Object.entries(pkg.resolutions)) {
    const pkgDependencyVersion = dependencies[dep];
    if (pkgDependencyVersion != null) {
      const flooredVersion = floorSemver(pkgDependencyVersion);
      if (flooredVersion !== version) {
        console.log(`   Updated resolution ${dep}: "${version}" => "${flooredVersion}"`);
        // Update version
        version = flooredVersion;
      }
    }

    updatedResolutions[dep] = version;
  }

  // Replace with updated resolutions and update package.json file
  pkg.resolutions = updatedResolutions;
  writeFileSync(
    pkgPath,
    // Write formatted pkg with newline
    `${JSON.stringify(pkg, sortFields, 2)}\n`,
    'utf8'
  );
}

module.exports = ensureResolutions;
