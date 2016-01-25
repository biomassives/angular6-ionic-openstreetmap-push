"use strict";

exports.__esModule = true;
exports["default"] = not;

function not(pred, thisArg) {
    function notPred() {
        return !notPred.pred.apply(notPred.thisArg, arguments);
    }
    notPred.pred = pred;
    notPred.thisArg = thisArg;
    return notPred;
}

//# sourceMappingURL=not.js.map
module.exports = exports["default"];
//# sourceMappingURL=not.js.map