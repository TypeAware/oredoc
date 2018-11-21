
// this will currently compile

export const foo = function(symbols: any, v?: boolean){  // symbols is an optional Array<Symbol> argument

  if(arguments.length < 2){
    v = symbols;
    symbols = [];
  }

  const tags = <any>{};
  for(let s of symbols){
    tags[s] = true;
  }

  return {
    value: v,
    tags
  }

};


// now this could be made so much simpler with some compiler tricks!
// but this won't currently compile

export const foo1 = function(...symbols: Array<Symbol>, v: any){

  const tags = {};
  for(let s of symbols){
    tags[s] = true;
  }

  return {
    value: v,
    tags
  }

};

// in the second case, I don't have to check to see if the array exists
// and I no longer need optional paramaters






