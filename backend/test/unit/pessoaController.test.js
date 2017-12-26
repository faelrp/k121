const config = require('config');
const chai = require('chai');
const sinon = require('sinon');
const sandboxed = require('sandboxed-module');

let sandbox = sinon.sandbox.create();
let expect = chai.expect;
let mod;

let pessoaSchema = {};
let document = {};

describe('Pessoa Controller', () => {

    beforeEach(function () {

        pessoaSchema.findById = sandbox.stub().returns({ nome: 'test1' });
        pessoaSchema.find = sandbox.stub().returns([{ nome: 'test1' }, { nome: 'test2' }]);
        pessoaSchema.remove = sandbox.stub().returns('ok');

        document.save = sandbox.stub().returns('ok');

        mod = sandboxed.require('../../lib/collection/pessoaController.js', {
            requires: {
                './pessoaSchema': pessoaSchema
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

            expect(pessoaSchema.find.calledOnce).to.be.equal(true);
            expect(pessoaSchema.findById.notCalled).to.be.equal(true);
        });

        it('should get only 1 pessoa when there is id specified', async () => {

            let result = await mod.get({ id: 'test' });

            let object = { nome: 'test1' };

            expect(result).to.be.an('object');
            expect(result).to.deep.equal(object)

            expect(pessoaSchema.find.notCalled).to.be.equal(true);
            expect(pessoaSchema.findById.calledOnce).to.be.equal(true);
        });
    });

    describe('UPDATE', () => {

        it('should update a Pessoa', async () => {

            pessoaSchema.findById.returns({save: document.save});

            let result = await mod.edit({_id: 'test', nome: 'Rafael', email: 'rafael.p.bertelli@gmail.com'});

            expect(result).to.be.an('string');
            expect(result).to.be.equal('ok')

            expect(pessoaSchema.findById.calledOnce).to.be.equal(true);
            expect(pessoaSchema.findById.calledWith('test')).to.be.equal(true);
        });
    });

    describe('REMOVE', () => {

        it('should remove a Pessoa', async () => {

            pessoaSchema.findById.returns({save: document.save});

            let result = await mod.remove({_id: 'test'});

            expect(result).to.be.an('string');
            expect(result).to.be.equal('ok')

            expect(pessoaSchema.remove.calledOnce).to.be.equal(true);
            expect(pessoaSchema.remove.calledWith({_id: 'test'})).to.be.equal(true);
        });
    });
});