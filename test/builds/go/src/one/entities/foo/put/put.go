package put

import "one/entities/foo/put/basic"
import "one/entities/foo/put/tragic"

type BasicReqHeaders = basic.ReqHeaders
type BasicReqBody = basic.ReqBody
type BasicResHeaders = basic.ResHeaders
type BasicReq = basic.Req
type BasicRes = basic.Res
type TragicReqHeaders = tragic.ReqHeaders
type TragicReqBody = tragic.ReqBody
type TragicResHeaders = tragic.ResHeaders
type TragicReq = tragic.Req
type TragicRes = tragic.Res

type Basic struct {
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

type Tragic struct {
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

