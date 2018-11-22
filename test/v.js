

// const list = ['Map<?,?,?>', ['string', 'Map<?,?>', ['string', 'boolean'], 'Number']];

const list = ['Map<?>', ['Zoom<?,?,?, ?>', ['string', 'Map<?,?>', [], 'Number', 'vom']]];


function replaceMatch(arr, i=0){
  let str = arr[0];
  return str.replace(/\?/g, () => {
    let next = arr[1];
    if (Array.isArray(next[i+1])) {
      i+=2;
      return replaceMatch(next.slice(i-2));
    }
    else {
      return next[i++] || 'any';
    }
  })
}

console.log(replaceMatch(list));

