package tragic

import "oredoc/one/entities/foo/put/tragic/req"
import "oredoc/one/entities/foo/put/tragic/res"

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

