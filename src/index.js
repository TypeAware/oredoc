'use strict';
exports.__esModule = true;
var logger_1 = require("./logger");
var safe = require("@oresoftware/safe-stringify");
var chalk_1 = require("chalk");
exports.r2gSmokeTest = function () {
    // r2g command line app uses this exported function
    return true;
};
var Entity = /** @class */ (function () {
    function Entity(name, routes) {
        this.name = name;
        this.routes = routes || {};
    }
    Entity.prototype.addRoute = function (v) {
        if (this.routes[v.path]) {
            throw new Error(exports.joinMessages('OreDoc entity with name', chalk_1["default"].bold(this.name), 'already has a  route with path:', chalk_1["default"].bold(v.path)));
        }
        this.routes[v.path] = v;
        return this;
    };
    Entity.prototype.attachTo = function (d) {
        d.addEntity(this);
        return this;
    };
    return Entity;
}());
exports.Entity = Entity;
exports.joinMessages = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.join(' ');
};
var DocGen = /** @class */ (function () {
    function DocGen() {
        this.info = {
            entities: {},
            miscRoutes: {}
        };
    }
    DocGen.prototype.createEntity = function (name, routes) {
        return new Entity(name, routes);
    };
    DocGen.prototype.createAndAddEntity = function (name, routes) {
        if (this.info.entities[name]) {
            throw new Error(exports.joinMessages('OreDoc already has an entity with name:', name));
        }
        var entity = this.createEntity(name, routes);
        this.info.entities[entity.name] = entity;
        return entity;
    };
    DocGen.prototype.addEntity = function (v) {
        if (this.info.entities[v.name]) {
            throw new Error(exports.joinMessages('OreDoc already has an entity with name:', v.name));
        }
        this.info.entities[v.name] = v;
        return this;
    };
    DocGen.prototype.addMiscRoute = function (v) {
        if (this.info.miscRoutes[v.path]) {
            throw new Error(exports.joinMessages('OreDoc already has a misc route with path:', v.path));
        }
        this.info.miscRoutes[v.path] = v;
        return this;
    };
    DocGen.prototype.addRoute = function (entity, v) {
        return this;
    };
    DocGen.prototype.serialize = function () {
        return safe.stringify(this.info);
    };
    DocGen.prototype.serve = function () {
        var _this = this;
        return function (req, res, next) {
            try {
                res.json(_this.info);
            }
            catch (err) {
                logger_1["default"].error(err);
                next(err);
            }
        };
    };
    return DocGen;
}());
exports.DocGen = DocGen;
