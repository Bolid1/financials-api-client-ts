import {HalProperty, HalResource} from 'hal-rest-client';
import {BondModel} from './bond.model';

export class BondsList extends HalResource {
    @HalProperty('item', BondModel) public items?: BondModel[];
    @HalProperty(BondsList) public first?: BondsList;
    @HalProperty(BondsList) public last?: BondsList;
    @HalProperty(BondsList) public prev?: BondsList;
    @HalProperty(BondsList) public next?: BondsList;
    @HalProperty() public totalItems: number;
    @HalProperty() public itemsPerPage: number;
}
