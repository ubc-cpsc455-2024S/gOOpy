import React, { useState, useRef, useEffect } from 'react';
import SceneGrid from '../Scenes/SceneGrid';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import {
    tempChangeUsername,
    tempChangeAboutMe,
    tempChangeProfilePhoto,
} from '../../redux/slices/userSlice.js';
import Button from '../../components/Button.jsx';
import { getSceneInfo } from '../../apiCalls/sceneAPI.js';

export default function UserPage() {
    const dispatch = useDispatch();
    const { _id, name, description, scenes, profile_pic } = useSelector(
        (state) => state.user
    );
    // TODO: figure out how to get all the necessary scene info for the scene grid component.
    const [scenesInfo, setScenesInfo] = useState([]);
    useEffect(() => {
        async function gsi() {
            for (const scene of scenes) {
                try {
                    // TODO: replace with method that only gets the metadata.
                    const res = await getSceneInfo(scene);
                    setScenesInfo([...scenesInfo, res.data]);
                } catch (e) {
                    console.log('Error retrieving scene info');
                }
            }
        }
        gsi();
    }, []);

    const [editUser, setEditUser] = useState(false);
    const nameRef = useRef('');
    const aboutRef = useRef('');
    const profilepicRef = useRef('');

    function closeEdit(event) {
        event.preventDefault();
        setEditUser(false);
    }

    return (
        <main className=''>
            <div className='pt-5 pb-5 justify-center'>
                <div className=''>
                    <img
                        src={profile_pic}
                        className='rounded-full h-[250px] w-[250px] border-4 mx-auto shadow-xl'
                    />
                </div>
                <h1 className='text-center text-3xl'>
                    {!_id ? <p>Guest</p> : <p>Welcome, {name}!</p>}
                </h1>
                <div className='flex flex-col items-center pt-5'>
                    {!_id ? (
                        <Link className='hover:underline' to='/login'>
                            login to access scenes
                        </Link>
                    ) : (
                        <div className=''>
                            <h2 className='text-center text-1xl pt-5 px-12'>
                                {description}
                            </h2>
                            <div className='flex justify-center items-center pt-3 '>
                                {!editUser ? (
                                    <Button onClick={() => setEditUser(true)}>
                                        Edit User
                                    </Button>
                                ) : (
                                    <form
                                        className='sliders rounded-lg'
                                        onSubmit={closeEdit}
                                    >
                                        <div>
                                            <label>New Username: </label>
                                        </div>
                                        <div>
                                            <input
                                                name='username'
                                                ref={nameRef}
                                            />
                                            <Button
                                                onClick={() => {
                                                    dispatch(
                                                        tempChangeUsername(
                                                            nameRef.current
                                                                .value
                                                        )
                                                    );
                                                    nameRef.current.value = '';
                                                }}
                                            >
                                                Change Username
                                            </Button>
                                        </div>
                                        <div>
                                            <label>New About: </label>
                                        </div>
                                        <div>
                                            <input name='text' ref={aboutRef} />
                                            <Button
                                                onClick={() => {
                                                    dispatch(
                                                        tempChangeAboutMe(
                                                            aboutRef.current
                                                                .value
                                                        )
                                                    );

                                                    aboutRef.current.value = '';
                                                }}
                                            >
                                                Change About
                                            </Button>
                                        </div>
                                        <div>
                                            <label>New Image: </label>
                                        </div>
                                        <div>
                                            <input
                                                name='url'
                                                ref={profilepicRef}
                                            />
                                            <Button
                                                onClick={() => {
                                                    dispatch(
                                                        tempChangeProfilePhoto(
                                                            profilepicRef
                                                                .current.value
                                                        )
                                                    );
                                                    profilepicRef.current.value =
                                                        '';
                                                }}
                                            >
                                                Change Image
                                            </Button>
                                        </div>
                                        <div>
                                            <Button
                                                type='submit'
                                                className='button'
                                            >
                                                Close
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
                <SceneGrid sceneList={scenesInfo} />
            </div>
        </main>
    );
}
