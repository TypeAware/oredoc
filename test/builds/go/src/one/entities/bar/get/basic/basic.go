package basic

import "./req"
import "./res"

type ReqHeaders = req.Headers
type ReqBody = req.Body
type ResHeaders = res.Headers

type Req struct {
 Headers struct {
 }

 Body struct {
   Tip string
   Top int
   Tap bool
 }

}

type Res struct {
 Headers struct {
 }

}

