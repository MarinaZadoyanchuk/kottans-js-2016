module.exports = (namespace) => {
  return console.log.bind(console, namespace)
}