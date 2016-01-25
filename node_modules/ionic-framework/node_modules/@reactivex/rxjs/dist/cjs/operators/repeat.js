'use strict';

exports.__esModule = true;
exports['default'] = repeat;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber3 = require('../Subscriber');

var _Subscriber4 = _interopRequireDefault(_Subscriber3);

var _observablesEmptyObservable = require('../observables/EmptyObservable');

var _observablesEmptyObservable2 = _interopRequireDefault(_observablesEmptyObservable);

function repeat() {
    var count = arguments.length <= 0 || arguments[0] === undefined ? -1 : arguments[0];

    if (count === 0) {
        return _observablesEmptyObservable2['default'].create();
    } else {
        return this.lift(new RepeatOperator(count, this));
    }
}

var RepeatOperator = (function () {
    function RepeatOperator(count, source) {
        _classCallCheck(this, RepeatOperator);

        this.count = count;
        this.source = source;
    }

    RepeatOperator.prototype.call = function call(subscriber) {
        return new FirstRepeatSubscriber(subscriber, this.count, this.source);
    };

    return RepeatOperator;
})();

var FirstRepeatSubscriber = (function (_Subscriber) {
    _inherits(FirstRepeatSubscriber, _Subscriber);

    function FirstRepeatSubscriber(destination, count, source) {
        _classCallCheck(this, FirstRepeatSubscriber);

        _Subscriber.call(this, null);
        this.destination = destination;
        this.count = count;
        this.source = source;
        if (count === 0) {
            this.destination.complete();
            _Subscriber.prototype.unsubscribe.call(this);
        }
        this.lastSubscription = this;
    }

    FirstRepeatSubscriber.prototype._next = function _next(value) {
        this.destination.next(value);
    };

    FirstRepeatSubscriber.prototype._error = function _error(err) {
        this.destination.error(err);
    };

    FirstRepeatSubscriber.prototype.complete = function complete() {
        if (!this.isUnsubscribed) {
            this.resubscribe(this.count);
        }
    };

    FirstRepeatSubscriber.prototype.unsubscribe = function unsubscribe() {
        var lastSubscription = this.lastSubscription;
        if (lastSubscription === this) {
            _Subscriber.prototype.unsubscribe.call(this);
        } else {
            lastSubscription.unsubscribe();
        }
    };

    FirstRepeatSubscriber.prototype.resubscribe = function resubscribe(count) {
        this.lastSubscription.unsubscribe();
        if (count - 1 === 0) {
            this.destination.complete();
        } else {
            var nextSubscriber = new MoreRepeatSubscriber(this, count - 1);
            this.lastSubscription = this.source.subscribe(nextSubscriber);
        }
    };

    return FirstRepeatSubscriber;
})(_Subscriber4['default']);

var MoreRepeatSubscriber = (function (_Subscriber2) {
    _inherits(MoreRepeatSubscriber, _Subscriber2);

    function MoreRepeatSubscriber(parent, count) {
        _classCallCheck(this, MoreRepeatSubscriber);

        _Subscriber2.call(this, null);
        this.parent = parent;
        this.count = count;
    }

    //# sourceMappingURL=repeat.js.map

    MoreRepeatSubscriber.prototype._next = function _next(value) {
        this.parent.destination.next(value);
    };

    MoreRepeatSubscriber.prototype._error = function _error(err) {
        this.parent.destination.error(err);
    };

    MoreRepeatSubscriber.prototype._complete = function _complete() {
        var count = this.count;
        this.parent.resubscribe(count < 0 ? -1 : count);
    };

    return MoreRepeatSubscriber;
})(_Subscriber4['default']);

module.exports = exports['default'];
//# sourceMappingURL=repeat.js.map