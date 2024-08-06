import React, { useState, useRef, useEffect } from 'react';
import SceneGrid from '../Scenes/SceneGrid';
import { useParams } from 'react-router-dom';
import {
    localChangeUsername,
    localChangeAboutMe,
    localChangeProfilePhoto,
} from '../../redux/slices/userSlice.js';
import Button from '../../components/Button.jsx';
import { getScenesMetadata } from '../../apiCalls/sceneAPI.js';
import { getUserInfo, loginUserGoogle } from '../../apiCalls/userAPI.js';
import { useDispatch, useSelector } from 'react-redux';

export default function UserPage() {
    const { id } = useParams();
    const [user, setUserState] = useState({});
    const { user: localUser } = useSelector((state) => state.user);
    const [scenesInfo, setScenesInfo] = useState([]);
    const [editUser, setEditUser] = useState(false);
    const nameRef = useRef('');
    const aboutRef = useRef('');
    const profilePicRef = useRef('');
    const dispatch = useDispatch();

    useEffect(() => {
        async function setUser() {
            try {
                if (id === 'undefined') return;
                getUserInfo(id).then((userRes) => {
                    setUserState(userRes.data);
                });
            } catch (e) {
                console.error('Error retrieving user info');
            }
        }
        setUser();
    }, []);

    useEffect(() => {
        async function setScene() {
            try {
                if (!user.scenes) return;
                const scenesMetadataRes = await getScenesMetadata(user.scenes);
                setScenesInfo(scenesMetadataRes.data);
            } catch (e) {
                console.error('Error getting scene info');
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
                        src={
                            localUser.profile_pic == ''
                                ? user.profile_pic
                                : localUser.profile_pic
                        }
                        className='rounded-full h-[250px] w-[250px] border-4 mx-auto shadow-xl'
                    />
                </div>
                <h1 className='text-center text-3xl'>
                    {!user._id ? (
                        <p>Guest</p>
                    ) : (
                        <p>
                            Welcome,{' '}
                            {localUser.name == '' ? user.name : localUser.name}!
                        </p>
                    )}
                </h1>
                <div className='flex flex-col items-center pt-5'>
                    {!user._id ? (
                        <button
                            className='hover:underline'
                            onClick={loginUserGoogle}
                        >
                            login to access scenes
                        </button>
                    ) : (
                        <div className=''>
                            <h2 className='text-center text-1xl pt-5 px-12'>
                                {localUser.description == ''
                                    ? user.description
                                    : localUser.description}
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
                                        <h1>Work in progress...</h1>
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
                                                        localChangeUsername(
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
                                                onClick={async () => {
                                                    dispatch(
                                                        localChangeAboutMe(
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
                                                ref={profilePicRef}
                                            />
                                            <Button
                                                onClick={async () => {
                                                    dispatch(
                                                        localChangeProfilePhoto(
                                                            profilePicRef
                                                                .current.value
                                                        )
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
            <div className='flex justify-center w-full pb-10'>
                <SceneGrid sceneList={scenesInfo} />
            </div>
        </main>
    );
}
