import Operator from '../Operator';
import Subscriber from '../Subscriber';
export declare class ReduceOperator<T, R> implements Operator<T, R> {
    acc: R;
    project: (acc: R, x: T) => R;
    constructor(project: (acc: R, x: T) => R, acc?: R);
    call(subscriber: Subscriber<T>): Subscriber<T>;
}
export declare class ReduceSubscriber<T, R> extends Subscriber<T> {
    acc: R;
    hasSeed: boolean;
    hasValue: boolean;
    project: (acc: R, x: T) => R;
    constructor(destination: Subscriber<T>, project: (acc: R, x: T) => R, acc?: R);
    _next(x: any): void;
    _complete(): void;
}
