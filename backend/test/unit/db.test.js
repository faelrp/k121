const config = require('config');
const chai = require('chai');
const sinon = require('sinon');
const sandboxed = require('sandboxed-module');

let sandbox = sinon.sandbox.create();
let expect = chai.expect;
let mod;

let mongooseStub = {};

describe('Data Base', () => {

    beforeEach(function () {

        mongooseStub.connect = sandbox.stub();

        mod = sandboxed.require('../../lib/db.js', {
            requires: {
                'mongoose': mongooseStub,
                'config': config
            }
        })();
    });

    afterEach(() => {
        sandbox.reset();
        sandbox.restore();
    });

    it('mod should not be undefined', () => {
        expect(mod).to.be.an('object');
    });

    it('mod should have correct exported functions', () => {
        expect(mod.connect).to.be.an('function');
    });

    it('should connect into the database', async () => {
        let result = await mod.connect();

        expect(result).to.be.equal(`MongoDB - connected @ ${config.database.url}`);
        expect(mongooseStub.connect.calledOnce).to.be.equal(true);
    });

    it('should get back an error message when being unable to connect into database', async () => {

        mongooseStub.connect.returns(Promise.reject({message: 'test error'}))

        let result;
        try {
            result = await mod.connect();
        } catch (error) {
            result = error;
        }

        expect(result).to.be.equal(`MongoDB - unabled to connect @ ${config.database.url} [test error]`);
        expect(mongooseStub.connect.calledOnce).to.be.equal(true);
    });
});