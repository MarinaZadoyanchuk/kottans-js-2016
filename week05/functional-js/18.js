module.exports = (userIds, load, done) => {
  let loadUsers = [];
  let doneLoad = 0;
  
  for (id of userIds) {
    doneLoad++;
    
    Promise.resolve(load(id))
      .then(loadedUser => {
        loadUsers.push(loadedUser);
        if (!--doneLoad) {
          done(loadUsers);
        }
      })
  }
}