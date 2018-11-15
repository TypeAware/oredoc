#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var fdec = function (target, field, desc) {
    console.log('target:', target);
    target.bar = 3;
};
var fdec2 = function () {
    console.log('target 1:');
    return function (target, field, desc) {
        console.log('target:', target);
        target.bar = 3;
    };
};
fdec;
fdec2();
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
console.log(Foo.bar);
console.log(new Foo());
