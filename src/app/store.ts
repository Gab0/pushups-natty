import { configureStore } from '@reduxjs/toolkit';

import currentActionReducer from './currentAction';

export default configureStore({
  reducer: {
    currentAction: currentActionReducer
  },
}) 
