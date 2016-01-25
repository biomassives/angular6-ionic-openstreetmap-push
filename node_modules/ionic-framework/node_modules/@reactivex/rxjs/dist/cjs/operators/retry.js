'use strict';

exports.__esModule = true;
exports['default'] = retry;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber3 = require('../Subscriber');

var _Subscriber4 = _interopRequireDefault(_Subscriber3);

function retry() {
    var count = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

    return this.lift(new RetryOperator(count, this));
}

var RetryOperator = (function () {
    function RetryOperator(count, source) {
        _classCallCheck(this, RetryOperator);

        this.count = count;
        this.source = source;
    }

    RetryOperator.prototype.call = function call(subscriber) {
        return new FirstRetrySubscriber(subscriber, this.count, this.source);
    };

    return RetryOperator;
})();

var FirstRetrySubscriber = (function (_Subscriber) {
    _inherits(FirstRetrySubscriber, _Subscriber);

    function FirstRetrySubscriber(destination, count, source) {
        _classCallCheck(this, FirstRetrySubscriber);

        _Subscriber.call(this, null);
        this.destination = destination;
        this.count = count;
        this.source = source;
        this.lastSubscription = this;
    }

    FirstRetrySubscriber.prototype._next = function _next(value) {
        this.destination.next(value);
    };

    FirstRetrySubscriber.prototype.error = function error(_error) {
        if (!this.isUnsubscribed) {
            _Subscriber.prototype.unsubscribe.call(this);
            this.resubscribe();
        }
    };

    FirstRetrySubscriber.prototype._complete = function _complete() {
        _Subscriber.prototype.unsubscribe.call(this);
        this.destination.complete();
    };

    FirstRetrySubscriber.prototype.unsubscribe = function unsubscribe() {
        var lastSubscription = this.lastSubscription;
        if (lastSubscription === this) {
            _Subscriber.prototype.unsubscribe.call(this);
        } else {
            lastSubscription.unsubscribe();
        }
    };

    FirstRetrySubscriber.prototype.resubscribe = function resubscribe() {
        var retried = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

        this.lastSubscription.unsubscribe();
        var nextSubscriber = new RetryMoreSubscriber(this, this.count, retried + 1);
        this.lastSubscription = this.source.subscribe(nextSubscriber);
    };

    return FirstRetrySubscriber;
})(_Subscriber4['default']);

var RetryMoreSubscriber = (function (_Subscriber2) {
    _inherits(RetryMoreSubscriber, _Subscriber2);

    function RetryMoreSubscriber(parent, count) {
        var retried = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

        _classCallCheck(this, RetryMoreSubscriber);

        _Subscriber2.call(this, null);
        this.parent = parent;
        this.count = count;
        this.retried = retried;
    }

    //# sourceMappingURL=retry.js.map

    RetryMoreSubscriber.prototype._next = function _next(value) {
        this.parent.destination.next(value);
    };

    RetryMoreSubscriber.prototype._error = function _error(err) {
        var parent = this.parent;
        var retried = this.retried;
        var count = this.count;
        if (count && retried === count) {
            parent.destination.error(err);
        } else {
            parent.resubscribe(retried);
        }
    };

    RetryMoreSubscriber.prototype._complete = function _complete() {
        this.parent.destination.complete();
    };

    return RetryMoreSubscriber;
})(_Subscriber4['default']);

module.exports = exports['default'];
//# sourceMappingURL=retry.js.map