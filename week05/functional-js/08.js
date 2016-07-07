const countDuck = function() {
  const arrArgumnets = [...arguments];

  return arrArgumnets
    .filter(currentObject => Object.prototype.hasOwnProperty.call(currentObject, 'quack'))
    .length

}

module.exports = countDuck;