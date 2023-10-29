import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
    name: 'chat',
    initialState: { messages: [] },
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        sendMessage: (state, action) => { },
    },
});

export const { addMessage, sendMessage } = chatSlice.actions;
export default chatSlice.reducer;
