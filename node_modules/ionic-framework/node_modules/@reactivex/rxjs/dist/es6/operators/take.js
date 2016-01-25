import Subscriber from '../Subscriber';
export default function take(total) {
    return this.lift(new TakeOperator(total));
}
class TakeOperator {
    constructor(total) {
        this.total = total;
    }
    call(subscriber) {
        return new TakeSubscriber(subscriber, this.total);
    }
}
class TakeSubscriber extends Subscriber {
    constructor(destination, total) {
        super(destination);
        this.total = total;
        this.count = 0;
    }
    _next(value) {
        const total = this.total;
        if (++this.count <= total) {
            this.destination.next(value);
            if (this.count === total) {
                this.destination.complete();
            }
        }
    }
}
//# sourceMappingURL=take.js.map