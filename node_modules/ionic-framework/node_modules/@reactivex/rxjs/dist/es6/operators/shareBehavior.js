import publishBehavior from './publishBehavior';
export default function shareBehavior(value) {
    return publishBehavior.call(this, value).refCount();
}
//# sourceMappingURL=shareBehavior.js.map