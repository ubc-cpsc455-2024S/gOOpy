import React, { useState } from 'react';
import SceneGrid from '../Scenes/SceneGrid';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import {
    tempChangeUsername,
    tempChangeAboutMe,
    tempChangeProfilePhoto,
} from '../../redux/slices/userSlice.js';
import Button from '../../components/Button.jsx';

export default function UserPage() {
    const dispatch = useDispatch();
    const { id, name, bio, scenes, profilepic } = useSelector(
        (state) => state.user
    );

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
                        src={profilepic}
                        className='rounded-full h-[250px] w-[250px] border-4 mx-auto shadow-xl'
                    />
                </div>
                <h1 className='text-center text-3xl'>
                    <p>Welcome, {name}!</p>
                </h1>
                <div className='flex flex-col items-center pt-5'>
                    {!id ? (
                        <Link className='hover:underline' to='/login'>
                            login to access scenes
                        </Link>
                    ) : (
                        <div className=''>
                            <h2 className='text-center text-1xl pt-5 px-12'>
                                {bio}
                            </h2>
                            <div className='flex justify-center items-center pt-3 '>
                                {!editUser ? (
                                    <Button onClick={() => setEditUser(true)}>
                                        Edit User
                                    </Button>
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
                                            <Button
                                                type='submit'
                                                className='button'
                                            >
                                                Submit
                                            </Button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className='flex justify-center w-full'>
                <SceneGrid sceneList={scenes} />
            </div>
        </main>
    );
}
