'use strict';

exports.__esModule = true;

var _root = require('./root');

if (!_root.root.Symbol) {
    _root.root.Symbol = {};
}
if (!_root.root.Symbol.observable) {
    if (typeof _root.root.Symbol['for'] === 'function') {
        _root.root.Symbol.observable = _root.root.Symbol['for']('observable');
    } else {
        _root.root.Symbol.observable = '@@observable';
    }
}
exports['default'] = _root.root.Symbol.observable;

//# sourceMappingURL=Symbol_observable.js.map
module.exports = exports['default'];
//# sourceMappingURL=Symbol_observable.js.map