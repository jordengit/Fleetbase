import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { computed, action } from '@ember/object';
import { isBlank } from '@ember/utils';
import { timeout } from 'ember-concurrency';
import { task } from 'ember-concurrency-decorators';

export default class OperationsServiceRatesIndexController extends Controller {
    /**
     * Inject the `currentUser` service
     *
     * @var {Service}
     */
    @service store;

    /**
     * Inject the `currentUser` service
     *
     * @var {Service}
     */
    @service currentUser;

    /**
     * Inject the `intl` service
     *
     * @var {Service}
     */
    @service intl;

    /**
     * Inject the `fetch` service
     *
     * @var {Service}
     */
    @service fetch;

    /**
     * Inject the `filters` service
     *
     * @var {Service}
     */
    @service filters;

    /**
     * Inject the `fetch` service
     *
     * @var {Service}
     */
    @service crud;

    /**
     * Inject the `notifications` service
     *
     * @var {Service}
     */
    @service notifications;

    /**
     * Inject the `modalsManager` service
     *
     * @var {Service}
     */
    @service modalsManager;

    /**
     * Inject the `hostRouter` service
     *
     * @var {Service}
     */
    @service hostRouter;

    /**
     * Inject the `loader` service
     *
     * @var {Service}
     */
    @service loader;

    /**
     * The current page of data being viewed
     *
     * @var {Integer}
     */
    @tracked page = 1;

    /**
     * The maximum number of items to show per page
     *
     * @var {Integer}
     */
    @tracked limit;

    /**
     * The search query
     *
     * @var {String}
     */
    @tracked query;

    /**
     * The param to sort the data on, the param with prepended `-` is descending
     *
     * @var {String}
     */
    @tracked sort = '-created_at';

    /**
     * Queryable parameters for this controller's model
     *
     * @var {Array}
     */
    queryParams = ['page', 'query', 'limit', 'sort', 'zone', 'service_area'];

    /**
     * All columns applicable for orders
     *
     * @var {Array}
     */
    @tracked columns = [
        {
            label: 'ID',
            valuePath: 'public_id',
            width: '150px',
            cellComponent: 'table/cell/anchor',
            onClick: this.editServiceRate,
            resizable: true,
            sortable: true,
            filterable: true,
            filterComponent: 'filter/string',
            labelKey: 'fleet-ops.common.id',
        },
        {
            label: 'Service',
            valuePath: 'service_name',
            cellComponent: 'table/cell/base',
            width: '125px',
            resizable: true,
            sortable: true,
            filterable: false,
            labelKey: 'fleet-ops.common.service',
        },
        {
            label: 'Service Area',
            valuePath: 'service_area.name',
            cellComponent: 'table/cell/base',
            width: '125px',
            resizable: true,
            sortable: true,
            filterable: true,
            filterComponent: 'filter/model',
            filterComponentPlaceholder: 'Select service area',
            filterParam: 'service_area',
            model: 'service-area',
            labelKey: 'fleet-ops.common.service-area',
        },
        {
            label: 'Zone',
            valuePath: 'zone.name',
            cellComponent: 'table/cell/base',
            width: '125px',
            resizable: true,
            sortable: true,
            filterable: true,
            filterComponent: 'filter/model',
            filterComponentPlaceholder: 'Select zone',
            filterParam: 'zone',
            model: 'zone',
            labelKey: 'fleet-ops.common.zone',
        },
        {
            label: 'Created At',
            valuePath: 'createdAt',
            sortParam: 'created_at',
            width: '125px',
            resizable: true,
            sortable: true,
            filterable: true,
            filterComponent: 'filter/date',
            labelKey: 'fleet-ops.common.created-at',
        },
        {
            label: 'Updated At',
            valuePath: 'updatedAt',
            sortParam: 'updated_at',
            width: '125px',
            resizable: true,
            sortable: true,
            hidden: true,
            filterable: true,
            filterComponent: 'filter/date',
            labelKey: 'fleet-ops.common.updated-at',
        },
        {
            label: '',
            cellComponent: 'table/cell/dropdown',
            ddButtonText: false,
            ddButtonIcon: 'ellipsis-h',
            ddButtonIconPrefix: 'fas',
            cellClassNames: 'overflow-visible',
            wrapperClass: 'flex items-center justify-end mx-2',
            width: '10%',
            actions: [
                {
                    label: 'Edit Service Rate',
                    fn: this.editServiceRate,
                    labelKey: 'fleet-ops.operations.service-rates.index.edit-service',
                },
                {
                    label: 'Delete Service Rate',
                    fn: this.deleteServiceRate,
                    labelKey: 'fleet-ops.operations.service-rates.index.delete-service',
                },
            ],
            sortable: false,
            filterable: false,
            resizable: false,
            searchable: false,
        },
    ];

    @computed('intl.locale')
    get localizedColumns() {
        return this.columns.map(column => ({
            ...column,
            label: column.labelKey ? this.intl.t(column.labelKey) : column.label,
            filterComponentPlaceholder: column.filterComponentPlaceholder ? this.intl.t(column.filterComponentPlaceholder) : null,
            actions: column.actions ? column.actions.map(action => {
                if (action.label) {
                    return {
                        ...action,
                        label: action.labelKey ? this.intl.t(action.labelKey) : action.label,
                    };
                }
                return action;
            }) : []
        }));
    }

    /**
     * The search task.
     *
     * @void
     */
    @task({ restartable: true }) *search({ target: { value } }) {
        // if no query don't search
        if (isBlank(value)) {
            this.query = null;
            return;
        }

        // timeout for typing
        yield timeout(250);

        // reset page for results
        if (this.page > 1) {
            this.page = 1;
        }

        // update the query param
        this.query = value;
    }

    /**
     * Reload layout view.
     */
    @action reload() {
        return this.hostRouter.refresh();
    }

    /**
     * Toggles dialog to export `service-rate`
     *
     * @memberof OperationsServiceRatesIndexController
     * @void
     */
    @action exportServiceRates() {
        this.crud.export('service-rate');
    }

    /**
     * Transition to service rate edit route.
     *
     * @param {ServiceRateModel} serviceRate
     * @memberof OperationsServiceRatesIndexController
     */
    @action editServiceRate(serviceRate) {
        this.transitionToRoute('operations.service-rates.index.edit', serviceRate);
    }

    /**
     * Delete a `service-rate` via confirm prompt
     *
     * @param {ServiceRateModel} serviceRate
     * @param {Object} options
     * @void
     */
    @action deleteServiceRate(serviceRate, options = {}) {
        this.crud.delete(serviceRate, {
            onSuccess: () => {
                return this.hostRouter.refresh();
            },
            ...options,
        });
    }

    /**
     * Bulk deletes selected `order` via confirm prompt
     *
     * @param {Array} selected an array of selected models
     * @void
     */
    @action bulkDeleteServiceRates(selected) {
        this.crud.bulkDelete(selected, {
            modelNamePath: `public_id`,
            acceptButtonText: this.intl.t('fleet-ops.operations.service-rates.index.accept-button'),
            onSuccess: () => {
                return this.hostRouter.refresh();
            },
        });
    }
}
