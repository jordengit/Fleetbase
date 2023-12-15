import GeoJson from './geo-json';
import { assign } from '@ember/polyfills';

export default class Feature extends GeoJson {
    constructor(input) {
        super();

        if (input && input.type === 'Feature') {
            assign(this, input);
        } else if (input && input.type && input.coordinates) {
            this.geometry = input;
        } else {
            throw 'GeoJSON: invalid input for new Feature';
        }

        this.type = 'Feature';
    }
}
