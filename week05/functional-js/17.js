const curryN = (fn, n) => {
  n = n || fn.length;

  if (--n > 0) {
    return function () {
      return curryN(fn.bind(this, [...arguments][0]), n)
    }
  }

  return function () {
    return fn.apply(this, arguments);
  }
}

module.exports = curryN;




