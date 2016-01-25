import Observable from '../Observable';
export default function reduce<T, R>(project: (acc: R, x: T) => R, acc?: R): Observable<R>;
