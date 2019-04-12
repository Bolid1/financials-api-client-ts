import * as test from 'tape-async';
import {CurrencyModel, ICurrency} from '..';
import setupServer from './utils/setupServer';

const currencyId = 'RUB';

const currency = {
    _links: {
        self: {
            href: '/currencies/RUB',
        },
    },
    code: 'RUB',
    sign: '₽',
};

const newData = {
    code: 'RUB',
    sign: '$',
};

function checkCurrencyEqual(t: test.Test, value: CurrencyModel, equalTo: ICurrency) {
    Object
        .keys(equalTo)
        .filter(key => key !== '_links')
        .forEach(key => {
            const message = `${key} should be equal`;

            t.strictEqual(value[key], equalTo[key], message);
        });
}

test('fetch currency', async t => {
    const client = setupServer(testServer => {
        testServer.get('/currencies/' + currencyId).reply(200, () => JSON.parse(JSON.stringify(currency)));
    });

    const value = await client.fetchCurrency(currencyId);
    t.true(value instanceof CurrencyModel);
    t.equal(value.uri.uri, '/currencies/' + currencyId);
    checkCurrencyEqual(t, value, currency);
});

test('update currency', async t => {
    let called = false;
    const client = setupServer(testServer => {
        testServer.put('/currencies/' + currencyId).reply(
            200,
            (uri, body) => {
                called = true;
                t.deepEquals(body, JSON.stringify(newData));

                return Object.assign(JSON.parse(JSON.stringify(currency)), newData);
            },
        );
    });

    t.false(called);
    try {
        const value = await client.updateCurrency(newData);

        t.true(value instanceof CurrencyModel);
        t.true(called);
        t.equal(value.uri.uri, '/currencies/' + currencyId);
        checkCurrencyEqual(t, value, newData);
    } catch (exception) {
        return t.fail(String(exception));
    }
});

test('create currency', async t => {
    let called = false;
    const client = setupServer(testServer => {
        testServer.post('/currencies').reply(
            200,
            (uri, body) => {
                called = true;
                t.deepEquals(body, JSON.stringify(newData));

                return Object.assign(JSON.parse(JSON.stringify(currency)), newData);
            },
        );
    });

    t.false(called);
    try {
        const value = await client.createCurrency(newData);

        t.true(value instanceof CurrencyModel);
        t.true(called);
        t.equal(value.uri.uri, '/currencies/' + currencyId);
        checkCurrencyEqual(t, value, newData);
    } catch (exception) {
        return t.fail(String(exception));
    }
});
