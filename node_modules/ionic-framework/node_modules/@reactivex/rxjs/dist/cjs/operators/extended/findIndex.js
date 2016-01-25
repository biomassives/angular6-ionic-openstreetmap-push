'use strict';

exports.__esModule = true;
exports['default'] = findIndex;

var _findSupport = require('./find-support');

function findIndex(predicate, thisArg) {
    return this.lift(new _findSupport.FindValueOperator(predicate, this, true, thisArg));
}

//# sourceMappingURL=findIndex.js.map
module.exports = exports['default'];
//# sourceMappingURL=findIndex.js.map