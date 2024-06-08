import React from 'react';
import SceneGrid from '../Scenes/SceneGrid';

const testDate = new Date();

const exampleScene = {
    image: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
    name: 'Test Name',
    lastEditDate: testDate.toDateString(),
    link: '',
};
const exampleScene2 = {
    image: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
    name: 'KING GREGOR LORD OF CPSC 110',
    lastEditDate:
        'just a really long string to test what happens when it goes over',
    link: '',
};

const exampleScene3 = {
    image: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
    name: 'A Nice Landscape',
    lastEditDate: testDate.toDateString(),
    link: '',
};

const exampleSceneList = [
    exampleScene,
    exampleScene2,
    exampleScene3,

    exampleScene,
    exampleScene2,
    exampleScene3,

    exampleScene,
    exampleScene2,
    exampleScene3,

    exampleScene,
    exampleScene2,
    exampleScene3,
];

export default function UserPage() {
    return (
        <main className=''>
            <div className='pt-5 pb-5 justify-center'>
                <div className=''>
                    <img
                        src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Gregor_Kiczales_AOSD.jpg/800px-Gregor_Kiczales_AOSD.jpg'
                        className='rounded-full h-[250px] w-[250px] border-4 mx-auto shadow-xl'
                    />
                </div>
                <h1 className='text-center text-3xl'>
                    <a className='underline decoration-hd-brown shadow-xl'>
                        Welcome, Gregor Kizcales!
                    </a>
                </h1>
            </div>
            <div className='flex justify-center w-full'>
                <SceneGrid sceneList={exampleSceneList} />
            </div>
        </main>
    );
}
