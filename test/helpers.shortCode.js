'use strict';

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { after, before, suite, it } = (exports.lab = Lab.script());

const shortCode = require('../src/helpers/shortCode');

const testData = [
  ['A', 0],
  ['B', 1],
  ['C', 2],
  ['_', 63],
  ['BA', 64],
  ['BB', 65]
];

const RANDOM_TEST = 10;

suite('Short Code', () => {
  testData.map( item => {
    const hash = item[0];
    const number = item[1];

    it(`generate ${number} - should return ${hash}`, () => {
      expect(shortCode.generate(number)).to.be.equal(hash);
    });

    it(`getNumbr ${hash} - should return ${number}`, () => {
      expect(shortCode.getNumber(hash)).to.be.equal(number);
    });
  })

  it(`getNumbr B$ - should return -1`, () => {
    expect(shortCode.getNumber('B$')).to.be.equal(-1);
  });
});

suite('Short code Random tests', () => {
    Array(RANDOM_TEST).fill(true).map( () => {
    const randomNumber = Math.floor(Math.random() * 10000);
    const hash = shortCode.generate(randomNumber);
    const number = shortCode.getNumber(hash);

    it(`getNumbr ${hash} \t - should return ${randomNumber}`, () => {
      expect(number).to.be.equal(randomNumber);
    });

    it(`generate ${number} \t - should return ${hash}`, () => {
      expect(shortCode.generate(number)).to.be.equal(hash);
    });
  })
});
