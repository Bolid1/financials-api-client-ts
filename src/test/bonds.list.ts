import * as test from 'tape-async';
import {BondModel} from '..';
import setupServer from './utils/setupServer';

// mock responses
function initTests() {
    return setupServer(testServer => {
        const bonds = {
            _links: {
                first: {
                    href: '/bonds?page=1',
                },
                last: {
                    href: '/bonds?page=2',
                },
                next: {
                    href: '/bonds?page=2',
                },
                item: [
                    {
                        href: '/bonds/RU000A0ZZWR6',
                    },
                    {
                        href: '/bonds/RU000A1000P8',
                    },
                    {
                        href: '/bonds/RU000A1002Z3',
                    },
                ],
            },
            _embedded: {
                item: [
                    {
                        _links: {
                            currency: {
                                href: '/currencies/RUB',
                            },
                            issuer: {
                                href: '/issuers/470',
                            },
                            self: {
                                href: '/bonds/RU000A0ZZWR6',
                            },
                        },
                        ISIN: 'RU000A0ZZWR6',
                        name: 'КОБР-16',
                        offerEnd: null,
                        maturity: '2019-03-13T00:00:00+00:00',
                        faceValue: 1000,
                        quantity: 0,
                    },
                    {
                        _links: {
                            self: {
                                href: '/bonds/RU000A1000P8',
                            },
                            issuer: {
                                href: '/issuers/470',
                            },
                            currency: {
                                href: '/currencies/RUB',
                            },
                        },
                        ISIN: 'RU000A1000P8',
                        name: 'КОБР-17',
                        offerEnd: null,
                        maturity: '2019-04-17T00:00:00+00:00',
                        faceValue: 1000,
                        quantity: 0,
                    },
                    {
                        _links: {
                            self: {
                                href: '/bonds/RU000A1002Z3',
                            },
                            issuer: {
                                href: '/issuers/470',
                            },
                            currency: {
                                href: '/currencies/RUB',
                            },
                        },
                        ISIN: 'RU000A1002Z3',
                        name: 'КОБР-18',
                        offerEnd: null,
                        maturity: '2019-05-15T00:00:00+00:00',
                        faceValue: 1000,
                        quantity: 0,
                    },
                ],
            },
            self: {
                href: '/bonds?page=1',
            },
            itemsPerPage: 30,
            totalItems: 41,
        };

        testServer.get('/bonds?page=2').reply(200, () => {
            const response = JSON.parse(JSON.stringify(bonds));
            Object.assign(response._links, {
                self: {
                    href: '/bonds?page=2',
                },
                first: {
                    href: '/bonds?page=1',
                },
                last: {
                    href: '/bonds?page=8',
                },
                prev: {
                    href: '/bonds?page=1',
                },
                next: {
                    href: '/bonds?page=3',
                },
            });

            return JSON.stringify(response);
        });
    });
}

test('fetch bonds', async t => {
    const client = initTests();
    const value = await client.fetchBonds({page: 2});
    t.equal(value.uri.uri, '/bonds?page=2');
    t.true(Array.isArray(value.items));
    t.true(value.items[0] instanceof BondModel);
    t.strictEqual(value.page, 2);
    t.strictEqual(value.first.page, 1);
    t.strictEqual(value.last.page, 8);
    t.strictEqual(value.prev.page, 1);
    t.strictEqual(value.next.page, 3);
    for (let i = 0; i < value.items.length - 1; ++i) {
        for (let j = i + 1; j < value.items.length; ++j) {
            t.equal(value.items[i].currency, value.items[j].currency);
            t.equal(value.items[i].issuer, value.items[j].issuer);
        }
    }
});
