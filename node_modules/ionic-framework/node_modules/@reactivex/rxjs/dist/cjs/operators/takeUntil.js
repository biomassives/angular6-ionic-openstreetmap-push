'use strict';

exports.__esModule = true;
exports['default'] = takeUntil;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber3 = require('../Subscriber');

var _Subscriber4 = _interopRequireDefault(_Subscriber3);

function takeUntil(notifier) {
    return this.lift(new TakeUntilOperator(notifier));
}

var TakeUntilOperator = (function () {
    function TakeUntilOperator(notifier) {
        _classCallCheck(this, TakeUntilOperator);

        this.notifier = notifier;
    }

    TakeUntilOperator.prototype.call = function call(subscriber) {
        return new TakeUntilSubscriber(subscriber, this.notifier);
    };

    return TakeUntilOperator;
})();

var TakeUntilSubscriber = (function (_Subscriber) {
    _inherits(TakeUntilSubscriber, _Subscriber);

    function TakeUntilSubscriber(destination, notifier) {
        _classCallCheck(this, TakeUntilSubscriber);

        _Subscriber.call(this, destination);
        this.notifier = notifier;
        this.notificationSubscriber = null;
        this.notificationSubscriber = new TakeUntilInnerSubscriber(destination);
        this.add(notifier.subscribe(this.notificationSubscriber));
    }

    TakeUntilSubscriber.prototype._complete = function _complete() {
        this.destination.complete();
        this.notificationSubscriber.unsubscribe();
    };

    return TakeUntilSubscriber;
})(_Subscriber4['default']);

var TakeUntilInnerSubscriber = (function (_Subscriber2) {
    _inherits(TakeUntilInnerSubscriber, _Subscriber2);

    function TakeUntilInnerSubscriber(destination) {
        _classCallCheck(this, TakeUntilInnerSubscriber);

        _Subscriber2.call(this, null);
        this.destination = destination;
    }

    //# sourceMappingURL=takeUntil.js.map

    TakeUntilInnerSubscriber.prototype._next = function _next() {
        this.destination.complete();
    };

    TakeUntilInnerSubscriber.prototype._error = function _error(e) {
        this.destination.error(e);
    };

    TakeUntilInnerSubscriber.prototype._complete = function _complete() {};

    return TakeUntilInnerSubscriber;
})(_Subscriber4['default']);

module.exports = exports['default'];
//# sourceMappingURL=takeUntil.js.map