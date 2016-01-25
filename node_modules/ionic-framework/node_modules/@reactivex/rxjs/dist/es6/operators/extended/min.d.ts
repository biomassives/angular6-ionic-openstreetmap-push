import Observable from '../../Observable';
export default function min<T, R>(comparer?: (x: R, y: T) => R): Observable<R>;
