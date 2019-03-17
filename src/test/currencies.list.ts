import * as test from 'tape-async';
import {CurrencyModel} from '..';
import setupServer from './utils/setupServer';

// mock responses
function initTests() {
    return setupServer(testServer => {
        const currencies = {
            _links: {
                self: {
                    href: '/currencies',
                },
                item: [
                    {
                        href: '/currencies/RUB',
                    },
                    {
                        href: '/currencies/USD',
                    },
                ],
            },
            totalItems: 2,
            itemsPerPage: 30,
            _embedded: {
                item: [
                    {
                        _links: {
                            self: {
                                href: '/currencies/RUB',
                            },
                        },
                        id: 'RUB',
                        sign: '₽',
                    },
                    {
                        _links: {
                            self: {
                                href: '/currencies/USD',
                            },
                        },
                        id: 'USD',
                        sign: '$',
                    },
                ],
            },
        };

        testServer.get('/currencies?page=2').reply(200, () => {
            const response = JSON.parse(JSON.stringify(currencies));
            Object.assign(response._links, {
                self: {
                    href: '/currencies?page=2',
                },
                first: {
                    href: '/currencies?page=1',
                },
                last: {
                    href: '/currencies?page=8',
                },
                prev: {
                    href: '/currencies?page=1',
                },
                next: {
                    href: '/currencies?page=3',
                },
            });

            return JSON.stringify(response);
        });
    });
}

test('fetch currencies', async t => {
    const client = initTests();
    const value = await client.fetchCurrencies({page: 2});
    t.equal(value.uri.uri, '/currencies?page=2');
    t.true(Array.isArray(value.items));
    t.true(value.items[0] instanceof CurrencyModel);
    t.strictEqual(value.page, 2);
    t.strictEqual(value.first.page, 1);
    t.strictEqual(value.last.page, 8);
    t.strictEqual(value.prev.page, 1);
    t.strictEqual(value.next.page, 3);
});
