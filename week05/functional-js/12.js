module.exports = (target, method) => {
  let count = 0;
  const saved = target[method];


  target[method] = function() {
    count++;
    return saved.apply(this, arguments);
  }
  
  return {
    get count() {
      return count;
    }
  }
}