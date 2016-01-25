'use strict';

exports.__esModule = true;
exports['default'] = zipAll;

var _zipSupport = require('./zip-support');

function zipAll(project) {
    return this.lift(new _zipSupport.ZipOperator(project));
}

//# sourceMappingURL=zipAll.js.map
module.exports = exports['default'];
//# sourceMappingURL=zipAll.js.map