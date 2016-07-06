module.exports = (goodUsers) => {
  return (submittedUsers) => {
    return submittedUsers.every(user => {
      return goodUsers.some(goodUser => user.id === goodUser.id);
    })
  }
}