import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { computed, action } from '@ember/object';
import { isBlank } from '@ember/utils';
import { timeout } from 'ember-concurrency';
import { task } from 'ember-concurrency-decorators';

export default class ManagementFuelReportsIndexController extends Controller {
    /**
     * Inject the `notifications` service
     *
     * @var {Service}
     */
    @service notifications;

    /**
     * Inject the `modals-manager` service
     *
     * @var {Service}
     */
    @service modalsManager;

    /**
     * Inject the `intl` service
     *
     * @var intl
     */
    @service intl;

    /**
     * Inject the `crud` service
     *
     * @var {Service}
     */
    @service crud;

    /**
     * Inject the `store` service
     *
     * @var {Service}
     */
    @service store;

    /**
     * Inject the `hostRouter` service
     *
     * @var {Service}
     */
    @service hostRouter;

    /**
     * Inject the `contextPanel` service
     *
     * @var {Service}
     */
    @service contextPanel;

    /**
     * Inject the `filters` service
     *
     * @var {Service}
     */
    @service filters;

    /**
     * Inject the `loader` service
     *
     * @var {Service}
     */
    @service loader;

    /**
     * Queryable parameters for this controller's model
     *
     * @var {Array}
     */
    queryParams = ['page', 'limit', 'sort', 'query', 'public_id', 'internal_id', 'vehicle', 'driver', 'created_by', 'updated_by', 'status', 'country', 'volume', 'odometer'];

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
     * The param to sort the data on, the param with prepended `-` is descending
     *
     * @var {String}
     */
    @tracked sort = '-created_at';

    /**
     * The filterable param `public_id`
     *
     * @var {String}
     */
    @tracked public_id;

    /**
     * The filterable param `internal_id`
     *
     * @var {String}
     */
    @tracked internal_id;

    /**
     * The filterable param `driver`
     *
     * @var {String}
     */
    @tracked driver;

    /**
     * The filterable param `vehicle`
     *
     * @var {String}
     */
    @tracked vehicle;

    /**
     * The filterable param `vehicle`
     *
     * @var {String}
     */
    @tracked reporter;

    /**
     * The filterable param `vehicle`
     *
     * @var {String}
     */
    @tracked volume;

    /**
     * The filterable param `vehicle`
     *
     * @var {String}
     */
    @tracked odometer;

    /**
     * The filterable param `status`
     *
     * @var {Array}
     */
    @tracked status;

