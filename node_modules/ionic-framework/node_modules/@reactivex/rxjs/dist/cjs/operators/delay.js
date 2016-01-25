'use strict';

exports.__esModule = true;
exports['default'] = delay;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

var _Notification = require('../Notification');

var _Notification2 = _interopRequireDefault(_Notification);

var _schedulersImmediate = require('../schedulers/immediate');

var _schedulersImmediate2 = _interopRequireDefault(_schedulersImmediate);

var _utilIsDate = require('../util/isDate');

var _utilIsDate2 = _interopRequireDefault(_utilIsDate);

function delay(delay) {
    var scheduler = arguments.length <= 1 || arguments[1] === undefined ? _schedulersImmediate2['default'] : arguments[1];

    var absoluteDelay = _utilIsDate2['default'](delay);
    var delayFor = absoluteDelay ? +delay - scheduler.now() : delay;
    return this.lift(new DelayOperator(delayFor, scheduler));
}

var DelayOperator = (function () {
    function DelayOperator(delay, scheduler) {
        _classCallCheck(this, DelayOperator);

        this.delay = delay;
        this.scheduler = scheduler;
    }

    DelayOperator.prototype.call = function call(subscriber) {
        return new DelaySubscriber(subscriber, this.delay, this.scheduler);
    };

    return DelayOperator;
})();

var DelaySubscriber = (function (_Subscriber) {
    _inherits(DelaySubscriber, _Subscriber);

    function DelaySubscriber(destination, delay, scheduler) {
        _classCallCheck(this, DelaySubscriber);

        _Subscriber.call(this, destination);
        this.delay = delay;
        this.scheduler = scheduler;
        this.queue = [];
        this.active = false;
        this.errored = false;
    }

    DelaySubscriber.dispatch = function dispatch(state) {
        var source = state.source;
        var queue = source.queue;
        var scheduler = state.scheduler;
        var destination = state.destination;
        while (queue.length > 0 && queue[0].time - scheduler.now() <= 0) {
            queue.shift().notification.observe(destination);
        }
        if (queue.length > 0) {
            var _delay = Math.max(0, queue[0].time - scheduler.now());
            this.schedule(state, _delay);
        } else {
            source.active = false;
        }
    };

    DelaySubscriber.prototype._schedule = function _schedule(scheduler) {
        this.active = true;
        this.add(scheduler.schedule(DelaySubscriber.dispatch, this.delay, {
            source: this, destination: this.destination, scheduler: scheduler
        }));
    };

    DelaySubscriber.prototype.scheduleNotification = function scheduleNotification(notification) {
        if (this.errored === true) {
            return;
        }
        var scheduler = this.scheduler;
        var message = new DelayMessage(scheduler.now() + this.delay, notification);
        this.queue.push(message);
        if (this.active === false) {
            this._schedule(scheduler);
        }
    };

    DelaySubscriber.prototype._next = function _next(value) {
        this.scheduleNotification(_Notification2['default'].createNext(value));
    };

    DelaySubscriber.prototype._error = function _error(err) {
        this.errored = true;
        this.queue = [];
        this.destination.error(err);
    };

    DelaySubscriber.prototype._complete = function _complete() {
        this.scheduleNotification(_Notification2['default'].createComplete());
    };

    return DelaySubscriber;
})(_Subscriber3['default']);

var DelayMessage = function DelayMessage(time, notification) {
    _classCallCheck(this, DelayMessage);

    this.time = time;
    this.notification = notification;
}
//# sourceMappingURL=delay.js.map
;

module.exports = exports['default'];
//# sourceMappingURL=delay.js.map