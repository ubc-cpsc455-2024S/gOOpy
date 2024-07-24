import Scene from './Scene';

export default function SceneGrid({ sceneList }) {
    const scenes = sceneList.map((s) => (
        <Scene
            key={s._id}
            image={s.metadata.thumbnail}
            name={s.metadata.title}
            lastEditDate={s.metadata.last_edited}
            sceneId={s._id}
        />
    ));

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-items-center justify-center w-full'>
            {scenes}
        </div>
    );
}
