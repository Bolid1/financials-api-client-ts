import {HalProperty, HalResource} from 'hal-rest-client';
import getPageNumber from '../utils/getPageNumber';
import {IssuerModel} from './issuer.model';

export class IssuersList extends HalResource {
    @HalProperty('item', IssuerModel) public items?: IssuerModel[];
    @HalProperty(IssuersList) public first?: IssuersList;
    @HalProperty(IssuersList) public last?: IssuersList;
    @HalProperty(IssuersList) public prev?: IssuersList;
    @HalProperty(IssuersList) public next?: IssuersList;
    @HalProperty() public totalItems: number;
    @HalProperty() public itemsPerPage: number;

    public get page(): number {
        return getPageNumber(this) || 0;
    }
}
