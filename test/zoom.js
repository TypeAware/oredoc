function joinNames(node) {

  if (node.children.length === 0) {
    return [node.name];
  }
  let names = [];

  node.children.forEach(n => {
    joinNames(n).forEach(cn => {
      names.push(node.name + cn)
    });
  });

  return names;
}

const m = {
  name: 'Foo',
  children: [{
    name: 'Baz1',
    children: [{
      name: 'Baz3',
      children: []
    },
      {
        name: 'Baz2',
        children: [{
          name: 'Baz4',
          children: []
        },
          {
            name: 'Baz5',
            children: []
          }
        ]
      }
    ]
  },
    {
      name: 'Bar',
      children: []
    }
  ]
};


console.log(joinNames(m));
console.log(joinNames(m.children[0])); // 'Baz1' as root
