'use strict';

exports.__esModule = true;
exports['default'] = windowToggle;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber4 = require('../Subscriber');

var _Subscriber5 = _interopRequireDefault(_Subscriber4);

var _Subject = require('../Subject');

var _Subject2 = _interopRequireDefault(_Subject);

var _Subscription = require('../Subscription');

var _Subscription2 = _interopRequireDefault(_Subscription);

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

function windowToggle(openings, closingSelector) {
    return this.lift(new WindowToggleOperator(openings, closingSelector));
}

var WindowToggleOperator = (function () {
    function WindowToggleOperator(openings, closingSelector) {
        _classCallCheck(this, WindowToggleOperator);

        this.openings = openings;
        this.closingSelector = closingSelector;
    }

    WindowToggleOperator.prototype.call = function call(subscriber) {
        return new WindowToggleSubscriber(subscriber, this.openings, this.closingSelector);
    };

    return WindowToggleOperator;
})();

var WindowToggleSubscriber = (function (_Subscriber) {
    _inherits(WindowToggleSubscriber, _Subscriber);

    function WindowToggleSubscriber(destination, openings, closingSelector) {
        _classCallCheck(this, WindowToggleSubscriber);

        _Subscriber.call(this, destination);
        this.openings = openings;
        this.closingSelector = closingSelector;
        this.contexts = [];
        this.add(this.openings._subscribe(new WindowToggleOpeningsSubscriber(this)));
    }

    WindowToggleSubscriber.prototype._next = function _next(value) {
        var contexts = this.contexts;
        var len = contexts.length;
        for (var i = 0; i < len; i++) {
            contexts[i].window.next(value);
        }
    };

    WindowToggleSubscriber.prototype._error = function _error(err) {
        var contexts = this.contexts;
        while (contexts.length > 0) {
            contexts.shift().window.error(err);
        }
        this.destination.error(err);
    };

    WindowToggleSubscriber.prototype._complete = function _complete() {
        var contexts = this.contexts;
        while (contexts.length > 0) {
            var context = contexts.shift();
            context.window.complete();
            context.subscription.unsubscribe();
        }
        this.destination.complete();
    };

    WindowToggleSubscriber.prototype.openWindow = function openWindow(value) {
        var closingSelector = this.closingSelector;
        var closingNotifier = _utilTryCatch2['default'](closingSelector)(value);
        if (closingNotifier === _utilErrorObject.errorObject) {
            this.error(closingNotifier.e);
        } else {
            var context = {
                window: new _Subject2['default'](),
                subscription: new _Subscription2['default']()
            };
            this.contexts.push(context);
            this.destination.next(context.window);
            var subscriber = new WindowClosingNotifierSubscriber(this, context);
            var subscription = closingNotifier._subscribe(subscriber);
            this.add(context.subscription.add(subscription));
        }
    };

    WindowToggleSubscriber.prototype.closeWindow = function closeWindow(context) {
        var window = context.window;
        var subscription = context.subscription;

        var contexts = this.contexts;
        contexts.splice(contexts.indexOf(context), 1);
        window.complete();
        this.remove(subscription);
        subscription.unsubscribe();
    };

    return WindowToggleSubscriber;
})(_Subscriber5['default']);

var WindowClosingNotifierSubscriber = (function (_Subscriber2) {
    _inherits(WindowClosingNotifierSubscriber, _Subscriber2);

    function WindowClosingNotifierSubscriber(parent, windowContext) {
        _classCallCheck(this, WindowClosingNotifierSubscriber);

        _Subscriber2.call(this, null);
        this.parent = parent;
        this.windowContext = windowContext;
    }

    WindowClosingNotifierSubscriber.prototype._next = function _next() {
        this.parent.closeWindow(this.windowContext);
    };

    WindowClosingNotifierSubscriber.prototype._error = function _error(err) {
        this.parent.error(err);
    };

    WindowClosingNotifierSubscriber.prototype._complete = function _complete() {
        this.parent.closeWindow(this.windowContext);
    };

    return WindowClosingNotifierSubscriber;
})(_Subscriber5['default']);

var WindowToggleOpeningsSubscriber = (function (_Subscriber3) {
    _inherits(WindowToggleOpeningsSubscriber, _Subscriber3);

    function WindowToggleOpeningsSubscriber(parent) {
        _classCallCheck(this, WindowToggleOpeningsSubscriber);

        _Subscriber3.call(this);
        this.parent = parent;
    }

    //# sourceMappingURL=windowToggle.js.map

    WindowToggleOpeningsSubscriber.prototype._next = function _next(value) {
        this.parent.openWindow(value);
    };

    WindowToggleOpeningsSubscriber.prototype._error = function _error(err) {
        this.parent.error(err);
    };

    WindowToggleOpeningsSubscriber.prototype._complete = function _complete() {
        // noop
    };

    return WindowToggleOpeningsSubscriber;
})(_Subscriber5['default']);

module.exports = exports['default'];
//# sourceMappingURL=windowToggle.js.map