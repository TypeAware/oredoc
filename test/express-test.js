"use strict";
exports.__esModule = true;
var express = require("express");
var dist_1 = require("../dist");
var router = express.Router();
var doc = new dist_1.DocGen();
exports.register = function (v) {
    var entity = doc.createAndAddEntity('foo');
    router.get('/', makeGetFoo(v, entity));
    router.put('/', makePutFoo(v, entity));
};
var makeGetFoo = function (v, e) {
    var spc = {
        request: {
            headers: {}
        }
    };
    e.addRoute({
        path: '',
        example: spc
    });
    return function (req, res, next) {
        var headers = req.headers.foo;
        res.json({ success: true });
    };
};
var makePutFoo = function (v, e) {
    return function (req, res, next) {
        res.json({ success: 'f' });
    };
};
