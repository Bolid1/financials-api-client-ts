import {HalProperty, HalResource} from 'hal-rest-client';
import {AmortizationsList} from './amortizations.list';
import {BondsList} from './bonds.list';
import {CouponsList} from './coupons.list';
import {CurrenciesList} from './currencies.list';
import {IssuersList} from './issuers.list';

export class ResourcesModel extends HalResource {
    @HalProperty('amortization', AmortizationsList) public amortizations: AmortizationsList;
    @HalProperty('bond', BondsList) public bonds: BondsList;
    @HalProperty('coupon', CouponsList) public coupons: CouponsList;
    @HalProperty('currency', CurrenciesList) public currencies: CurrenciesList;
    @HalProperty('issuer', IssuersList) public issuers: IssuersList;
}
