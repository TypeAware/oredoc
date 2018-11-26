'use strict';

const async = require('async');

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
    
    const sub = v[k];
    
    if (sub && typeof sub === 'object') {
      
      return loop(sub, (err, values) => {
        
        for(let v of values){
          results.push(uppercaseFirstChar(k) + v);
        }
        
        cb(err);
      });
    }
    
    
    results.push(uppercaseFirstChar('xXX'));
    cb(null)
    // process.nextTick(cb);
    
    
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


