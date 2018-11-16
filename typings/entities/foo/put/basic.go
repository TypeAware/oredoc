package put

type basic struct {
 basic struct {
 path '/foo'
  req struct {
    headers struct {
     'x-requested-by' 'foo'
   }
    body struct {
     foo string
     bar number
     zoom boolean
   }
 }
  res struct {
    headers struct {
   }
 }
}
 tragic struct {
 path '/foo'
  req struct {
    headers struct {
     'x-requested-by' 'foo'
   }
    body struct {
     foo string
   }
 }
  res struct {
    headers struct {
   }
 }
}
}
