"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const doc_gen_1 = require("../dist/doc-gen");
const types_1 = require("../dist/types");
var Foo = types_1.Entities.Foo;
const router = express.Router();
const makeAddRoute = function (router, inject, entityName, d) {
    return function addRoute(f, methods, route) {
        const r = d.createAndAddRoute(methods, route);
        const handler = f();
        for (let v of methods) {
            router[v](route, handler);
        }
    };
};
exports.register = (v, d) => {
    const addRoute = makeAddRoute(router, v, 'dogs', d);
    addRoute(makeGetFoo, ['get'], '/');
};
class FooZ {
}
exports.FooZ = FooZ;
const makeGetFoo = (v, x) => {
    const z = x.setResponseBodyType(Foo.GET.Basic.Req);
    return (req, res, next) => {
        const body = req.body;
        const headers = req.headers.foo;
        res.json({ foo1: 4 });
    };
};
const makePutFoo = (v, e) => {
    return (req, res, next) => {
        const headers = req.headers.foo;
        res.json({ foo: 5 });
    };
};
exports.register({}, new doc_gen_1.DocGen());
