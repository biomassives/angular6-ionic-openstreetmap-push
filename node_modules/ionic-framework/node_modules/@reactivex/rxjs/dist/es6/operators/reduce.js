import { ReduceOperator } from './reduce-support';
export default function reduce(project, acc) {
    return this.lift(new ReduceOperator(project, acc));
}
//# sourceMappingURL=reduce.js.map