import { expect } from 'chai';
import { Action } from '../src/motor.es6';

describe('Action', () => {
    describe('.constructor()', () => {
        it('should have correct name', () => {
            let a1 = new Action(),
                a2 = new Action(),
                a3 = new Action('action-name');

            expect(a1.name).to.be.a('string');
            expect(a1.name).to.equal('action-0');
            expect(a2.name).to.equal('action-1');
            expect(a3.name).to.equal('action-name');
        });
    });
});