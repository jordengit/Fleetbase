const Plugin = require('broccoli-plugin');
const fg = require('fast-glob');
const fs = require('fs');

const only = (subject, props = []) => {
    const keys = Object.keys(subject);
    const result = {};

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        if (props.includes(key)) {
            result[key] = subject[key];
        }
    }

    return result;
};

const IndexExtensionsToJson = function () {
    return new Promise((resolve, reject) => {
        const extensions = [];
        const seenPackages = new Set();

        return fg(['node_modules/*/package.json', 'node_modules/*/*/package.json'])
            .then((results) => {
                for (let i = 0; i < results.length; i++) {
                    const packagePath = results[i];
                    const packageJson = fs.readFileSync(packagePath);
                    let packageData = null;

                    try {
                        packageData = JSON.parse(packageJson);
                    } catch (e) {
                        console.warn(`Could not parse package.json at ${packagePath}:`, e);
                        continue;
                    }

                    if (!packageData || !packageData.keywords || !packageData.keywords.includes('fleetbase-extension')) {
                        continue;
                    }

                    // If we've seen this package before, skip it
                    if (seenPackages.has(packageData.name)) {
                        continue;
                    }

                    seenPackages.add(packageData.name);
                    extensions.push(only(packageData, ['name', 'description', 'version', 'fleetbase', 'keywords', 'license', 'repository']));
                }

                resolve(extensions);
            })
            .catch(reject);
    });
};

module.exports = class FleetbaseExtensionsIndexer extends Plugin {
    constructor() {
        super([]);
    }

    async build() {
        const extensionsJsonPath = this.outputPath + '/extensions.json';

        // Check if extensions.json exists
        if (fs.existsSync(extensionsJsonPath)) {
            return;
        }

        const extensions = await IndexExtensionsToJson();

        this.output.writeFileSync('extensions.json', JSON.stringify(extensions));
    }
};
