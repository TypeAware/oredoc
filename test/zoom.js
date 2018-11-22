
const util = require('util');
const list = ['Map<%s,%s>', ['xxx','Map<%s,%s>', ['string', 'boolean']]];

// const list = ['Map<%s,%s>', ['string', 'boolean']];

const reduce = function(list){

  return list.reduceRight((a,b) => {

    console.log({b,a});

    if(Array.isArray(a)){

      const lastElem = a[a.length - 1];
      const lastElemIsArray = Array.isArray(lastElem);

      if(lastElemIsArray){
        return util.format(b, ...[a.slice(0,-1), reduce(lastElem)]);
      }

      return util.format(b, ...a);
    }

    return util.format(b, a);
  });
};


console.log(reduce(list));




