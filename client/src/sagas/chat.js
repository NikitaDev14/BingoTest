import { put, take, takeEvery, call, all } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import {addMessage, sendMessage} from '../redux/chat';

let socket;

function createWebSocketChannel() {
    return eventChannel((emit) => {
        function createWebSocket() {
            socket = new WebSocket('ws://localhost:8080');

            socket.onmessage = (event) => {
                emit(JSON.parse(event.data));
            };
            socket.onclose = e => {
                if (e.code === 1005) {
                    console.log("WebSocket: closed");
                    emit(END);
                } else {
                    console.log('Socket is closed Unexpectedly. Reconnect will be attempted in 4 second.', e.reason);
                    setTimeout(() =>  {
                        createWebSocket();
                    }, 4000);
                }
            };
        }

        createWebSocket();

        return () => {
            socket.close();
        };
    });
}

function* sendMessageToWebSocket(action) {
    const { payload } = action;

    yield call([socket, socket.send], JSON.stringify(payload));
}

function* watchWebSocket() {
    const channel = yield call(createWebSocketChannel);

    while (true) {
        const message = yield take(channel);
        yield put(addMessage(message));
    }
}

function* watchMessageSending() {
    yield takeEvery(sendMessage, sendMessageToWebSocket);
}

export function* rootSaga() {
    yield all([
        watchWebSocket(),
        watchMessageSending(),
    ]);
}
