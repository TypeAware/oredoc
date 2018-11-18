package req

type headers struct {
 'x-requested-by' 'foo'
}
body struct {
 foo struct {
   0 struct {
     golang 'string'
     java 'String'
     typescript 'string'
   }
   1 ''bar''
 }
 bar struct {
   0 struct {
     golang 'int8'
     java 'int'
     typescript 'number'
   }
   1 5
 }
 zoom struct {
   0 struct {
     golang 'bool'
     java 'boolean'
     typescript 'boolean'
   }
   1 false
 }
}

