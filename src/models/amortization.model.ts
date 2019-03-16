import {HalProperty, HalResource} from 'hal-rest-client';
import {IAmortization} from '../interfaces/IAmortization';
import {BondModel} from './bond.model';

export class AmortizationModel extends HalResource implements IAmortization {
    @HalProperty() public id: number;
    @HalProperty(BondModel) public bond: BondModel;
    @HalProperty() public date: Date;
    @HalProperty() public value: number;
}
