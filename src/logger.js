"use strict";
exports.__esModule = true;
exports.log = {
    info: console.log.bind(console, 'oredoc:'),
    error: console.error.bind(console, 'oredoc:')
};
exports["default"] = exports.log;
