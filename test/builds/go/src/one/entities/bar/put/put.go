package put

import "one/entities/bar/put/basic"

type BasicReqHeaders = basic.ReqHeaders
type BasicReqBody = basic.ReqBody
type BasicResHeaders = basic.ResHeaders
type BasicReq = basic.Req
type BasicRes = basic.Res

type Basic struct {
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

