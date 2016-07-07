const repeat = (operation, num) => {
  if (num > 0) {
    Promise.resolve(() => {
      repeat(operation, --num);
    }).then(() => { operation() })
  }
}

module.exports = repeat;