'use strict';

exports.__esModule = true;
exports['default'] = retryWhen;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber4 = require('../Subscriber');

var _Subscriber5 = _interopRequireDefault(_Subscriber4);

var _Subject = require('../Subject');

var _Subject2 = _interopRequireDefault(_Subject);

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

function retryWhen(notifier) {
    return this.lift(new RetryWhenOperator(notifier, this));
}

var RetryWhenOperator = (function () {
    function RetryWhenOperator(notifier, source) {
        _classCallCheck(this, RetryWhenOperator);

        this.notifier = notifier;
        this.source = source;
    }

    RetryWhenOperator.prototype.call = function call(subscriber) {
        return new FirstRetryWhenSubscriber(subscriber, this.notifier, this.source);
    };

    return RetryWhenOperator;
})();

var FirstRetryWhenSubscriber = (function (_Subscriber) {
    _inherits(FirstRetryWhenSubscriber, _Subscriber);

    function FirstRetryWhenSubscriber(destination, notifier, source) {
        _classCallCheck(this, FirstRetryWhenSubscriber);

        _Subscriber.call(this, null);
        this.destination = destination;
        this.notifier = notifier;
        this.source = source;
        this.lastSubscription = this;
    }

    FirstRetryWhenSubscriber.prototype._next = function _next(value) {
        this.destination.next(value);
    };

    FirstRetryWhenSubscriber.prototype.error = function error(err) {
        if (!this.isUnsubscribed) {
            _Subscriber.prototype.unsubscribe.call(this);
            if (!this.retryNotifications) {
                this.errors = new _Subject2['default']();
                var notifications = _utilTryCatch2['default'](this.notifier).call(this, this.errors);
                if (notifications === _utilErrorObject.errorObject) {
                    this.destination.error(_utilErrorObject.errorObject.e);
                } else {
                    this.retryNotifications = notifications;
                    var notificationSubscriber = new RetryNotificationSubscriber(this);
                    this.notificationSubscription = notifications.subscribe(notificationSubscriber);
                }
            }
            this.errors.next(err);
        }
    };

    FirstRetryWhenSubscriber.prototype.destinationError = function destinationError(err) {
        this.tearDown();
        this.destination.error(err);
    };

    FirstRetryWhenSubscriber.prototype._complete = function _complete() {
        this.destinationComplete();
    };

    FirstRetryWhenSubscriber.prototype.destinationComplete = function destinationComplete() {
        this.tearDown();
        this.destination.complete();
    };

    FirstRetryWhenSubscriber.prototype.unsubscribe = function unsubscribe() {
        var lastSubscription = this.lastSubscription;
        if (lastSubscription === this) {
            _Subscriber.prototype.unsubscribe.call(this);
        } else {
            this.tearDown();
        }
    };

    FirstRetryWhenSubscriber.prototype.tearDown = function tearDown() {
        _Subscriber.prototype.unsubscribe.call(this);
        this.lastSubscription.unsubscribe();
        var notificationSubscription = this.notificationSubscription;
        if (notificationSubscription) {
            notificationSubscription.unsubscribe();
        }
    };

    FirstRetryWhenSubscriber.prototype.resubscribe = function resubscribe() {
        this.lastSubscription.unsubscribe();
        var nextSubscriber = new MoreRetryWhenSubscriber(this);
        this.lastSubscription = this.source.subscribe(nextSubscriber);
    };

    return FirstRetryWhenSubscriber;
})(_Subscriber5['default']);

var MoreRetryWhenSubscriber = (function (_Subscriber2) {
    _inherits(MoreRetryWhenSubscriber, _Subscriber2);

    function MoreRetryWhenSubscriber(parent) {
        _classCallCheck(this, MoreRetryWhenSubscriber);

        _Subscriber2.call(this, null);
        this.parent = parent;
    }

    MoreRetryWhenSubscriber.prototype._next = function _next(value) {
        this.parent.destination.next(value);
    };

    MoreRetryWhenSubscriber.prototype._error = function _error(err) {
        this.parent.errors.next(err);
    };

    MoreRetryWhenSubscriber.prototype._complete = function _complete() {
        this.parent.destinationComplete();
    };

    return MoreRetryWhenSubscriber;
})(_Subscriber5['default']);

var RetryNotificationSubscriber = (function (_Subscriber3) {
    _inherits(RetryNotificationSubscriber, _Subscriber3);

    function RetryNotificationSubscriber(parent) {
        _classCallCheck(this, RetryNotificationSubscriber);

        _Subscriber3.call(this, null);
        this.parent = parent;
    }

    //# sourceMappingURL=retryWhen.js.map

    RetryNotificationSubscriber.prototype._next = function _next(value) {
        this.parent.resubscribe();
    };

    RetryNotificationSubscriber.prototype._error = function _error(err) {
        this.parent.destinationError(err);
    };

    RetryNotificationSubscriber.prototype._complete = function _complete() {
        this.parent.destinationComplete();
    };

    return RetryNotificationSubscriber;
})(_Subscriber5['default']);

module.exports = exports['default'];
//# sourceMappingURL=retryWhen.js.map