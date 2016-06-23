class advancedPromise extends Promise{

  static map(iterable, mapper) {
    console.log(iterable);


    return new this((resolve, reject) => {
      const iterableLenght = [...iterable].length;
      let arrResults = new Array(iterableLenght);
      let i = 0;

      const checkDone = (arr) => {
        return !arr.some(item => Object.is(item, undefined)) || i == iterableLenght
      }

      for(let promise of iterable) {
        console.log(!(promise instanceof Promise))
        if (!(promise instanceof Promise)) {
          arrResults[i] = mapper(promise)
          if (checkDone(arrResults)) resolve(arrResults)
        } else {
          promise.then(result => {
            console.log(result, 'i:', i);
            arrResults[i] = mapper(result);
            if (checkDone(arrResults)) resolve(arrResults)
          }, reject)
        }
        i++;
      }

    })

  }

}

module.exports = advancedPromise;