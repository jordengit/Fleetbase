import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class OrderListOverlayOrderComponent extends Component {

    /**
     * @service intl
     */
    @service intl;

    get noCustomerNameDisplay() {
        return this.intl.t('fleet-ops.component.order-list-overlay.no-customer');
        // return '尚未指派顧客';
    }
}
