"use strict";
exports.__esModule = true;
var express = require("express");
var dist_1 = require("../dist");
var src_1 = require("../src");
var router = express.Router();
var doc = new dist_1.DocGen();
exports.register = function (v) {
    var entity = doc.createAndAddEntity('foo');
    router.get('/', makeGetFoo(v, entity));
    router.put('/', makePutFoo(v, entity));
};
var makeGetFoo = function (v, e) {
    var r = new src_1.Route({
        request: {
            headers: {}
        },
        response: {
            body: {
                success: {
                    foo: 'yes'
                }
            }
        }
    });
    e.addRoute({
        path: '',
        example: r.info
    });
    return function (req, res, next) {
        var headers = req.headers.foo;
        res.json({ foo: '' });
    };
};
var makePutFoo = function (v, e) {
    return function (req, res, next) {
        res.json({ success: 'f' });
    };
};
