const repeat = (operation, num) => {
  while (--num > 0) {
    operation()
    repeat(operation, num);
  }
}

module.exports = repeat;