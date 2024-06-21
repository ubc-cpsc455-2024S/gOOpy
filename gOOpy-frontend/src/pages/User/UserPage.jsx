import React, { useState } from 'react';
import SceneGrid from '../Scenes/SceneGrid';
import { useSelector, useDispatch } from 'react-redux';

import {
    tempChangeUsername,
    tempChangeAboutMe,
    tempChangeProfilePhoto,
} from '../../redux/slices/userSlice.js';

export default function UserPage() {
    const dispatch = useDispatch();
    const userID = useSelector((state) => state.user.userID);
    const userName = useSelector((state) => state.user.username);
    const userImage = useSelector((state) => state.user.userImage);
    const userAbout = useSelector((state) => state.user.userAbout);
    const userScenes = useSelector((state) => state.user.userScenes);

    const [editUser, setEditUser] = useState(false);

    function makeEdit(event) {
        event.preventDefault();
        dispatch(tempChangeUsername(event.target.elements.username.value));
        dispatch(tempChangeAboutMe(event.target.elements.text.value));
        dispatch(tempChangeProfilePhoto(event.target.elements.url.value));
        setEditUser(false);
    }

    return (
        <main className=''>
            <div className='pt-5 pb-5 justify-center'>
                <div className=''>
                    <img
                        src={userImage}
                        className='rounded-full h-[250px] w-[250px] border-4 mx-auto shadow-xl'
                    />
                </div>
                <h1 className='text-center text-3xl'>
                    <a className='underline decoration-hd-brown shadow-xl'>
                        Welcome, {userName}!
                    </a>
                </h1>
                <div className='flex flex-col items-center pt-5'>
                    {userID === null ? (
                        <a className=' text-1xl' href='/login'>
                            login to access scenes
                        </a>
                    ) : (
                        <div className=''>
                            <h2 className='text-center text-1xl pt-5 px-12'>
                                {userAbout}
                            </h2>
                            <div className='flex justify-center items-center pt-3 '>
                                {editUser === false ? (
                                    <button
                                        className='m-5 py-2 px-5 shadow-[0_0_0_4px_rgba(0,0,0,1)] rounded-full'
                                        onClick={() => setEditUser(true)}
                                    >
                                        Edit Profile
                                    </button>
                                ) : (
                                    <form
                                        className='sliders rounded-lg'
                                        onSubmit={makeEdit}
                                    >
                                        <div>
                                            <label>New Username: </label>
                                        </div>
                                        <div>
                                            <input name='username' />
                                        </div>
                                        <div>
                                            <label>New About: </label>
                                        </div>
                                        <div>
                                            <input name='text' />
                                        </div>
                                        <div>
                                            <label>New Image: </label>
                                        </div>
                                        <div>
                                            <input name='url' />
                                        </div>
                                        <div>
                                            <input type='submit' />
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className='flex justify-center w-full'>
                <SceneGrid sceneList={userScenes} />
            </div>
        </main>
    );
}
