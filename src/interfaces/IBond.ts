import {IAmortization} from './IAmortization';
import {ICoupon} from './ICoupon';
import {ICurrency} from './ICurrency';
import {IIssuer} from './IIssuer';

export interface IBond {
    ISIN?: string;
    issuer?: IIssuer;
    currency?: ICurrency;
    name: string;
    offerEnd: Date | null;
    maturity: Date | null;
    faceValue: number;
    quantity: number;
    amortizations?: IAmortization[];
    coupons?: ICoupon[];
}
