'use strict';

exports.__esModule = true;
exports['default'] = shareBehavior;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _publishBehavior = require('./publishBehavior');

var _publishBehavior2 = _interopRequireDefault(_publishBehavior);

function shareBehavior(value) {
    return _publishBehavior2['default'].call(this, value).refCount();
}

//# sourceMappingURL=shareBehavior.js.map
module.exports = exports['default'];
//# sourceMappingURL=shareBehavior.js.map