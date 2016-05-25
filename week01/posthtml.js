'use strict';

const posthtml = require('posthtml');

let html = `
  <div class="js-smth col-lg-offset-5 col-md-offset-8 btn-dsdsd Js-sdssd ddsjs-dsds dhsdbtn-dsds">Smth</div>
  <a href="sasasa" class="Col-lg-offset-5 btn-sdsds  col-lg-offset-5  dsdsjs-sasas  js-ssss saksjajs btn-warning">dsdsd</a>
`;


const jsReg = /(?:^|\s)js-(\w+)/i;
const bootstrapReg = /(^|\s)(col-(lg|xs|sm|md)?(-\w+)?-\d+|btn(-\w+)?(-\w+)?)/i;

const plugin = (tree) => tree
  .match({attrs: {class: jsReg}}, (node) => {
    const classes = node.attrs.class.split(' ');
    let jsClassIndexes = [];
    const datas = classes.filter((className, classPosition) => {
      if (jsReg.test(className)) {
        jsClassIndexes.push(classPosition);
        return true;
      }
      return false;
    })
    .map(jsClass => jsClass.match(jsReg)[1]).join(' ');

    node.attrs['data-js'] = datas;
    node.attrs.class = classes.filter(
      (className, classPosition) => className && !jsClassIndexes.includes(classPosition)
    ).join(' ');

    return node;
  })
  .match({attrs: {class: bootstrapReg}}, (node) => {
    const classes = node.attrs.class.split(' ');
    node.attrs.class = classes.filter((item) => !bootstrapReg.test(item)).join(' ');

    return node;
  });


posthtml([plugin])
  .process(html)
  .then((result) => {console.log(result.html)})
  .catch((error) => {console.log(error)});