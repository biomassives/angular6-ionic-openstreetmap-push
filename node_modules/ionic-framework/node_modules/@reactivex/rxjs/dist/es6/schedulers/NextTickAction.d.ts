import ImmediateAction from './ImmediateAction';
import Action from './Action';
export default class NextTickAction<T> extends ImmediateAction<T> {
    private id;
    schedule(state?: any): Action;
    unsubscribe(): void;
}
