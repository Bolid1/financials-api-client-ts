import {HalProperty, HalResource} from 'hal-rest-client';

export class CurrencyModel extends HalResource {
  @HalProperty() public id: string;
  @HalProperty() public sign?: string;
}
