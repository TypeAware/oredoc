


export class Validate {



  validate(){
    return 'boom';
  }
}


const v = Object.setPrototypeOf({}, new Validate());

console.log(v.validate());
