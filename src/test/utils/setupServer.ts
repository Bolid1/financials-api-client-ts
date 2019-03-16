import {resetCache} from 'hal-rest-client';
import * as nock from 'nock';
import {Client} from '../../client';

const baseURL = 'http://financials.test';

export default function setupServer(setup: (testServer: nock.Scope) => void): Client {
    nock.cleanAll();
    resetCache();

    const testServer = nock(baseURL, {
        reqheaders: {
            Accept: 'application/hal+json',
        },
    });

    setup(testServer);

    return new Client(baseURL);
}
