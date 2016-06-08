(function(){
  "use strict"

  const isEnumerable = {}.propertyIsEnumerable;

  Object.defineProperty(Object, "deepAssign", {
    value: function(obj, ...props) {
      if (Object.is(obj, null) || Object.is(obj, undefined)) throw new TypeError('obj must be not null');

      let to = new Object(obj);

      props.forEach((prop) => {
        if (!isObject(prop)) return;

        Reflect.ownKeys(prop).forEach((key) => {
          if (isEnumerable.call(prop, key)) {
            if ((key in to) && isObject(to[key]) && isObject(prop[key])) {
              to[key] = Object.deepAssign(to[key], prop[key]);
              return;
            }

            to[key] = prop[key];

          }
        })
      })

      return to
    },
    writable: true,
    configurable: true
  })

  function isObject(obj) {
    return obj != null && typeof obj === 'object'
  }

})()

let foo = Object.create(null);
foo.bar = true;
foo.a = {b: {d: {k: 'test'}}};

const result = Object.deepAssign({a: {b: 0, e: 'dsdsd'}}, {a: {b: {d: 1}, c: 2}}, foo , {a: {c: 3}}, 4, null);

console.log(result); // => { a: { b: { d: { k: 'test' } }, e: 'dsdsd', c: 3 }, bar: true }
