'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports['default'] = scan;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

function scan(project, acc) {
    return this.lift(new ScanOperator(project, acc));
}

var ScanOperator = (function () {
    function ScanOperator(project, acc) {
        _classCallCheck(this, ScanOperator);

        this.acc = acc;
        this.project = project;
    }

    ScanOperator.prototype.call = function call(subscriber) {
        return new ScanSubscriber(subscriber, this.project, this.acc);
    };

    return ScanOperator;
})();

var ScanSubscriber = (function (_Subscriber) {
    _inherits(ScanSubscriber, _Subscriber);

    function ScanSubscriber(destination, project, acc) {
        _classCallCheck(this, ScanSubscriber);

        _Subscriber.call(this, destination);
        this.accumulatorSet = false;
        this.acc = acc;
        this.project = project;
        this.accumulatorSet = typeof acc !== 'undefined';
    }

    //# sourceMappingURL=scan.js.map

    ScanSubscriber.prototype._next = function _next(x) {
        if (!this.accumulatorSet) {
            this.acc = x;
            this.destination.next(x);
        } else {
            var result = _utilTryCatch2['default'](this.project).call(this, this.acc, x);
            if (result === _utilErrorObject.errorObject) {
                this.destination.error(_utilErrorObject.errorObject.e);
            } else {
                this.acc = result;
                this.destination.next(this.acc);
            }
        }
    };

    _createClass(ScanSubscriber, [{
        key: 'acc',
        get: function get() {
            return this._acc;
        },
        set: function set(value) {
            this.accumulatorSet = true;
            this._acc = value;
        }
    }]);

    return ScanSubscriber;
})(_Subscriber3['default']);

module.exports = exports['default'];
//# sourceMappingURL=scan.js.map