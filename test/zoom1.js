
const util = require('util');
const list = ['Array','Map<%s,%s, %s>', ['xxx','Map<%s,%s>', ['string', 'boolean'], 'number']];


const reduce = function(list){
  return list.slice(1).reduce((a,b) => {

    if(Array.isArray(b)){
      const pop = a.pop();
      const format = util.format(pop,...reduce(b));
      return a.concat(format);
    }

    return (a.push(b), a);

  },
    [list[0]]
  );
};


console.log(reduce(list));