    /**
     * All columns applicable for orders
     *
     * @var {Array}
     */
    @tracked columns = [
        {
            label: 'ID',
            labelKey: 'fleet-ops.common.id',
            valuePath: 'public_id',
            width: '130px',
            cellComponent: 'click-to-copy',
            resizable: true,
            sortable: true,
            filterable: true,
            hidden: false,
            filterComponent: 'filter/string',
        },
        {
            label: 'Reporter',
            labelKey: 'fleet-ops.common.reporter',
            valuePath: 'reporter_name',
            width: '100px',
            cellComponent: 'table/cell/anchor',
            onClick: async (issue) => {
                let reporter = await issue.loadDReporter();

                if (reporter) {
                    this.contextPanel.focus(reporter);
                }
            },
            resizable: true,
            sortable: true,
            filterable: true,
            filterComponent: 'filter/model',
            filterComponentPlaceholder: 'fleet-ops.common.filterplaceholder',
            filterParam: 'reporter',
            model: 'user',
        },
        {
            label: 'Driver',
            labelKey: 'fleet-ops.common.driver',
            valuePath: 'driver_name',
            width: '120px',
            cellComponent: 'table/cell/anchor',
            onClick: async (fuelReport) => {
                let driver = await fuelReport.loadDriver();

                if (driver) {
                    this.contextPanel.focus(driver);
                }
            },
            resizable: true,
            sortable: true,
            filterable: true,
            filterComponent: 'filter/model',
            filterComponentPlaceholder: 'fleet-ops.common.filterplaceholder',
            filterParam: 'driver',
            model: 'driver',
        },
        {
            label: 'Vehicle',
            labelKey: 'fleet-ops.common.vehicle',
            valuePath: 'vehicle_name',
            width: '100px',
            cellComponent: 'table/cell/anchor',
            onClick: async (issue) => {
                let vehicle = await issue.loadVehicle();

                if (vehicle) {
                    this.contextPanel.focus(vehicle);
                }
            },
            resizable: true,
            sortable: true,
            filterable: true,
            filterComponent: 'filter/model',
            filterComponentPlaceholder: 'fleet-ops.common.filterplaceholder',
            filterParam: 'vehicle',
            model: 'vehicle',
            modelNamePath: 'displayName',
        },
        {
            label: 'Status',
            labelKey: 'fleet-ops.common.status',
            valuePath: 'status',
            cellComponent: 'table/cell/status',
            width: '100px',
            resizable: true,
            sortable: true,
            filterable: true,
            filterComponent: 'filter/multi-option',
            filterOptions: ['draft', 'pending-approval', 'approved', 'rejected', 'revised', 'submitted', 'in-review', 'confirmed', 'processed', 'archived', 'cancelled'],
        },
        {
            label: 'volume',
            labelKey: 'fleet-ops.common.volume',
            valuePath: 'volume',
            width: '130px',
            cellComponent: 'click-to-copy',
            resizable: true,
            sortable: true,
            filterable: true,
            hidden: false,
            filterComponent: 'filter/string',
        },
        {
            label: 'odometer',
            labelKey: 'fleet-ops.common.odometer',
            valuePath: 'odometer',
            width: '130px',
            cellComponent: 'click-to-copy',
            resizable: true,
            sortable: true,
            filterable: true,
            hidden: false,
            filterComponent: 'filter/string',
        },
        {
            label: 'Created At',
            labelKey: 'fleet-ops.common.created-at',
            valuePath: 'createdAt',
            sortParam: 'created_at',
            width: '120px',
            resizable: true,
            sortable: true,
            filterable: true,
            filterComponent: 'filter/date',
        },
        {
            label: 'Updated At',
            labelKey: 'fleet-ops.common.updated-at',
            valuePath: 'updatedAt',
            sortParam: 'updated_at',
            width: '120px',
            resizable: true,
            sortable: true,
            hidden: true,
            filterable: true,
            filterComponent: 'filter/date',
        },
        {
            label: '',
            cellComponent: 'table/cell/dropdown',
            ddButtonText: false,
            ddButtonIcon: 'ellipsis-h',
            ddButtonIconPrefix: 'fas',
            ddMenuLabel: 'Fuel Report Actions',
            cellClassNames: 'overflow-visible',
            wrapperClass: 'flex items-center justify-end mx-2',
            width: '10%',
            actions: [
                {
                    label: 'View Details',
                    labelKey: 'fleet-ops.management.fuel-reports.index.view',
                    fn: this.viewFuelReport,
                },
                {
                    label: 'Edit Fuel Report',
                    labelKey: 'fleet-ops.management.fuel-reports.index.edit-fuel',
                    fn: this.editFuelReport,
                },
                {
                    separator: true,
                },
                {
                    label: 'Delete Fuel Report',
                    labelKey: 'fleet-ops.management.fuel-reports.index.delete',
                    fn: this.deleteFuelReport,
                },
            ],
            sortable: false,
            filterable: false,
            resizable: false,
            searchable: false,
        },
    ];

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
     * Toggles dialog to export a fuel report
     *
     * @void
     */
    @action exportFuelReports() {
        this.crud.export('fuel-report');
    }

    /**
     * View the selected fuel report
     *
     * @param {FuelReportModel} fuelReport
     * @param {Object} options
     * @void
     */
    @action viewFuelReport(fuelReport) {
        this.transitionToRoute('management.fuel-reports.index.details', fuelReport);
    }

    /**
     * Reload layout view.
     */
    @action reload() {
        return this.hostRouter.refresh();
    }

    /**
     * Create a new fuel report
     *
     * @void
     */
    @action createFuelReport() {
        this.transitionToRoute('management.fuel-reports.index.new');
    }

    /**
     * Edit a fuel report
     *
     * @param {FuelReportModel} fuelReport
     * @void
     */
    @action editFuelReport(fuelReport) {
        this.transitionToRoute('management.fuel-reports.index.edit', fuelReport);
    }

    /**
     * Prompt to delete a fuel report
     *
     * @param {FuelReportModel} fuelReport
     * @param {Object} options
     * @void
     */
    @action deleteFuelReport(fuelReport, options = {}) {
        this.crud.delete(fuelReport, {
            onConfirm: () => {
                this.hostRouter.refresh();
            },
            ...options,
        });
    }

    /**
     * Bulk deletes selected fuel report's via confirm prompt
     *
     * @param {Array} selected an array of selected models
     * @void
     */
    @action bulkDeleteFuelReports() {
        const selected = this.table.selectedRows;

        this.crud.bulkDelete(selected, {
            modelNamePath: `name`,
            acceptButtonText: this.intl.t('fleet-ops.management.fuel-reports.index.delete-button'),
            onSuccess: () => {
                return this.hostRouter.refresh();
            },
        });
    }

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
}
