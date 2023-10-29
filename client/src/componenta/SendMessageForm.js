import {useDispatch} from 'react-redux';
import React, {useRef} from 'react';
import {sendMessage} from '../redux/chat';

export function SendMessageForm() {
    const dispatch = useDispatch();
    const messageRef = useRef();

    const handleMessageSend = (event) => {
        event.preventDefault();

        if (event.target.checkValidity()) {
            const fd = new FormData(event.target);
            const data = Object.fromEntries(fd.entries());

            dispatch(sendMessage({ text: data.message, user: data.user }));
            messageRef.current.value = '';
        } else {
            alert('Invalid form');
        }
    };

    return (
        <form onSubmit={handleMessageSend} noValidate>
            <input type="text" name='user' placeholder='Nickname' required/>
            <input type="text" name='message' placeholder='Message' required maxLength='255' ref={messageRef}/>
            <button>Send</button>
        </form>
    );
}
