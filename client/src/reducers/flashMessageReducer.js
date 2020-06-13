import {
    ADD_FLASH_MESSAGE,
    REMOVE_FLASH_MESSAGE
  } from "../actions/types";
  
  const initialState = {
    messages: []
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case ADD_FLASH_MESSAGE:
        state.messages.push(action.payload);
        return {
          ...state,
          messages: state.messages
        };
      case REMOVE_FLASH_MESSAGE:
          console.log('reducer remove flash messages');
          let index = action.payload;
          if (index > -1) {
            state.messages.splice(index, 1);
          }
          return {
            ...state,
            messages: state.messages
          };
      default:
        return state;
    }
}