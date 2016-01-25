'use strict';

exports.__esModule = true;
exports['default'] = find;

var _findSupport = require('./find-support');

function find(predicate, thisArg) {
    return this.lift(new _findSupport.FindValueOperator(predicate, this, false, thisArg));
}

//# sourceMappingURL=find.js.map
module.exports = exports['default'];
//# sourceMappingURL=find.js.map