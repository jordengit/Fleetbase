import Model, { attr, belongsTo } from '@ember-data/model';
import { computed } from '@ember/object';
import { isArray } from '@ember/array';
import { format as formatDate, isValid as isValidDate, formatDistanceToNow } from 'date-fns';
import getWithDefault from '@fleetbase/ember-core/utils/get-with-default';
import first from '@fleetbase/ember-core/utils/first';

export default class ZoneModel extends Model {
    /** @ids */
    @attr('string') public_id;
    @attr('string') service_area_uuid;

    /** @relationships */
    @belongsTo('service-area') service_area;

    /** @attributes */
    @attr('string') name;
    @attr('string') description;
    @attr('string') color;
    @attr('string') stroke_color;
    @attr('string') status;
    @attr('polygon') border;
    @attr('array') coordinates;

    /** @dates */
    @attr('date') deleted_at;
    @attr('date') created_at;
    @attr('date') updated_at;

    /** @computed */
    @computed('updated_at') get updatedAgo() {
        if (!isValidDate(this.updated_at)) {
            return null;
        }
        return formatDistanceToNow(this.updated_at);
    }

    @computed('updated_at') get updatedAt() {
        if (!isValidDate(this.updated_at)) {
            return null;
        }
        return formatDate(this.updated_at, 'PPP p');
    }

    @computed('updated_at') get updatedAtShort() {
        if (!isValidDate(this.updated_at)) {
            return null;
        }
        return formatDate(this.updated_at, 'PP');
    }

    @computed('created_at') get createdAgo() {
        if (!isValidDate(this.created_at)) {
            return null;
        }
        return formatDistanceToNow(this.created_at);
    }

    @computed('created_at') get createdAt() {
        if (!isValidDate(this.created_at)) {
            return null;
        }
        return formatDate(this.created_at, 'PPP p');
    }

    @computed('created_at') get createdAtShort() {
        if (!isValidDate(this.created_at)) {
            return null;
        }
        return formatDate(this.created_at, 'PP');
    }

    @computed('border.coordinates', 'isNew') get locations() {
        let coordinates = getWithDefault(this.border, 'coordinates', []);

        // hotfix patch when coordinates are wrapped in array
        if (isArray(coordinates) && isArray(coordinates[0]) && coordinates[0].length > 2) {
            coordinates = first(coordinates);
        }

        if (this.isNew) {
            return coordinates;
        }

        return coordinates.map((coord) => coord.reverse());
    }

    @computed('bounds') get firstCoordinatePair() {
        return first(this.bounds) ?? [0, 0];
    }

    @computed('locations') get centerCoordinates() {
        const x = this.locations.map((xy) => xy[0]);
        const y = this.locations.map((xy) => xy[1]);
        const cx = (Math.min(...x) + Math.max(...x)) / 2;
        const cy = (Math.min(...y) + Math.max(...y)) / 2;

        return [cx, cy];
    }
}
