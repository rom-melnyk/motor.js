import { expect } from 'chai';
import { Action } from '../src/motor.es6';

describe('Action', () => {
    let a1 = new Action(),
        a2 = new Action(),
        a3 = new Action('action-name');

    describe('.constructor()', () => {
        it('should have correct name', () => {
            expect(a1.name).to.be.a('string');
            expect(a1.name).to.equal('action-0');
            expect(a2.name).to.equal('action-1');
            expect(a3.name).to.equal('action-name');
        });
    });

    describe('payload', () => {
        it('should convert input in proper way', () => {

        });
    });
});