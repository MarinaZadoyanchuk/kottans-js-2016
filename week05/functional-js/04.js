module.exports = (arrMessages) => {
  return arrMessages
    .filter(objMessage =>objMessage.message.length < 50)
    .map(filteredMesaage => filteredMesaage.message)
}