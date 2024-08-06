import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { updateUser } from '../../apiCalls/userAPI.js';
import { useSelector } from 'react-redux';

const initialState = {
    user: { name: '', description: '', profile_pic: '' },
    isAuthenticated: false,
};

export const changeUsername = createAsyncThunk(
    'member/changeUsername',
    async (name, user, id) => {
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

// TODO: have default values for userImage and login.
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // TODO: delete when API calls are done
        // temporary redux functions because we don't have a backend setup yet
        // takes in a fixed user object - this is temporary until we can actually retrieve a user.
        // NOTE: these reducers lack verification. No check to see if user is first logged in
        tempChangeUsername: (state, action) => {
            state.user.name = action.payload;
        },
        tempChangeProfilePhoto: (state, action) => {
            state.user.profile_pic = action.payload;
        },
        tempChangeAboutMe: (state, action) => {
            state.user.description = action.payload;
        },

        // This one we can keep!
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
            console.log('error changing username');
        });

        builder.addCase(changeProfilePhoto.fulfilled, (state, action) => {
            state.profile_pic = action.payload;
        });
        builder.addCase(changeProfilePhoto.rejected, () => {
            console.log('error changing profile photo');
        });
    },
});

export const {
    tempChangeUsername,
    tempChangeAboutMe,
    tempChangeProfilePhoto,
    userLogout,
    loginUser,
    clearUser,
} = userSlice.actions;

export default userSlice.reducer;
