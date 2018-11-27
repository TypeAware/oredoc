package foo

import "one/entities/foo/put"
import "one/entities/foo/get"

type PutBasicReqHeaders = put.BasicReqHeaders
type PutBasicReqBody = put.BasicReqBody
type PutBasicResHeaders = put.BasicResHeaders
type PutBasicReq = put.BasicReq
type PutBasicRes = put.BasicRes
type PutTragicReqHeaders = put.TragicReqHeaders
type PutTragicReqBody = put.TragicReqBody
type PutTragicResHeaders = put.TragicResHeaders
type PutTragicReq = put.TragicReq
type PutTragicRes = put.TragicRes
type PutBasic = put.Basic
type PutTragic = put.Tragic
type GetMiasmicReqHeaders = get.MiasmicReqHeaders
type GetMiasmicReqBody = get.MiasmicReqBody
type GetMiasmicResHeaders = get.MiasmicResHeaders
type GetMiasmicReq = get.MiasmicReq
type GetMiasmicRes = get.MiasmicRes
type GetMiasmic = get.Miasmic

type Put struct {
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

type Get struct {
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

