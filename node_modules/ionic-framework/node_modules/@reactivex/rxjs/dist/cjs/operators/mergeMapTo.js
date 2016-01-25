'use strict';

exports.__esModule = true;
exports['default'] = mergeMapTo;

var _mergeMapToSupport = require('./mergeMapTo-support');

function mergeMapTo(observable, resultSelector) {
    var concurrent = arguments.length <= 2 || arguments[2] === undefined ? Number.POSITIVE_INFINITY : arguments[2];

    return this.lift(new _mergeMapToSupport.MergeMapToOperator(observable, resultSelector, concurrent));
}

//# sourceMappingURL=mergeMapTo.js.map
module.exports = exports['default'];
//# sourceMappingURL=mergeMapTo.js.map