import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { updateUser } from '../../apiCalls/userAPI.js';
import { useSelector } from 'react-redux';

const initialState = {
    user: { name: '', description: '', profile_pic: '' },
    isAuthenticated: false,
};

export const changeUsername = createAsyncThunk(
    'member/changeUsername',
    async (name, user) => {
        const newUser = { ...user, name: name };
        const username = await updateUser(newUser);
        return username;
    }
);

export const changeProfilePhoto = createAsyncThunk(
    'member/changeProfilePhoto',
    async (profilepic) => {
        const user = useSelector((state) => state.user);
        const newUser = { ...user, profile_pic: profilepic };
        await updateUser(newUser);
        return userImage;
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // NOTE: these reducers lack verification. No check to see if user is first logged in
        localChangeUsername: (state, action) => {
            state.user.name = action.payload;
        },
        localChangeProfilePhoto: (state, action) => {
            state.user.profile_pic = action.payload;
        },
        localChangeAboutMe: (state, action) => {
            state.user.description = action.payload;
        },

        userLogout: () => {
            return initialState;
        },

        loginUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },

        clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        // TODO: optional - Make dropdown notification confirming if change has been made
        // TODO: optional - Dropdown notification alerting user there was an error changing info

        builder.addCase(changeUsername.fulfilled, (state, action) => {
            state.name = action.payload;
        });

        builder.addCase(changeUsername.rejected, () => {
            console.error('error changing username');
        });

        builder.addCase(changeProfilePhoto.fulfilled, (state, action) => {
            state.profile_pic = action.payload;
        });
        builder.addCase(changeProfilePhoto.rejected, () => {
            console.error('error changing profile photo');
        });
    },
});

export const {
    localChangeUsername,
    localChangeAboutMe,
    localChangeProfilePhoto,
    userLogout,
    loginUser,
    clearUser,
} = userSlice.actions;

export default userSlice.reducer;
