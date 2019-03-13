import {HalProperty, HalResource} from 'hal-rest-client';
import {AmortizationModel} from './amortization.model';

export class AmortizationsList extends HalResource {
    @HalProperty(AmortizationModel) public items?: AmortizationModel[];
    @HalProperty() public totalItems: number;
    @HalProperty() public itemsPerPage: number;
}
