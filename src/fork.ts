import { fork as sagaFork } from 'redux-saga/effects';

export default function fork(take, action, watcher): any {
    return sagaFork(take, action.toString(), watcher);
}
