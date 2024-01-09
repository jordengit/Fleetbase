import GeoJson from './geo-json';
import { assign } from '@ember/polyfills';
import { isArray } from '@ember/array';

export default class Point extends GeoJson {
    constructor(input) {
        super();
        var args = Array.prototype.slice.call(arguments);

        if (input && input.type === 'Point' && input.coordinates) {
            assign(this, input);
        } else if (input && isArray(input)) {
            this.coordinates = input;
        } else if (args.length >= 2) {
            this.coordinates = args;
        } else {
            throw 'GeoJSON: invalid input for new Point';
        }

        this.type = 'Point';
    }
}
