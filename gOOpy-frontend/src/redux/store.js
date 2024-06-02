import { configureStore } from '@reduxjs/toolkit';
import shapesReducer from './objectsSlice';

export default configureStore({
    reducer: {
        shapes: shapesReducer,
    },
});
