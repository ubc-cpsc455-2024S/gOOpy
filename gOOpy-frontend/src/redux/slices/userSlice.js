import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserInfo, updateUser } from '../../apiCalls/userAPI.js';
import { useSelector } from 'react-redux';
import { exampleUser } from '../../examples/exampleData';

// TODO: standardize the names user properties with serverside storage.

export const userLogin = createAsyncThunk('member/login', async (userID) => {
    const response = await getUserInfo(userID);
    return response.data;
});

export const changeUsername = createAsyncThunk(
    'member/changeUsername',
    async (username) => {
        const user = useSelector((state) => state.user);
        const newUser = {
            userID: user.userID,
            name: username,
            userImage: user.userImage,
            about: user.about,
        };
        await updateUser(newUser);
        return username;
    }
);

export const changeProfilePhoto = createAsyncThunk(
    'member/changeProfilePhoto',
    async (userImage) => {
        const user = useSelector((state) => state.user);
        const newUser = {
            userID: user.userID,
            name: user.username,
            userImage: userImage,
            about: user.about,
        };
        await updateUser(newUser);
        return userImage;
    }
);

const initialUserState = {
    userID: null,
    username: 'Guest',
    userImage:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    userAbout: '',
    userScenes: [],
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
        tempUserLogin: (state, action) => {
            state.userID = exampleUser.userID;
            state.username = exampleUser.username;
            state.userImage = exampleUser.userImage;
            state.userAbout = exampleUser.userAbout;
            state.userScenes = exampleUser.userScenes;
        },
        tempChangeUsername: (state, action) => {
            state.username = action.payload;
        },
        tempChangeProfilePhoto: (state, action) => {
            state.userImage = action.payload;
        },
        tempChangeAboutMe: (state, action) => {
            state.userAbout = action.payload;
        },

        // This one we can keep!
        userLogout: () => {
            state = initialUserState;
        },
    },
    extraReducers: (builder) => {
        // populate with asyncThunk
        builder.addCase(userLogin.fulfilled, (state, action) => {
            // TODO: make the payload variables correspond to the API call variable names
            state.userID = action.payload.userID;
            state.username = action.payload.username;
            state.userImage = action.payload.userImage;
            state.userAbout = action.payload.userAbout;
            state.userScenes = action.payload.userScenes;
        });
        // TODO: optional - Make dropdown notification confirming if change has been made
        // TODO: optional - Dropdown notification alerting user there was an error changing info

        builder.addCase(userLogin.rejected, (state, actions) => {
            console.log('error retrieving user info');
        });

        builder.addCase(changeUsername.fulfilled, (state, action) => {
            state.username = action.payload;
        });
        builder.addCase(changeUsername.rejected, () => {
            console.log('error changing username');
        });

        builder.addCase(changeProfilePhoto.fulfilled, (state, action) => {
            state.userImage = action.payload;
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
