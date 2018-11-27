#!/usr/bin/env bash

cd "$(dirname "$BASH_SOURCE")"
export GOPATH="$PWD"
go install main

#go build src/main/main.go
