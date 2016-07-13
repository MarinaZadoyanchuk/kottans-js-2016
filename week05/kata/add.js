module.exports = (string) => {
  if (string.length == 0) return 0;

  //separated custom delimiter
  let matchArray = string.match(/^(\D+)\n/);

  let delim = '[,\\n]';

  if(!Object.is(matchArray, null)) {
    string = string.slice(matchArray[0].length);
    delim = matchArray[1];
  }

  // get all numbers
  let allNumbers = string.split(new RegExp(`${delim}`, 'g'));

  //get negative numbers
  let negativeNumbers = allNumbers.filter(number => {
    return number < 0;
  })
  
  if (negativeNumbers.length) throw new TypeError('negatives not allowed: ' + negativeNumbers.join(','))

  return allNumbers.reduce(
      (sum, number) => {
        number = number == ''
          ? NaN
          : ( Number(number) >= 1000
            ? 0
            : Number(number))

        return sum + number;
      },
      0
    )
}