package tragic

import "./req"
import "./res"

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

