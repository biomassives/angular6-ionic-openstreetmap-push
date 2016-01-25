define(["require", "exports", './reduce-support'], function (require, exports, reduce_support_1) {
    function reduce(project, acc) {
        return this.lift(new reduce_support_1.ReduceOperator(project, acc));
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = reduce;
});
//# sourceMappingURL=reduce.js.map