import Subject from '../Subject';
import Subscriber from '../Subscriber';
import Subscription from '../Subscription';
export default class BehaviorSubject<T> extends Subject<T> {
    value: any;
    constructor(value: any);
    _subscribe(subscriber: Subscriber<any>): Subscription<T>;
    _next(value?: any): void;
}
