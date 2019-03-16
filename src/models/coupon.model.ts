import {HalProperty, HalResource} from 'hal-rest-client';
import {ICoupon} from '../interfaces/ICoupon';
import {BondModel} from './bond.model';

export class CouponModel extends HalResource implements ICoupon {
  @HalProperty() public id: number;
  @HalProperty(BondModel) public bond: BondModel;
  @HalProperty() public date: Date;
  @HalProperty() public value: number;
}
