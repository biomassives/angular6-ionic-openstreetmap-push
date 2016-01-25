'use strict';

exports.__esModule = true;
exports['default'] = tryCatch;

var _errorObject = require('./errorObject');

var tryCatchTarget = undefined;
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    } catch (e) {
        _errorObject.errorObject.e = e;
        return _errorObject.errorObject;
    }
}

function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}

;
//# sourceMappingURL=tryCatch.js.map
module.exports = exports['default'];
//# sourceMappingURL=tryCatch.js.map