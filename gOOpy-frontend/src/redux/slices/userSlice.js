import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { updateUser, getUserInfoByUsername } from '../../apiCalls/userAPI.js';
import { useSelector } from 'react-redux';

export const userLogin = createAsyncThunk('member/login', async (username) => {
    const response = await getUserInfoByUsername(username);
    return response.data;
});

export const changeUsername = createAsyncThunk(
    'member/changeUsername',
    async (name) => {
        const user = useSelector((state) => state.user);
        const newUser = { ...user, name: name };
        await updateUser(newUser);
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

const initialUserState = {
    oauth_id: null,
    name: 'Guest',
    profile_pic:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    description: '',
    scenes: [],
};

// TODO: have default values for userImage and login.
export const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        // TODO: delete when API calls are done
        // temporary redux functions because we don't have a backend setup yet
        // takes in a fixed user object - this is temporary until we can actually retrieve a user.
        // NOTE: these reducers lack verification. No check to see if user is first logged in
        tempChangeUsername: (state, action) => {
            state.name = action.payload;
        },
        tempChangeProfilePhoto: (state, action) => {
            state.profile_pic = action.payload;
        },
        tempChangeAboutMe: (state, action) => {
            state.bio = action.payload;
        },

        // This one we can keep!
        userLogout: () => {
            return initialUserState;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(userLogin.fulfilled, (state, action) => {
            return action.payload;
        });
        // TODO: optional - Make dropdown notification confirming if change has been made
        // TODO: optional - Dropdown notification alerting user there was an error changing info

        builder.addCase(userLogin.rejected, (state, actions) => {
            console.log('error retrieving user info');
        });

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
    tempUserLogin,
    tempChangeUsername,
    tempChangeAboutMe,
    tempChangeProfilePhoto,
    userLogout,
} = userSlice.actions;

export default userSlice.reducer;
