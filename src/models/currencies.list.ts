import {HalProperty, HalResource} from 'hal-rest-client';
import getPageNumber from '../utils/getPageNumber';
import {CurrencyModel} from './currency.model';

export class CurrenciesList extends HalResource {
    @HalProperty('item', CurrencyModel) public items?: CurrencyModel[];
    @HalProperty(CurrenciesList) public first?: CurrenciesList;
    @HalProperty(CurrenciesList) public last?: CurrenciesList;
    @HalProperty(CurrenciesList) public prev?: CurrenciesList;
    @HalProperty(CurrenciesList) public next?: CurrenciesList;
    @HalProperty() public totalItems: number;
    @HalProperty() public itemsPerPage: number;

    public get page(): number {
        return getPageNumber(this) || 0;
    }
}
