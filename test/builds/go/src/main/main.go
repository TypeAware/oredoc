package main

import (
	"log"
	"one/entities/bar"
)

func main(){

	v := bar.Get.Basic.Req.Headers{}
	log.Fatal(v)

}
