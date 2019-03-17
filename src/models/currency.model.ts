import {HalProperty, HalResource} from 'hal-rest-client';
import {ICurrency} from '..';

export class CurrencyModel extends HalResource implements ICurrency {
    @HalProperty() public id: string;
    @HalProperty() public sign?: string;
}
