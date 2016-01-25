'use strict';

exports.__esModule = true;
exports['default'] = switchMapTo;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

var _OuterSubscriber2 = require('../OuterSubscriber');

var _OuterSubscriber3 = _interopRequireDefault(_OuterSubscriber2);

var _utilSubscribeToResult = require('../util/subscribeToResult');

var _utilSubscribeToResult2 = _interopRequireDefault(_utilSubscribeToResult);

function switchMapTo(observable, projectResult) {
    return this.lift(new SwitchMapToOperator(observable, projectResult));
}

var SwitchMapToOperator = (function () {
    function SwitchMapToOperator(observable, resultSelector) {
        _classCallCheck(this, SwitchMapToOperator);

        this.observable = observable;
        this.resultSelector = resultSelector;
    }

    SwitchMapToOperator.prototype.call = function call(subscriber) {
        return new SwitchMapToSubscriber(subscriber, this.observable, this.resultSelector);
    };

    return SwitchMapToOperator;
})();

var SwitchMapToSubscriber = (function (_OuterSubscriber) {
    _inherits(SwitchMapToSubscriber, _OuterSubscriber);

    function SwitchMapToSubscriber(destination, inner, resultSelector) {
        _classCallCheck(this, SwitchMapToSubscriber);

        _OuterSubscriber.call(this, destination);
        this.inner = inner;
        this.resultSelector = resultSelector;
        this.hasCompleted = false;
        this.index = 0;
    }

    //# sourceMappingURL=switchMapTo.js.map

    SwitchMapToSubscriber.prototype._next = function _next(value) {
        var index = this.index++;
        var innerSubscription = this.innerSubscription;
        if (innerSubscription) {
            innerSubscription.unsubscribe();
        }
        this.add(this.innerSubscription = _utilSubscribeToResult2['default'](this, this.inner, value, index));
    };

    SwitchMapToSubscriber.prototype._complete = function _complete() {
        var innerSubscription = this.innerSubscription;
        this.hasCompleted = true;
        if (!innerSubscription || innerSubscription.isUnsubscribed) {
            this.destination.complete();
        }
    };

    SwitchMapToSubscriber.prototype.notifyComplete = function notifyComplete(innerSub) {
        this.remove(innerSub);
        var prevSubscription = this.innerSubscription;
        if (prevSubscription) {
            prevSubscription.unsubscribe();
        }
        this.innerSubscription = null;
        if (this.hasCompleted) {
            this.destination.complete();
        }
    };

    SwitchMapToSubscriber.prototype.notifyError = function notifyError(err) {
        this.destination.error(err);
    };

    SwitchMapToSubscriber.prototype.notifyNext = function notifyNext(outerValue, innerValue, outerIndex, innerIndex) {
        var resultSelector = this.resultSelector;
        var destination = this.destination;

        if (resultSelector) {
            var result = _utilTryCatch2['default'](resultSelector)(outerValue, innerValue, outerIndex, innerIndex);
            if (result === _utilErrorObject.errorObject) {
                destination.error(_utilErrorObject.errorObject.e);
            } else {
                destination.next(result);
            }
        } else {
            destination.next(innerValue);
        }
    };

    return SwitchMapToSubscriber;
})(_OuterSubscriber3['default']);

module.exports = exports['default'];
//# sourceMappingURL=switchMapTo.js.map