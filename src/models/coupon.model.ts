import {HalProperty, HalResource} from 'hal-rest-client';
import {BondModel} from './bond.model';

export class CouponModel extends HalResource {
  @HalProperty() public id: number;
  @HalProperty(BondModel) public bond: BondModel;
  @HalProperty() public date: Date;
  @HalProperty() public value: number;
}
