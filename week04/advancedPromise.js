const enumerable  = require('./src/enumerate');

class advancedPromise extends Promise{

  static map(iterable, mapper) {

    return new this((resolve, reject) => {

      this.resolve(iterable).then(iterableValues => {

        if ( Object.is(iterableValues, null) || typeof iterableValues[Symbol.iterator] !== 'function' ) {
          reject( new TypeError('first argument is not iterableValues') )
        }

        let arrResults = [];
        let done = 0;

        for( let promise of iterableValues ) {
          done++;

          Promise.resolve(promise)
            .then(result => {
              Promise.resolve(mapper(result))
                .then(result => {
                  arrResults.push(result);
                  if ( !--done )
                    resolve(arrResults);
                }, reject)
            }, reject )
        }
      }, reject)


    })

  }

  static reduce(iterable, reduce, initialValue) {
    return new this((resolve, reject) => {
      this.resolve(iterable).then(iterableValue => {
        if ( Object.is(iterableValue, null) || typeof iterableValue[Symbol.iterator] !== 'function' ) {
          reject( new TypeError('first argument is not iterableValues') )
        }

        const arr = [...iterableValue];
        const arrLength = arr.length;

        if (arrLength == 0) {
          new Promise(() => resolve(initialValue), reject);
        } else if ( arrLength == 1 && Object.is(initialValue, undefined) ) {
          new Promise(() => resolve(arr[0]), reject);
        } else {
          if (typeof reduce !== 'function') {
            reject( new TypeError(reduce + ' is not a function') );
          }

          let previousValue = Promise.resolve(!Object.is(initialValue, undefined) ? initialValue : arr.splice(0, 1)[0]);
          let done = 0;
          for (let index in arr) {
            done++;
            Promise.resolve(arr[index]).then((item) => {
              previousValue = previousValue.then(result => reduce(result, item, index, arr), reject);
              if (!--done) {
                previousValue.then(resolve, reject);
              }
            }, reject)
          }
        }
      })
    })
  }
}

advancedPromise.reduce([0, 1, 2, 3], (value, result) => value + result + 5).then(result => {console.log('hier', result)}).catch(error => {console.log('error', error)});

module.exports = advancedPromise;