import '../../index.css';

function Home() {
    return (
        <main className='p-10 text-center'>
            <span>Welcome to</span>
            <h1 className='text-5xl font-bold'>gOOpy</h1>
            <h2 className='text-1xl'>The 3D scene editor</h2>
            <div className='p-10'>
                <a href='/editor' className='hover:underline'>
                    Click here to see the editor
                </a>
            </div>
        </main>
    );
}

export default Home;
