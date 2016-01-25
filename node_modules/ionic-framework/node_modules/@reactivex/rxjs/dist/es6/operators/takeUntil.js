import Subscriber from '../Subscriber';
export default function takeUntil(notifier) {
    return this.lift(new TakeUntilOperator(notifier));
}
class TakeUntilOperator {
    constructor(notifier) {
        this.notifier = notifier;
    }
    call(subscriber) {
        return new TakeUntilSubscriber(subscriber, this.notifier);
    }
}
class TakeUntilSubscriber extends Subscriber {
    constructor(destination, notifier) {
        super(destination);
        this.notifier = notifier;
        this.notificationSubscriber = null;
        this.notificationSubscriber = new TakeUntilInnerSubscriber(destination);
        this.add(notifier.subscribe(this.notificationSubscriber));
    }
    _complete() {
        this.destination.complete();
        this.notificationSubscriber.unsubscribe();
    }
}
class TakeUntilInnerSubscriber extends Subscriber {
    constructor(destination) {
        super(null);
        this.destination = destination;
    }
    _next() {
        this.destination.complete();
    }
    _error(e) {
        this.destination.error(e);
    }
    _complete() {
    }
}
//# sourceMappingURL=takeUntil.js.map