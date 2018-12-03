package basic

import "oredoc/one/entities/bar/put/basic/req"
import "oredoc/one/entities/bar/put/basic/res"

type ReqHeaders = req.Headers
type ReqBody = req.Body
type ResHeaders = res.Headers

type Req struct {
 Headers struct {
 }

 Body struct {
   Mip string
   Mop int
   Map bool
 }

}

type Res struct {
 Headers struct {
 }

}

