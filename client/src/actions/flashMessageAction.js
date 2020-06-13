import { ADD_FLASH_MESSAGE, REMOVE_FLASH_MESSAGE } from './types';

export const addFlashMessage = (message, color) => {
  return {
    type: ADD_FLASH_MESSAGE,
    payload: { 
        message, 
        color
    }
  };
};

export const removeFlashMessage = (index) => dispatch => {
  console.log('remove flash action', index);
  dispatch({
    type: REMOVE_FLASH_MESSAGE,
    payload: index
  });
};