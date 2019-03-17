import {HalRestClient} from 'hal-rest-client';
import {IBond} from './interfaces/IBond';
import {IBondsListQueryParams} from './interfaces/IBondsListQueryParams';
import {ICurrenciesListQueryParams} from './interfaces/ICurrenciesListQueryParams';
import {ICurrency} from './interfaces/ICurrency';
import {IIssuer} from './interfaces/IIssuer';
import {IIssuersListQueryParams} from './interfaces/IIssuersListQueryParams';
import {BondModel} from './models/bond.model';
import {BondsList} from './models/bonds.list';
import {CurrenciesList} from './models/currencies.list';
import {CurrencyModel} from './models/currency.model';
import {IssuerModel} from './models/issuer.model';
import {IssuersList} from './models/issuers.list';
import {ResourcesModel} from './models/resources.model';

/**
 * REST client
 */
export class Client extends HalRestClient {
    constructor(baseURL: string) {
        super(baseURL, {
            headers: {
                Accept: 'application/hal+json',
            },
        });
    }

    /**
     * @return {Promise<ResourcesModel>}
     */
    get resources() {
        return this.fetch('/', ResourcesModel);
    }

    public fetchIssuers(query: IIssuersListQueryParams = {}): Promise<IssuersList> {
        const params = new URLSearchParams();
        Object.keys(query)
            .forEach(key => {
                params.append(key, query[key]);
            });

        return this.fetch(`/issuers?${String(params)}`, IssuersList);
    }

    public fetchIssuer(id: number): Promise<IssuerModel> {
        return this.fetch(`/issuers/${Number(id)}`, IssuerModel);
    }

    public saveIssuer(issuer: IIssuer, full?: boolean): Promise<IssuerModel> {
        if (!issuer.id) {
            return this.create('/issuers', issuer, IssuerModel);
        }

        return this.update(`/issuers/${Number(issuer.id)}`, issuer, full, IssuerModel);
    }

    public fetchBonds(query: IBondsListQueryParams = {}): Promise<BondsList> {
        const params = new URLSearchParams();
        Object.keys(query)
            .forEach(key => {
                params.append(key, query[key]);
            });

        return this.fetch(`/bonds?${String(params)}`, BondsList);
    }

    public fetchBond(ISIN: string): Promise<BondModel> {
        return this.fetch(`/bonds/${ISIN}`, BondModel);
    }

    public saveBond(bond: IBond, full?: boolean): Promise<BondModel> {
        return this.update(`/bonds/${bond.ISIN}`, bond, full, BondModel);
    }

    public fetchCurrencies(query: ICurrenciesListQueryParams = {}): Promise<CurrenciesList> {
        const params = new URLSearchParams();
        Object.keys(query)
            .forEach(key => {
                params.append(key, query[key]);
            });

        return this.fetch(`/currencies?${String(params)}`, CurrenciesList);
    }

    public fetchCurrency(id: string): Promise<CurrencyModel> {
        return this.fetch(`/currencies/${id}`, CurrencyModel);
    }

    public saveCurrency(bond: ICurrency, full?: boolean): Promise<CurrencyModel> {
        return this.update(`/currencies/${bond.id}`, bond, full, CurrencyModel);
    }
}
