import { ReduceOperator } from '../reduce-support';
export default function max(comparer) {
    const max = (typeof comparer === 'function')
        ? comparer
        : (x, y) => x > y ? x : y;
    return this.lift(new ReduceOperator(max));
}
//# sourceMappingURL=max.js.map