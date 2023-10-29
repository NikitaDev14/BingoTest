import {useSelector} from 'react-redux';
import React, {useEffect, useRef} from 'react';
import styles from './MessageList.module.scss'

export function MessageList() {
    const messages = useSelector((state) => state.chat.messages);
    const messageList = useRef();

    useEffect(() => {
        messageList.current.scrollTop = messageList.current.scrollHeight;
    }, [messages]);

    return (
        <div ref={messageList} className={styles.messages}>
            {messages.length ? messages.map((msg, index) => (
                <div key={index}>
                    <div className={styles.message}>
                        <div><strong>{msg.user}</strong></div>
                        <div>{msg.text}</div>
                    </div>
                </div>
            )) : <p>No messages</p>}
        </div>
    );
}
