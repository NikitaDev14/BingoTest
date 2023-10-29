import React from 'react';
import {MessageList} from './componenta/MessageList';
import {SendMessageForm} from './componenta/SendMessageForm';

export function App() {
    return (
        <React.Fragment>
            <h1>Bingo Real-Time Chat</h1>
            <MessageList/>
            <SendMessageForm/>
        </React.Fragment>
    );
}
