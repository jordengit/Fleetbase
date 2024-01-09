import ApplicationSerializer from '@fleetbase/ember-core/serializers/application';
import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';
import { getProperties, setProperties } from '@ember/object';

export default class WaypointSerializer extends ApplicationSerializer.extend(EmbeddedRecordsMixin) {
    /**
     * Embedded relationship attributes
     *
     * @var {Object}
     */
    get attrs() {
        return {
            place: { embedded: 'always' },
            tracking_number: { embedded: 'always' },
        };
    }

    /**
     * Normalizes a part of the JSON payload returned by the server.
     *
     * @method normalize
     * @param {Model} modelClass
     * @param {Object} resourceHash
     * @param {String} prop
     * @return {Object}
     */
    normalize(model, hash, prop) {
        // if waypoint is being loaded from a place model,
        // alias the attributes into the place belongsTo relationship
        if (typeof hash?.id === 'string' && hash.id.startsWith('place_')) {
            setProperties(hash, {
                place: {
                    public_id: hash.id,
                    ...getProperties(hash, [
                        'uuid',
                        'name',
                        'address',
                        'address_html',
                        'location',
                        'street1',
                        'street2',
                        'city',
                        'province',
                        'country',
                        'postal_code',
                        'phone',
                        'security_access_code',
                        'building',
                        'district',
                        'neighhborhood',
                    ]),
                },
            });
        }

        return super.normalize(model, hash, prop);
    }
}
