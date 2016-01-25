define(["require", "exports", './publishBehavior'], function (require, exports, publishBehavior_1) {
    function shareBehavior(value) {
        return publishBehavior_1.default.call(this, value).refCount();
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = shareBehavior;
});
//# sourceMappingURL=shareBehavior.js.map