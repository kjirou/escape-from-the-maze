"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _bind = Function.prototype.bind;
var SingletomMixin = {

  _instance: null,

  getInstance: function getInstance() {
    if (this._instance && this._instance instanceof this) {
      return this._instance;
    }

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    this._instance = new (_bind.apply(this, [null].concat(args)))();
    return this._instance;
  },

  clearInstance: function clearInstance() {
    if (this._destructInstance) {
      this._destructInstance();
    }
    this._instance = null;
  }
};

exports["default"] = SingletomMixin;
module.exports = exports["default"];