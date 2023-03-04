import 'mocha';
import {expect} from 'chai';
import {rationalNumbers} from "../src/mod-ejercicio-2";

describe('rationalNumbers', () => {
    it('Enteros ', () => {
      const num = new rationalNumbers(3, 4);
      expect(num.checkInts()).to.be.eql(true);
    });
    it('No enteros ', () => {
        const num = new rationalNumbers(2.2, 3.5);
        expect(num.checkInts()).to.be.eql(false);
    });
    it('denomitaror != 0', () => {
        const num = new rationalNumbers(2, 1);
        expect(num.checkDenominator()).to.be.eql(true);

    });
    it('denomitaror 0 error', () => {
        const num = new rationalNumbers(2, 0);
        expect(num.checkDenominator()).to.be.eql(false);

    });
    it('simplify ', () => {
        const num = new rationalNumbers(2, 4);
        num.simplifyNumber();
        expect(num.toString()).to.be.equal("1/2");
    });
    it('invert ', () => {
        const num = new rationalNumbers(2, 4);
        num.invert();
        expect(num.toString()).to.be.equal("4/2");
    });
});