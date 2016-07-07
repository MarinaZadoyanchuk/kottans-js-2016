const reduce = (arr, fn, init) => {
  arr.current = ++arr.current|| 0;
  
  if (arr.current < arr.length) {
    return reduce(arr, fn, fn(init, arr[arr.current], arr.current, arr));
  }
  
  return init;
}

module.exports = reduce;