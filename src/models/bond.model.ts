import {HalProperty, HalResource} from 'hal-rest-client';
import {IBond} from '../interfaces/IBond';
import {AmortizationModel} from './amortization.model';
import {CouponModel} from './coupon.model';
import {CurrencyModel} from './currency.model';
import {IssuerModel} from './issuer.model';

export class BondModel extends HalResource implements IBond {
    @HalProperty() public ISIN: string;
    @HalProperty(IssuerModel) public issuer: IssuerModel;
    @HalProperty(CurrencyModel) public currency: CurrencyModel;
    @HalProperty() public name: string;
    @HalProperty() public offerEnd?: Date;
    @HalProperty() public maturity: Date;
    @HalProperty() public faceValue: number;
    @HalProperty() public quantity: number;
    @HalProperty(AmortizationModel) public amortizations?: AmortizationModel[];
    @HalProperty(CouponModel) public coupons?: CouponModel[];
}
