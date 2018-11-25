const async = require('async');

const foo0 = {
  bar: {
    A: {
      B: {
        val: 3
      },
      C: {
        val: 4
      },
      D: {
        val: 1
      },
      E: {
        F: {
          val: 0
        },
        G: {
          val: 9
        },
        H: {
          val: 2
        },
        I: {
          val: 19
        }
      }
    },
    J: {
      K: {
        val: 19
      },
      L: {
        val: 11
      },
      M: {
        val: 5
      },
      N: {
        val: 22
      }
    },
    O: {
      val: 112
    },
    P: {
      val: 18
    }
  },
  foo: {
    Q: {
      R: {
        val: 7
      },
      S: {
        T: {
          val: 16
        },
        U: {
          val: 66
        },
        V: {
          val: 12
        },
        W: {
          val: 31
        }
      },
      Y: {
        val: 11
      },
      X: {
        Z: {
          val: 17
        },
        ZZ: {
          val: 11
        },
        AA: {
          val: 8
        },
        BB: {
          val: 12
        }
      }
    },
    CC: {
      DD: {
        EE: {
          val: 23
        },
        FF: {
          GG: {
            val: 27
          },
          HH: {
            val: 28
          },
          II: {
            val: 29
          },
          JJ: {
            val: 30
          }
        },
        KK: {
          val: 31
        },
        LL: {
          val: 32
        }
      },
      MM: {
        val: 33
      },
      NN: {
        val: 34
      },
      OO: {
        val: 35
      }
    },
    PP: {
      val: 36
    },
    QQ: {
      val: 37
    }
  }
};



const animals = {
  canines: {
    dogs: {
      poodle: {
        val: true
      }
    },
    fox:{
      val: true
    },
    wolf: {
      northwestern:{
        val: true
      },
      arctic: {
        val: true
      }
    },
    raccoon:{
      val: true
    }
  },
  porpoises: {
    vaquita:{
      val: true
    },
    harbor: {
      val: true
    }
  },
  
};


const uppercaseFirstChar = s => {
  return s.slice(0,1).toUpperCase() + s.slice(1).toLowerCase();
};



const loop = (v, cb) => {
  
  const results = [];
  
  async.eachLimit(Object.keys(v), 3, (k, cb) => {
    
    // console.log({k});
    const sub = v[k];
    
    debugger;
    
    if (sub && typeof sub === 'object') {
      
      return loop(sub, (err, values) => {
        
        console.log({k, values});
        
        for(let v of values){
          results.push(k + v);
        }
        
        cb(err);
      });
    }
    
    
    results.push(k);
    
    process.nextTick(cb);
    
    
  }, err => {
     cb(err, results);
  });
  
};


loop(animals, (err, val) => {
  console.log(err, val);
});


// canines: [{"Dogs.Poodle": true}, {"Fox":true}, {"Wolf.Northwestern":true}, {"Wolf.Arctic":true}, {"Raccoon" : true}]
// porpoisies: [{"Vaquita": true}, {"Harbor":true}]

// and at animals:

// [{"Canines.Dogs.Poodle": true}, {"Canines.Fox":true}, {"Canines.Wolf.Northwestern":true}, {"Canines.Wolf.Arctic":true}, {"Canines.Raccoon" : true}]
//  [{"Porpoises.Vaquita": true}, {"Porpoises.Harbor":true}]


