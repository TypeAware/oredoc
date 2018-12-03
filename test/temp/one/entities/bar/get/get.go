package get

import "oredoc/one/entities/bar/get/basic"

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

