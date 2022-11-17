"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _TestUser_email, _TestUser_name;
Object.defineProperty(exports, "__esModule", { value: true });
class TestUser {
    constructor(email, name) {
        _TestUser_email.set(this, void 0);
        _TestUser_name.set(this, void 0);
        __classPrivateFieldSet(this, _TestUser_email, email, "f");
        __classPrivateFieldSet(this, _TestUser_name, name, "f");
    }
    get email() {
        return __classPrivateFieldGet(this, _TestUser_email, "f");
    }
    get name() {
        return __classPrivateFieldGet(this, _TestUser_name, "f");
    }
}
exports.default = TestUser;
_TestUser_email = new WeakMap(), _TestUser_name = new WeakMap();
