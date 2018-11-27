package miasmic

import "one/entities/foo/get/miasmic/req"
import "one/entities/foo/get/miasmic/res"

type ReqHeaders = req.Headers
type ReqBody = req.Body
type ResHeaders = res.Headers

type Req struct {
 Headers struct {
   X_requested_by string
 }

 Body struct {
   Foo string
 }

}

type Res struct {
 Headers struct {
 }

}

