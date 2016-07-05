module.exports = function* enumerate(iterable) {
  let i = 0;

  for (const x of iterable) {
    yield [i, x];
    i++;
  }
}

