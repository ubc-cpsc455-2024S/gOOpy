import SceneGrid from './SceneGrid';
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
    lastEditDate: "just a really long string to test what happens when it goes over",
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

function ScenePage() {
    return (
        <>
            <h1>Scenes!</h1>
            <div className='flex justify-center w-full'>
                <SceneGrid sceneList={exampleSceneList} />
            </div>
        </>
    );
}

export default ScenePage;
