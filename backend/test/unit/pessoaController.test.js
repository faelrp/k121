const config = require('config');
const chai = require('chai');
const sinon = require('sinon');
const sandboxed = require('sandboxed-module');

let sandbox = sinon.sandbox.create();
let expect = chai.expect;
let mod;

let peopleSchema = {};
let document = {};

describe('People Controller', () => {

    beforeEach(function () {

        peopleSchema.findById = sandbox.stub().returns({ nome: 'test1' });
        peopleSchema.find = sandbox.stub().returns([{ nome: 'test1' }, { nome: 'test2' }]);
        peopleSchema.remove = sandbox.stub().returns('ok');

        document.save = sandbox.stub().returns('ok');

        mod = sandboxed.require('../../lib/collection/peopleController.js', {
            requires: {
                './peopleSchema': peopleSchema
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
        expect(mod.get).to.be.an('function');
        expect(mod.insert).to.be.an('function');
        expect(mod.edit).to.be.an('function');
        expect(mod.remove).to.be.an('function');
    });

    describe('GET', () => {

        it('should get all Pessoas when there is no id specified', async () => {
            let result = await mod.get();

            let array = [{ nome: 'test1' }, { nome: 'test2' }];

            expect(result).to.be.an('array');
            expect(result.length).to.be.equal(2);
            expect(result).to.deep.equal(array)

            expect(peopleSchema.find.calledOnce).to.be.equal(true);
            expect(peopleSchema.findById.notCalled).to.be.equal(true);
        });

        it('should get only 1 pessoa when there is id specified', async () => {

            let result = await mod.get({ id: 'test' });

            let object = { nome: 'test1' };

            expect(result).to.be.an('object');
            expect(result).to.deep.equal(object)

            expect(peopleSchema.find.notCalled).to.be.equal(true);
            expect(peopleSchema.findById.calledOnce).to.be.equal(true);
        });
    });

    describe('UPDATE', () => {

        it('should update a Pessoa', async () => {

            peopleSchema.findById.returns({save: document.save});

            let result = await mod.edit({_id: 'test', nome: 'Rafael', email: 'rafael.p.bertelli@gmail.com'});

            expect(result).to.be.an('string');
            expect(result).to.be.equal('ok')

            expect(peopleSchema.findById.calledOnce).to.be.equal(true);
            expect(peopleSchema.findById.calledWith('test')).to.be.equal(true);
        });
    });

    describe('REMOVE', () => {

        it('should remove a Pessoa', async () => {

            peopleSchema.findById.returns({save: document.save});

            let result = await mod.remove({id: 'test'});

            expect(result).to.be.an('string');
            expect(result).to.be.equal('ok')

            expect(peopleSchema.remove.calledOnce).to.be.equal(true);
            expect(peopleSchema.remove.calledWith({_id: 'test'})).to.be.equal(true);
        });
    });
});
