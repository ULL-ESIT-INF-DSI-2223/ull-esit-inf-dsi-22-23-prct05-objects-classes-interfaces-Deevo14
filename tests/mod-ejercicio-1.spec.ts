import 'mocha';
import {expect} from 'chai';
import {productTable} from "../src/mod-ejercicio-1";

describe("ProductTable function tests", () => {
  it("productTale(2) returns value [[1, 2], [2, 4]]", () => {
    expect(productTable(2)).to.be.eql([[1, 2], [2, 4]]);
  });
  it("productTale(3) returns value [[1, 2, 3], [2, 4, 6], [3, 6, 9]]", () => {
    expect(productTable(3)).to.be.eql([[1, 2, 3], [2, 4, 6], [3, 6, 9]]);
  });
  it("productTale(4) returns value [[1, 2, 3, 4], [2, 4, 6, 8], [3, 6, 9, 12], [4, 8, 12, 16]]", () => {
    expect(productTable(4)).to.be.eql([[1, 2, 3, 4], [2, 4, 6, 8], [3, 6, 9, 12], [4, 8, 12, 16]]);
  });
  it("productTale(-1) returns value undefinded", () => {
    expect(productTable(-1)).to.be.undefined;
  });
  it("productTale(3.42) returns value undefined", () => {
    expect(productTable(3.42)).to.be.undefined;
  });
});
