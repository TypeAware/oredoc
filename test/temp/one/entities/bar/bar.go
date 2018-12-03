package bar

import "oredoc/one/entities/bar/put"
import "oredoc/one/entities/bar/get"

type PutBasicReqHeaders = put.BasicReqHeaders
type PutBasicReqBody = put.BasicReqBody
type PutBasicResHeaders = put.BasicResHeaders
type PutBasicReq = put.BasicReq
type PutBasicRes = put.BasicRes
type PutBasic = put.Basic
type GetBasicReqHeaders = get.BasicReqHeaders
type GetBasicReqBody = get.BasicReqBody
type GetBasicResHeaders = get.BasicResHeaders
type GetBasicReq = get.BasicReq
type GetBasicRes = get.BasicRes
type GetBasic = get.Basic

type Put struct {
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

type Get struct {
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

