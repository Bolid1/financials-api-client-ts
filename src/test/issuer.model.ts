import * as test from 'tape-async';
import {IssuerModel} from '..';
import setupServer from './utils/setupServer';

const issuerId = 470;

const issuer = {
    _links: {
        self: {
            href: '/issuers/' + issuerId,
        },
    },
    id: issuerId,
    name: 'Центральный Банк Российской Федерации',
    type: 1,
};

const newData = {
    id: issuerId,
    name: 'Test',
    type: 3,
};

test('fetch issuer', async t => {
    const client = setupServer(testServer => {
        testServer.get('/issuers/' + issuerId).reply(200, () => JSON.parse(JSON.stringify(issuer)));
    });

    const value = await client.fetchIssuer(issuerId);
    t.true(value instanceof IssuerModel);
    t.equal(value.uri.uri, '/issuers/' + issuerId);
    t.strictEqual(value.id, issuer.id);
    t.strictEqual(value.name, issuer.name);
    t.strictEqual(value.type, issuer.type);
});

test('update issuer', async t => {
    let called = false;
    const client = setupServer(testServer => {
        testServer.put('/issuers/' + issuerId).reply(
            200,
            (uri, body) => {
                called = true;
                t.deepEquals(body, JSON.stringify(newData));

                return Object.assign(JSON.parse(JSON.stringify(issuer)), newData);
            },
        );
    });

    t.false(called);
    try {
        const value = await client.saveIssuer(newData);

        t.true(value instanceof IssuerModel);
        t.true(called);
        t.equal(value.uri.uri, '/issuers/' + issuerId);
        t.strictEqual(value.id, newData.id);
        t.strictEqual(value.name, newData.name);
        t.strictEqual(value.type, newData.type);
    } catch (exception) {
        return t.fail(String(exception));
    }
});

test('create issuer', async t => {
    const postData = {name: newData.name, type: newData.type};
    let called = false;

    const client = setupServer(testServer => {
        testServer.post('/issuers').reply(
            200,
            (uri, body) => {
                called = true;
                t.deepEquals(body, JSON.stringify(postData));

                return Object.assign(JSON.parse(JSON.stringify(issuer)), newData);
            },
        );
    });
    t.false(called);
    try {
        const value = await client.saveIssuer(postData);

        t.true(value instanceof IssuerModel);
        t.true(called);
        t.equal(value.uri.uri, '/issuers/' + issuerId);
        t.strictEqual(value.id, newData.id);
        t.strictEqual(value.name, newData.name);
        t.strictEqual(value.type, newData.type);
    } catch (exception) {
        return t.fail(String(exception));
    }
});
