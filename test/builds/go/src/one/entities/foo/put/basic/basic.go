package basic

import "one/entities/foo/put/basic/req"
import "one/entities/foo/put/basic/res"

type ReqHeaders = req.Headers
type ReqBody = req.Body
type ResHeaders = res.Headers

type Req struct {
 Headers struct {
   X_requested_by string
 }

 Body struct {
   Foo string
   Bar int
   Zoom bool
 }

}

type Res struct {
 Headers struct {
 }

}

