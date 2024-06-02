import { createSlice } from '@reduxjs/toolkit';
import { Vector3 } from 'three';

// hard coded defaults for now
const obj1 = {
    center: new Vector3(0.0, 0.0, 0.0),
    radius: 1.0,
};
const obj2 = {
    center: new Vector3(1.0, 1.0, 1.0),
    radius: 1.3,
};
const obj3 = {
    center: new Vector3(-1.0, -1.0, 1.0),
    radius: 0.8,
};

const shapesSlice = createSlice({
    name: 'shapes',
    initialState: [obj1, obj2, obj3],
    reducers: {
        // addShape: (state, action) => {
        //     state.list.push(action.payload);
        // },
        // removeShape: (state, action) => {
        //     state.list
        // },
        editShape: (state, action) => {
            const { index, valueName, newValue } = action.payload;
            state[index].center[valueName] = newValue;
        },
    },
});

export const { editShape } = shapesSlice.actions;
export default shapesSlice.reducer;
