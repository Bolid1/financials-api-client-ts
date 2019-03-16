import {HalResource} from 'hal-rest-client';
import * as test from 'tape-async';
import {AmortizationsList, BondsList, CouponsList, CurrenciesList, IssuersList, ResourcesModel} from '../';
import setupServer from './utils/setupServer';

const baseURL = 'http://financials.test';

// mock responses
function initTests() {
    return setupServer(testServer => {

        const schema = {
            _links: {
                amortization: {
                    href: '/amortizations',
                },
                bond: {
                    href: '/bonds',
                },
                coupon: {
                    href: '/coupons',
                },
                currency: {
                    href: '/currencies',
                },
                issuer: {
                    href: '/issuers',
                },
                self: {
                    href: '/',
                },
            },
        };
        const amortizations = {
            _links: {
                self: {
                    href: '/amortizations',
                },
            },
            itemsPerPage: 30,
            totalItems: 0,
        };
        const bonds = {
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
                    {
                        _links: {
                            self: {
                                href: '/bonds/SU24019RMFS0',
                            },
                            issuer: {
                                href: '/issuers/469',
                            },
                            currency: {
                                href: '/currencies/RUB',
                            },
                        },
                        ISIN: 'SU24019RMFS0',
                        name: 'ОФЗ 24019',
                        offerEnd: null,
                        maturity: '2019-10-16T00:00:00+00:00',
                        faceValue: 1000,
                        quantity: 0,
                    },
                    {
                        _links: {
                            self: {
                                href: '/bonds/SU25083RMFS5',
                            },
                            issuer: {
                                href: '/issuers/469',
                            },
                            currency: {
                                href: '/currencies/RUB',
                            },
                        },
                        ISIN: 'SU25083RMFS5',
                        name: 'ОФЗ 25083',
                        offerEnd: null,
                        maturity: '2021-12-15T00:00:00+00:00',
                        faceValue: 1000,
                        quantity: 0,
                    },
                    {
                        _links: {
                            self: {
                                href: '/bonds/SU26205RMFS3',
                            },
                            issuer: {
                                href: '/issuers/469',
                            },
                            currency: {
                                href: '/currencies/RUB',
                            },
                        },
                        ISIN: 'SU26205RMFS3',
                        name: 'ОФЗ 26205',
                        offerEnd: null,
                        maturity: '2021-04-14T00:00:00+00:00',
                        faceValue: 1000,
                        quantity: 0,
                    },
                    {
                        _links: {
                            self: {
                                href: '/bonds/SU26207RMFS9',
                            },
                            issuer: {
                                href: '/issuers/469',
                            },
                            currency: {
                                href: '/currencies/RUB',
                            },
                        },
                        ISIN: 'SU26207RMFS9',
                        name: 'ОФЗ 26207',
                        offerEnd: null,
                        maturity: '2027-02-03T00:00:00+00:00',
                        faceValue: 1000,
                        quantity: 0,
                    },
                    {
                        _links: {
                            self: {
                                href: '/bonds/SU26208RMFS7',
                            },
                            issuer: {
                                href: '/issuers/469',
                            },
                            currency: {
                                href: '/currencies/RUB',
                            },
                        },
                        ISIN: 'SU26208RMFS7',
                        name: 'ОФЗ 26208',
                        offerEnd: null,
                        maturity: '2019-02-27T00:00:00+00:00',
                        faceValue: 1000,
                        quantity: 0,
                    },
                    {
                        _links: {
                            self: {
                                href: '/bonds/SU26209RMFS5',
                            },
                            issuer: {
                                href: '/issuers/469',
                            },
                            currency: {
                                href: '/currencies/RUB',
                            },
                        },
                        ISIN: 'SU26209RMFS5',
                        name: 'ОФЗ 26209',
                        offerEnd: null,
                        maturity: '2022-07-20T00:00:00+00:00',
                        faceValue: 1000,
                        quantity: 0,
                    },
                    {
                        _links: {
                            self: {
                                href: '/bonds/SU26210RMFS3',
                            },
                            issuer: {
                                href: '/issuers/469',
                            },
                            currency: {
                                href: '/currencies/RUB',
                            },
                        },
                        ISIN: 'SU26210RMFS3',
                        name: 'ОФЗ 26210',
                        offerEnd: null,
                        maturity: '2019-12-11T00:00:00+00:00',
                        faceValue: 1000,
                        quantity: 0,
                    },
                    {
                        _links: {
                            self: {
                                href: '/bonds/SU26211RMFS1',
                            },
                            issuer: {
                                href: '/issuers/469',
                            },
                            currency: {
                                href: '/currencies/RUB',
                            },
                        },
                        ISIN: 'SU26211RMFS1',
                        name: 'ОФЗ 26211',
                        offerEnd: null,
                        maturity: '2023-01-25T00:00:00+00:00',
                        faceValue: 1000,
                        quantity: 0,
                    },
                    {
                        _links: {
                            self: {
                                href: '/bonds/SU26212RMFS9',
                            },
                            issuer: {
                                href: '/issuers/469',
                            },
                            currency: {
                                href: '/currencies/RUB',
                            },
                        },
                        ISIN: 'SU26212RMFS9',
                        name: 'ОФЗ 26212',
                        offerEnd: null,
                        maturity: '2028-01-19T00:00:00+00:00',
                        faceValue: 1000,
                        quantity: 0,
                    },
                    {
                        _links: {
                            self: {
                                href: '/bonds/SU26214RMFS5',
                            },
                            issuer: {
                                href: '/issuers/469',
                            },
                            currency: {
                                href: '/currencies/RUB',
                            },
                        },
                        ISIN: 'SU26214RMFS5',
                        name: 'ОФЗ 26214',
                        offerEnd: null,
                        maturity: '2020-05-27T00:00:00+00:00',
                        faceValue: 1000,
                        quantity: 0,
                    },
                    {
                        _links: {
                            self: {
                                href: '/bonds/SU26215RMFS2',
                            },
                            issuer: {
                                href: '/issuers/469',
                            },
                            currency: {
                                href: '/currencies/RUB',
                            },
                        },
                        ISIN: 'SU26215RMFS2',
                        name: 'ОФЗ 26215',
                        offerEnd: null,
                        maturity: '2023-08-16T00:00:00+00:00',
                        faceValue: 1000,
                        quantity: 0,
                    },
                    {
                        _links: {
                            self: {
                                href: '/bonds/SU26216RMFS0',
                            },
                            issuer: {
                                href: '/issuers/469',
                            },
                            currency: {
                                href: '/currencies/RUB',
                            },
                        },
                        ISIN: 'SU26216RMFS0',
                        name: 'ОФЗ 26216',
                        offerEnd: null,
                        maturity: '2019-05-15T00:00:00+00:00',
                        faceValue: 1000,
                        quantity: 0,
                    },
                    {
                        _links: {
                            self: {
                                href: '/bonds/SU26217RMFS8',
                            },
                            issuer: {
                                href: '/issuers/469',
                            },
                            currency: {
                                href: '/currencies/RUB',
                            },
                        },
                        ISIN: 'SU26217RMFS8',
                        name: 'ОФЗ 26217',
                        offerEnd: null,
                        maturity: '2021-08-18T00:00:00+00:00',
                        faceValue: 1000,
                        quantity: 0,
                    },
                    {
                        _links: {
                            self: {
                                href: '/bonds/SU26218RMFS6',
                            },
                            issuer: {
                                href: '/issuers/469',
                            },
                            currency: {
                                href: '/currencies/RUB',
                            },
                        },
                        ISIN: 'SU26218RMFS6',
                        name: 'ОФЗ 26218',
                        offerEnd: null,
                        maturity: '2031-09-17T00:00:00+00:00',
                        faceValue: 1000,
                        quantity: 0,
                    },
                    {
                        _links: {
                            self: {
                                href: '/bonds/SU26219RMFS4',
                            },
                            issuer: {
                                href: '/issuers/469',
                            },
                            currency: {
                                href: '/currencies/RUB',
                            },
                        },
                        ISIN: 'SU26219RMFS4',
                        name: 'ОФЗ 26219',
                        offerEnd: null,
                        maturity: '2026-09-16T00:00:00+00:00',
                        faceValue: 1000,
                        quantity: 0,
                    },
                    {
                        _links: {
                            self: {
                                href: '/bonds/SU26220RMFS2',
                            },
                            issuer: {
                                href: '/issuers/469',
                            },
                            currency: {
                                href: '/currencies/RUB',
                            },
                        },
                        ISIN: 'SU26220RMFS2',
                        name: 'ОФЗ 26220',
                        offerEnd: null,
                        maturity: '2022-12-07T00:00:00+00:00',
                        faceValue: 1000,
                        quantity: 0,
                    },
                    {
                        _links: {
                            self: {
                                href: '/bonds/SU26221RMFS0',
                            },
                            issuer: {
                                href: '/issuers/469',
                            },
                            currency: {
                                href: '/currencies/RUB',
                            },
                        },
                        ISIN: 'SU26221RMFS0',
                        name: 'ОФЗ 26221',
                        offerEnd: null,
                        maturity: '2033-03-23T00:00:00+00:00',
                        faceValue: 1000,
                        quantity: 0,
                    },
                    {
                        _links: {
                            self: {
                                href: '/bonds/SU26222RMFS8',
                            },
                            issuer: {
                                href: '/issuers/469',
                            },
                            currency: {
                                href: '/currencies/RUB',
                            },
                        },
                        ISIN: 'SU26222RMFS8',
                        name: 'ОФЗ 26222',
                        offerEnd: null,
                        maturity: '2024-10-16T00:00:00+00:00',
                        faceValue: 1000,
                        quantity: 0,
                    },
                    {
                        _links: {
                            self: {
                                href: '/bonds/SU26223RMFS6',
                            },
                            issuer: {
                                href: '/issuers/469',
                            },
                            currency: {
                                href: '/currencies/RUB',
                            },
                        },
                        ISIN: 'SU26223RMFS6',
                        name: 'ОФЗ 26223',
                        offerEnd: null,
                        maturity: '2024-02-28T00:00:00+00:00',
                        faceValue: 1000,
                        quantity: 0,
                    },
                    {
                        _links: {
                            self: {
                                href: '/bonds/SU26224RMFS4',
                            },
                            issuer: {
                                href: '/issuers/469',
                            },
                            currency: {
                                href: '/currencies/RUB',
                            },
                        },
                        ISIN: 'SU26224RMFS4',
                        name: 'ОФЗ 26224',
                        offerEnd: null,
                        maturity: '2029-05-23T00:00:00+00:00',
                        faceValue: 1000,
                        quantity: 0,
                    },
                    {
                        _links: {
                            self: {
                                href: '/bonds/SU26225RMFS1',
                            },
                            issuer: {
                                href: '/issuers/469',
                            },
                            currency: {
                                href: '/currencies/RUB',
                            },
                        },
                        ISIN: 'SU26225RMFS1',
                        name: 'ОФЗ 26225',
                        offerEnd: null,
                        maturity: '2034-05-10T00:00:00+00:00',
                        faceValue: 1000,
                        quantity: 0,
                    },
                    {
                        _links: {
                            self: {
                                href: '/bonds/SU26226RMFS9',
                            },
                            issuer: {
                                href: '/issuers/469',
                            },
                            currency: {
                                href: '/currencies/RUB',
                            },
                        },
                        ISIN: 'SU26226RMFS9',
                        name: 'ОФЗ 26226',
                        offerEnd: null,
                        maturity: '2026-10-07T00:00:00+00:00',
                        faceValue: 1000,
                        quantity: 0,
                    },
                    {
                        _links: {
                            self: {
                                href: '/bonds/SU29006RMFS2',
                            },
                            issuer: {
                                href: '/issuers/469',
                            },
                            currency: {
                                href: '/currencies/RUB',
                            },
                        },
                        ISIN: 'SU29006RMFS2',
                        name: 'ОФЗ 29006',
                        offerEnd: null,
                        maturity: '2025-01-29T00:00:00+00:00',
                        faceValue: 1000,
                        quantity: 0,
                    },
                    {
                        _links: {
                            self: {
                                href: '/bonds/SU29007RMFS0',
                            },
                            issuer: {
                                href: '/issuers/469',
                            },
                            currency: {
                                href: '/currencies/RUB',
                            },
                        },
                        ISIN: 'SU29007RMFS0',
                        name: 'ОФЗ 29007',
                        offerEnd: null,
                        maturity: '2027-03-03T00:00:00+00:00',
                        faceValue: 1000,
                        quantity: 0,
                    },
                    {
                        _links: {
                            self: {
                                href: '/bonds/SU29008RMFS8',
                            },
                            issuer: {
                                href: '/issuers/469',
                            },
                            currency: {
                                href: '/currencies/RUB',
                            },
                        },
                        ISIN: 'SU29008RMFS8',
                        name: 'ОФЗ 29008',
                        offerEnd: null,
                        maturity: '2029-10-03T00:00:00+00:00',
                        faceValue: 1000,
                        quantity: 0,
                    },
                    {
                        _links: {
                            self: {
                                href: '/bonds/SU29009RMFS6',
                            },
                            issuer: {
                                href: '/issuers/469',
                            },
                            currency: {
                                href: '/currencies/RUB',
                            },
                        },
                        ISIN: 'SU29009RMFS6',
                        name: 'ОФЗ 29009',
                        offerEnd: null,
                        maturity: '2032-05-05T00:00:00+00:00',
                        faceValue: 1000,
                        quantity: 0,
                    },
                    {
                        _links: {
                            self: {
                                href: '/bonds/SU29010RMFS4',
                            },
                            issuer: {
                                href: '/issuers/469',
                            },
                            currency: {
                                href: '/currencies/RUB',
                            },
                        },
                        ISIN: 'SU29010RMFS4',
                        name: 'ОФЗ 29010',
                        offerEnd: null,
                        maturity: '2034-12-06T00:00:00+00:00',
                        faceValue: 1000,
                        quantity: 0,
                    },
                ],
            },
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
                    {
                        href: '/bonds/SU24019RMFS0',
                    },
                    {
                        href: '/bonds/SU25083RMFS5',
                    },
                    {
                        href: '/bonds/SU26205RMFS3',
                    },
                    {
                        href: '/bonds/SU26207RMFS9',
                    },
                    {
                        href: '/bonds/SU26208RMFS7',
                    },
                    {
                        href: '/bonds/SU26209RMFS5',
                    },
                    {
                        href: '/bonds/SU26210RMFS3',
                    },
                    {
                        href: '/bonds/SU26211RMFS1',
                    },
                    {
                        href: '/bonds/SU26212RMFS9',
                    },
                    {
                        href: '/bonds/SU26214RMFS5',
                    },
                    {
                        href: '/bonds/SU26215RMFS2',
                    },
                    {
                        href: '/bonds/SU26216RMFS0',
                    },
                    {
                        href: '/bonds/SU26217RMFS8',
                    },
                    {
                        href: '/bonds/SU26218RMFS6',
                    },
                    {
                        href: '/bonds/SU26219RMFS4',
                    },
                    {
                        href: '/bonds/SU26220RMFS2',
                    },
                    {
                        href: '/bonds/SU26221RMFS0',
                    },
                    {
                        href: '/bonds/SU26222RMFS8',
                    },
                    {
                        href: '/bonds/SU26223RMFS6',
                    },
                    {
                        href: '/bonds/SU26224RMFS4',
                    },
                    {
                        href: '/bonds/SU26225RMFS1',
                    },
                    {
                        href: '/bonds/SU26226RMFS9',
                    },
                    {
                        href: '/bonds/SU29006RMFS2',
                    },
                    {
                        href: '/bonds/SU29007RMFS0',
                    },
                    {
                        href: '/bonds/SU29008RMFS8',
                    },
                    {
                        href: '/bonds/SU29009RMFS6',
                    },
                    {
                        href: '/bonds/SU29010RMFS4',
                    },
                ],
            },
            self: {
                href: '/bonds?page=1',
            },
            itemsPerPage: 30,
            totalItems: 41,
        };

        const coupons = {
            _links: {
                self: {
                    href: '/coupons',
                },
            },
            totalItems: 0,
            itemsPerPage: 30,
        };
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

        testServer.get('/').reply(200, JSON.stringify(schema));

        testServer.get(schema._links.amortization.href).reply(200, JSON.stringify(amortizations));
        testServer.get(schema._links.bond.href).reply(200, JSON.stringify(bonds));
        testServer.get(schema._links.coupon.href).reply(200, JSON.stringify(coupons));
        testServer.get(schema._links.currency.href).reply(200, JSON.stringify(currencies));
        testServer.get(schema._links.issuer.href).reply(200, JSON.stringify(issuers));
    });
}

test('fetch contains list', async t => {
    const client = initTests();
    const value = await client.resources;
    t.true(value instanceof HalResource, 'Got resource');
    t.true(value instanceof ResourcesModel, 'Got resource');
    t.equals(value.uri.fetchedURI, baseURL + '/', 'fetchedURI is in base');
    t.equals(value.uri.uri, '/', 'uri is in base');
    t.true(value.amortizations instanceof AmortizationsList, 'Got amortizations list');
    t.true(value.bonds instanceof BondsList, 'Got bonds list');
    t.true(value.coupons instanceof CouponsList, 'Got coupons list');
    t.true(value.currencies instanceof CurrenciesList, 'Got currencies list');
    t.true(value.issuers instanceof IssuersList, 'Got issuers list');
});
