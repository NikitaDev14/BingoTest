import React from 'react';
import {MessageList} from './components/MessageList';
import {SendMessageForm} from './components/SendMessageForm';

export function App() {
    return (
        <React.Fragment>
            <h1>Bingo Real-Time Chat</h1>
            <MessageList/>
            <SendMessageForm/>
        </React.Fragment>
    );
}
