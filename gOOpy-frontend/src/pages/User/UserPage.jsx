import React from 'react';
import SceneGrid from '../Scenes/SceneGrid';
import { useSelector } from 'react-redux';


export default function UserPage() {
    const userName = useSelector((state) => state.user.username);
    const userImage = useSelector((state) => state.user.userImage);
    const userAbout = useSelector((state) => state.user.userAbout);
    const userScenes = useSelector((state) => state.user.userScenes);

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
                <h2 className='text-center text-1xl pt-5'>
                    {userAbout}
                </h2>
            </div>
            <div className='flex justify-center w-full'>
                <SceneGrid sceneList={userScenes} />
            </div>
        </main>
    );
}
