module.exports = function * makeIterator(iterable) {
  const lengthIterable = [...iterable].length;
  let i = 0;

  while (i < lengthIterable) {
    yield Promise.resolve(iterable[i]);
    i++;
  }

}
