import {HalProperty, HalResource} from 'hal-rest-client';
import {IBond} from '..';
import {CurrencyModel} from './currency.model';
import {IssuerModel} from './issuer.model';

export class BondModel extends HalResource implements IBond {
    @HalProperty() public ISIN: string;
    @HalProperty(IssuerModel) public issuer: IssuerModel;
    @HalProperty(CurrencyModel) public currency: CurrencyModel;
    @HalProperty() public name: string;
    @HalProperty('offerEnd') public offerEndStr?: string | null;
    @HalProperty('maturity') public maturityStr: string;
    @HalProperty() public faceValue: number;
    @HalProperty() public quantity: string;

    get offerEnd(): Date | null {
        return this.offerEndStr ? new Date(this.offerEndStr) : null;
    }

    get maturity(): Date | null {
        return this.maturityStr ? new Date(this.maturityStr) : null;
    }
}
