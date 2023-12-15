# fleetbase-extensions-indexer

Broccoli plugin which indexes fleetbase extensions installed using npm for the Fleetbase Console


## Compatibility

* Node.js v14 or above


## Installation

```
yarn add fleetbase-extensions-indexer
```


## Usage

```js
# ember-cli-build.js
/**
 * After let app = new EmberApp(defaults);
 * initialize the fleetbase extensions indexer
 */
const extensions = new FleetbaseExtensionsIndexer();

/**
 * Add to tree
 */
return app.toTree([extensions]);
```


## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).
