import * as test from 'tape-async';
import {IssuerModel} from '..';
import setupServer from './utils/setupServer';

// mock responses
function initTests() {
    return setupServer(testServer => {
        const issuers = {
            _links: {
                self: {
                    href: '/issuers?page=1',
                },
                first: {
                    href: '/issuers?page=1',
                },
                last: {
                    href: '/issuers?page=8',
                },
                next: {
                    href: '/issuers?page=2',
                },
                item: [
                    {
                        href: '/issuers/470',
                    },
                    {
                        href: '/issuers/471',
                    },
                    {
                        href: '/issuers/472',
                    },
                    {
                        href: '/issuers/473',
                    },
                ],
            },
            totalItems: 234,
            itemsPerPage: 30,
            _embedded: {
                item: [
                    {
                        _links: {
                            self: {
                                href: '/issuers/470',
                            },
                            bonds: [
                                {
                                    href: '/bonds/RU000A1002Z3',
                                },
                                {
                                    href: '/bonds/RU000A1000P8',
                                },
                                {
                                    href: '/bonds/RU000A0ZZWR6',
                                },
                            ],
                        },
                        id: 470,
                        name: 'Центральный Банк Российской Федерации',
                        type: 1,
                    },
                    {
                        _links: {
                            self: {
                                href: '/issuers/471',
                            },
                        },
                        id: 471,
                        name: 'РЖД',
                        type: 3,
                    },
                    {
                        _links: {
                            self: {
                                href: '/issuers/472',
                            },
                        },
                        id: 472,
                        name: 'Ижсталь',
                        type: 3,
                    },
                    {
                        _links: {
                            self: {
                                href: '/issuers/473',
                            },
                        },
                        id: 473,
                        name: 'Открытое акционерное общество Белон',
                        type: 3,
                    },
                ],
            },
        };

        testServer.get('/issuers?page=2').reply(200, () => {
            const response = JSON.parse(JSON.stringify(issuers));
            Object.assign(response._links, {
                self: {
                    href: '/issuers?page=2',
                },
                first: {
                    href: '/issuers?page=1',
                },
                last: {
                    href: '/issuers?page=8',
                },
                prev: {
                    href: '/issuers?page=1',
                },
                next: {
                    href: '/issuers?page=3',
                },
            });

            return JSON.stringify(response);
        });
    });
}

test('fetch issuers', async t => {
    const client = initTests();
    const value = await client.fetchIssuers({page: 2});
    t.equal(value.uri.uri, '/issuers?page=2');
    t.true(Array.isArray(value.items));
    t.true(value.items[0] instanceof IssuerModel);
    t.strictEqual(value.page, 2);
    t.strictEqual(value.first.page, 1);
    t.strictEqual(value.last.page, 8);
    t.strictEqual(value.prev.page, 1);
    t.strictEqual(value.next.page, 3);
});
