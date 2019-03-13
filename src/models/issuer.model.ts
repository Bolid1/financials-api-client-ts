import {HalProperty, HalResource} from 'hal-rest-client';
import {BondModel} from './bond.model';

export class IssuerModel extends HalResource {
  @HalProperty() public id: number;
  @HalProperty() public name: string;
  @HalProperty() public type: number;
  @HalProperty(BondModel) public bonds?: BondModel[];
}
