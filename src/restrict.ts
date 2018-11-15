


interface Foo {
  success: boolean
}

interface Bar {
  success: boolean
}


const foo = (v: Foo) =>{

};

const bar = (v: Bar) =>{

};


bar(<Foo>{success: true});
bar(<Bar>{success: true});
