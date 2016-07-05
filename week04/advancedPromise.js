const mapIterator  = require('./src/enumerate');

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
      this.resolve(iterable).then(iterableValues => {
        if ( Object.is(iterableValues, null) || typeof iterableValues[Symbol.iterator] !== 'function' ) {
          reject( new TypeError('first argument is not iterableValues') )
        }

        const arrIterable = [...iterableValues];
        const iterableLength = arrIterable.length;

        if (iterableLength == 0) {
          new Promise(() => resolve(initialValue), reject);
        } else if ( iterableLength == 1 && Object.is(initialValue, undefined) ) {
          new Promise(() => resolve(arrIterable[0]), reject);
        } else {
          if (typeof reduce !== 'function') {
            reject( new TypeError(reduce + ' is not a function') );
          }


          let value = Promise.resolve(!Object.is(initialValue, undefined) ? initialValue : arrIterable.splice(0, 1)[0]);

          this.resolve(mapIterator(arrIterable))
            .then((arr) => {
              let done = 0;
              for (let [index, item] of arr) {
                done++;

                Promise.resolve(item).then((resultItem) => {
                  value = value.then(result => reduce(result, resultItem, index, arrIterable), reject);
                  if (!--done) {
                    value.then(resolve, reject);
                  }
                }, reject)
              }
            }, reject)

        }
      })
    })
  }

}

advancedPromise.reduce([0, 1, 2, 3], (value, result) => value + result + 5, 2).then(result => {console.log('hier', result)}).catch(error => {console.log('error', error)});

module.exports = advancedPromise;