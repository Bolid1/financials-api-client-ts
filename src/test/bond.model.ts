import * as test from 'tape-async';
import {BondModel, IBond} from '..';
import setupServer from './utils/setupServer';

const bondISIN = 'RU000A0ZZWR6';

const bond = {
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
    maturity: new Date('2019-03-13T00:00:00+00:00'),
    faceValue: 1000,
    quantity: 0,
};

const newData = {
    ISIN: bondISIN,
    name: 'Test',
    offerEnd: new Date('2019-03-15T00:00:00+00:00'),
    maturity: new Date('2019-03-11T00:00:00+00:00'),
    faceValue: 123,
    quantity: 523,
};

function checkBondEqual(t: test.Test, value: BondModel, equalTo: IBond) {
    Object
        .keys(equalTo)
        .filter(key => key !== '_links')
        .forEach(key => {
            const message = `${key} should be equal`;

            if (['offerEnd', 'maturity'].indexOf(key) !== -1) {
                if (equalTo[key] === null) {
                    return t.strictEqual(value[key], null, message);
                }

                t.true(value[key] instanceof Date, `${key} must be instanceof Date`);

                const eqDate = equalTo[key] instanceof Date ? equalTo[key] : new Date(equalTo[key]);

                return t.strictEqual(String(value[key]), String(eqDate), message);
            }

            t.strictEqual(value[key], equalTo[key], message);
        });
}

test('fetch bond', async t => {
    const client = setupServer(testServer => {
        testServer.get('/bonds/' + bondISIN).reply(200, () => JSON.parse(JSON.stringify(bond)));
    });

    const value = await client.fetchBond(bondISIN);
    t.true(value instanceof BondModel);
    t.equal(value.uri.uri, '/bonds/' + bondISIN);
    checkBondEqual(t, value, bond);
});

test('put bond', async t => {
    let called = false;
    const client = setupServer(testServer => {
        testServer.put('/bonds/' + bondISIN).reply(
            200,
            (uri, body) => {
                called = true;
                t.deepEquals(body, JSON.stringify(newData));

                return Object.assign(JSON.parse(JSON.stringify(bond)), newData);
            },
        );
    });

    t.false(called);
    try {
        const value = await client.saveBond(newData, true);

        t.true(value instanceof BondModel);
        t.true(called);
        t.equal(value.uri.uri, '/bonds/' + bondISIN);
        checkBondEqual(t, value, newData);
    } catch (exception) {
        return t.fail(String(exception));
    }
});

test('patch bond', async t => {
    let called = false;
    const client = setupServer(testServer => {
        testServer.patch('/bonds/' + bondISIN).reply(
            200,
            (uri, body) => {
                called = true;
                t.deepEquals(body, JSON.stringify(newData));

                return Object.assign(JSON.parse(JSON.stringify(bond)), newData);
            },
        );
    });

    t.false(called);
    try {
        const value = await client.saveBond(newData, false);

        t.true(value instanceof BondModel);
        t.true(called);
        t.equal(value.uri.uri, '/bonds/' + bondISIN);
        checkBondEqual(t, value, newData);
    } catch (exception) {
        return t.fail(String(exception));
    }
});
