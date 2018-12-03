package basic

import "oredoc/one/entities/bar/get/basic/req"
import "oredoc/one/entities/bar/get/basic/res"

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

