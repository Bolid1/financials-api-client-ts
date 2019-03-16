import {HalRestClient} from 'hal-rest-client';
import {IIssuer} from './interfaces/IIssuer';
import {IssuerModel} from './models/issuer.model';
import {IssuersList} from './models/issuers.list';
import {ResourcesModel} from './models/resources.model';

export interface IssuerListQueryParams {
    page?: number;
}

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

    public fetchIssuers(query: IssuerListQueryParams = {}): Promise<IssuersList> {
        const params = new URLSearchParams();
        Object.keys(query)
            .forEach(key => {
                params.append(key, query[key]);
            });

        return this.fetch('/issuers?' + String(params), IssuersList);
    }

    public fetchIssuer(id: number): Promise<IssuerModel> {
        return this.fetch('/issuers/' + Number(id), IssuerModel);
    }

    public saveIssuer(issuer: IIssuer, full?: boolean): Promise<IssuerModel> {
        if (!issuer.id) {
            return this.create('/issuers', issuer, IssuerModel);
        }

        return this.update('/issuers/' + Number(issuer.id), issuer, full, IssuerModel);
    }
}
