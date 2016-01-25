import publish from './publish';
export default function share() {
    return publish.call(this).refCount();
}
;
//# sourceMappingURL=share.js.map