module.exports = (inputWords) => {
  return inputWords.reduce( (countWords, word) => {
    word in countWords ? ++countWords[word] : countWords[word] = 1;
    return countWords;
  }, {})
}