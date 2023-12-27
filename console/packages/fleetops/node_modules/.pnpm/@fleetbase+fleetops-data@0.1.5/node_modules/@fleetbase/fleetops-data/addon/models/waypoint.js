import PlaceModel from './place';
import { attr } from '@ember-data/model';
import { belongsTo } from '@ember-data/model';

export default class WaypointModel extends PlaceModel {
    /** @relationships */
    @belongsTo('place', { async: false }) place;
    @belongsTo('tracking-number', { async: false }) tracking_number;

    /** @attributes */
    @attr('string') public_id;
    @attr('string') _import_id;
    @attr('string') waypoint_uuid;
    @attr('string') waypoint_public_id;
    @attr('string') tracking_number_uuid;
    @attr('string') tracking;
    @attr('string') status;
    @attr('string') status_code;
    @attr('string') type;
    @attr('number') order;
}
