import { createSlice } from '@reduxjs/toolkit';
import conversationData from '../../../assets/data/conversations.json';

const initialState = {
    conversations: conversationData.conversations
}

const conversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    updateConversation: (state, action) => {
      state.conversations = action.payload;
    }, 
    updateOneConversation: (state, action) => {
      const updatedConversation = action.payload;
      state.conversations = state.conversations.map(conversation =>
        conversation.conversation_id === updatedConversation.conversation_id
          ? { ...conversation, ...updatedConversation } // ← merge de datos nuevos
          : conversation
      );
    }, 
    updateBotInAllConversations: (state, action) => {
      const newBot = action.payload;
    
      state.conversations = state.conversations.map(conversation => ({
        ...conversation,
        messages: conversation.messages.map(msg => 
          msg.bot ? { ...msg, bot: newBot } : msg
        )
      }));
    },
    updateUserInAllConversations: (state, action) => {
      const newUser = action.payload;
    
      state.conversations = state.conversations.map(conversation => ({
        ...conversation,
        messages: conversation.messages.map(msg => 
          msg.user ? { ...msg, user: newUser } : msg
        )
      }));
    }        
  },
})
export const { updateConversation, updateBotInAllConversations, updateUserInAllConversations } = conversationsSlice.actions;

export default conversationsSlice.reducer;
