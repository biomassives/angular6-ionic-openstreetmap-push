import Observable from '../../Observable';
export default function max<T, R>(comparer?: (x: R, y: T) => R): Observable<R>;
