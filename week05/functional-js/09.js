module.exports = (namespace) => {
  return function () {
    console.log.apply(console, [namespace].concat([...arguments]))
  }  
}