package get

import "oredoc/one/entities/foo/get/miasmic"

type MiasmicReqHeaders = miasmic.ReqHeaders
type MiasmicReqBody = miasmic.ReqBody
type MiasmicResHeaders = miasmic.ResHeaders
type MiasmicReq = miasmic.Req
type MiasmicRes = miasmic.Res

type Miasmic struct {
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

