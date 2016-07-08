const repeat = (operation, num) => {
  if (num > 0) {
    Promise.resolve(() => {operation(); num--; repeat(operation, num); })
  }
}

module.exports = repeat;