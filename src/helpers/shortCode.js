'use strict';

const ALPHABET  = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
const BASE = ALPHABET.length;

/*
  Convert Base10 number to a especial Base64
*/
function generate(numberInput) {
  let hash = "";
  let rest = numberInput;

  do {
    const position = Math.ceil(rest % BASE);
    hash = ALPHABET[position] + hash;
    rest = Math.floor(rest / BASE);
  } while (rest > 0);

  return hash;
}

/**
 * Convert Base64 number to Base10
 * AA
 */
function getNumber(hash) {
  let decodedNumber = 0;
  let index = hash.length;

  /**
   * We start at the end of the string
   * BB = charPosition * baseLength^2 + charPosition * baseLength^1 + charPosition * baseLength^0
   */
  while(index--){
    const currentChar = hash[index];
    const currentCharAlphabetValue = ALPHABET.indexOf(currentChar);

    /* Character is not in the alphabet */
    if (currentCharAlphabetValue == -1) {
      return -1;
    }

    const pow = hash.length - index - 1;

    decodedNumber += currentCharAlphabetValue * Math.pow(BASE, pow)
  }

  return parseInt(decodedNumber);
}

module.exports = {
  generate,
  getNumber
};
