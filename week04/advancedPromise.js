const mapIterator = require('./src/mapIterator');

class advancedPromise extends Promise{

  static map(iterable, mapper) {

    return new this((resolve, reject) => {

      this.resolve(iterable).then(iterableValue => {

        if ( Object.is(iterableValue, null) || typeof iterableValue[Symbol.iterator] !== 'function' ) {
          reject( new TypeError('first argument is not iterableValue') )
        }

        let arrResults = [];
        let done = 0;
        const iterablePromises = mapIterator(iterableValue);

        for( let promise of iterablePromises ) {
          done++;

          promise
            .then(result => {
              this.resolve(mapper(result))
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

}


module.exports = advancedPromise;