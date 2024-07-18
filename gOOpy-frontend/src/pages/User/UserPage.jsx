import React, { useState, useRef, useEffect } from 'react';
import SceneGrid from '../Scenes/SceneGrid';
import { Link, useParams } from 'react-router-dom';

import {
    tempChangeUsername,
    tempChangeAboutMe,
    tempChangeProfilePhoto,
} from '../../redux/slices/userSlice.js';
import Button from '../../components/Button.jsx';
import { getSceneInfo } from '../../apiCalls/sceneAPI.js';
import { getUserInfo } from '../../apiCalls/userAPI.js';

export default function UserPage() {
    const { id } = useParams();
    const [user, setUserState] = useState({});
    const [scenesInfo, setScenesInfo] = useState([]);
    const [editUser, setEditUser] = useState(false);
    const nameRef = useRef('');
    const aboutRef = useRef('');
    const profilePicRef = useRef('');

    useEffect(() => {
        async function setUser() {
            try {
                if (id == 'undefined') return;
                getUserInfo(id).then((userRes) => {
                    setUserState(userRes.data);
                });
            } catch (e) {
                console.log('Error retrieving user info');
            }
        }
        setUser();
    }, []);

    useEffect(() => {
        async function setScene() {
            try {
                if (!user.scenes) return;
                for (const scene of user.scenes) {
                    getSceneInfo(scene).then((sceneRes) => {
                        setScenesInfo([...scenesInfo, sceneRes.data]);
                    });
                }
            } catch (e) {
                console.log('Error getting scene info');
            }
        }
        setScene();
    }, [user]);

    function closeEdit(event) {
        event.preventDefault();
        setEditUser(false);
    }

    return (
        <main className=''>
            <div className='pt-5 pb-5 justify-center'>
                <div className=''>
                    <img
                        src={user.profile_pic}
                        className='rounded-full h-[250px] w-[250px] border-4 mx-auto shadow-xl'
                    />
                </div>
                <h1 className='text-center text-3xl'>
                    {!user._id ? <p>Guest</p> : <p>Welcome, {user.name}!</p>}
                </h1>
                <div className='flex flex-col items-center pt-5'>
                    {!user._id ? (
                        <Link className='hover:underline' to='/login'>
                            login to access scenes
                        </Link>
                    ) : (
                        <div className=''>
                            <h2 className='text-center text-1xl pt-5 px-12'>
                                {user.description}
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
                                                onClick={async () => {
                                                    dispatch(
                                                        tempChangeUsername(
                                                            nameRef.current
                                                                .value
                                                        )
                                                    );
                                                    await axios.patch(
                                                        `http://127.0.0.1:3000/users/${id}`,
                                                        {
                                                            name: nameRef
                                                                .current.value,
                                                        }
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
                                                onClick={async () => {
                                                    dispatch(
                                                        tempChangeAboutMe(
                                                            aboutRef.current
                                                                .value
                                                        )
                                                    );
                                                    await axios.patch(
                                                        `http://127.0.0.1:3000/users/${id}`,
                                                        {
                                                            description:
                                                                aboutRef.current
                                                                    .value,
                                                        }
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
                                                ref={profilePicRef}
                                            />
                                            <Button
                                                onClick={async () => {
                                                    dispatch(
                                                        tempChangeProfilePhoto(
                                                            profilePicRef
                                                                .current.value
                                                        )
                                                    );
                                                    await axios.patch(
                                                        `http://127.0.0.1:3000/users/${id}`,
                                                        {
                                                            profile_pic:
                                                                profilepicRef
                                                                    .current
                                                                    .value,
                                                        }
                                                    );
                                                    profilePicRef.current.value =
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
