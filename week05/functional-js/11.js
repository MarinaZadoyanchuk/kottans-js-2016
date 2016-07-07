module.exports = (arr, fn, thisArg) => {
  return arr.reduce((resultArr, currentElement, index, arr) => {
    resultArr.push(fn.call(thisArg, currentElement, index, arr));
    return resultArr;
  }, [])
}