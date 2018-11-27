package entities

import "one/entities/foo"
import "one/entities/bar"

type FooPutBasicReqHeaders = foo.PutBasicReqHeaders
type FooPutBasicReqBody = foo.PutBasicReqBody
type FooPutBasicResHeaders = foo.PutBasicResHeaders
type FooPutBasicReq = foo.PutBasicReq
type FooPutBasicRes = foo.PutBasicRes
type FooPutTragicReqHeaders = foo.PutTragicReqHeaders
type FooPutTragicReqBody = foo.PutTragicReqBody
type FooPutTragicResHeaders = foo.PutTragicResHeaders
type FooPutTragicReq = foo.PutTragicReq
type FooPutTragicRes = foo.PutTragicRes
type FooPutBasic = foo.PutBasic
type FooPutTragic = foo.PutTragic
type FooGetMiasmicReqHeaders = foo.GetMiasmicReqHeaders
type FooGetMiasmicReqBody = foo.GetMiasmicReqBody
type FooGetMiasmicResHeaders = foo.GetMiasmicResHeaders
type FooGetMiasmicReq = foo.GetMiasmicReq
type FooGetMiasmicRes = foo.GetMiasmicRes
type FooGetMiasmic = foo.GetMiasmic
type FooPut = foo.Put
type FooGet = foo.Get
type BarPutBasicReqHeaders = bar.PutBasicReqHeaders
type BarPutBasicReqBody = bar.PutBasicReqBody
type BarPutBasicResHeaders = bar.PutBasicResHeaders
type BarPutBasicReq = bar.PutBasicReq
type BarPutBasicRes = bar.PutBasicRes
type BarPutBasic = bar.PutBasic
type BarGetBasicReqHeaders = bar.GetBasicReqHeaders
type BarGetBasicReqBody = bar.GetBasicReqBody
type BarGetBasicResHeaders = bar.GetBasicResHeaders
type BarGetBasicReq = bar.GetBasicReq
type BarGetBasicRes = bar.GetBasicRes
type BarGetBasic = bar.GetBasic
type BarPut = bar.Put
type BarGet = bar.Get

type Foo struct {
 Put struct {
   Basic struct {
     Req struct {
       Headers struct {
         X_requested_by string
       }

       Body struct {
         Foo string
         Bar int
         Zoom bool
       }

     }

     Res struct {
       Headers struct {
       }

     }

   }

   Tragic struct {
     Req struct {
       Headers struct {
         X_requested_by string
       }

       Body struct {
         Foo string
       }

     }

     Res struct {
       Headers struct {
       }

     }

   }

 }

 Get struct {
   Miasmic struct {
     Req struct {
       Headers struct {
         X_requested_by string
       }

       Body struct {
         Foo string
       }

     }

     Res struct {
       Headers struct {
       }

     }

   }

 }

}

type Bar struct {
 Put struct {
   Basic struct {
     Req struct {
       Headers struct {
       }

       Body struct {
         Mip string
         Mop int
         Map bool
       }

     }

     Res struct {
       Headers struct {
       }

     }

   }

 }

 Get struct {
   Basic struct {
     Req struct {
       Headers struct {
       }

       Body struct {
         Tip string
         Top int
         Tap bool
       }

     }

     Res struct {
       Headers struct {
       }

     }

   }

 }

}

