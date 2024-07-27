export function Tutorial() {
    return (
        <div className='p-10'>
            <h1 className='text-4xl'>Welcome to gOOpy !</h1>
            <p>
                This ain't your grandma's 3D modeling software! With gOOpy you
                can create wild shapes and watch in fascination and intrigue as
                they gOOp together! Join our vibrant community of gOOpers, view
                their artworks, and get gOOpy today!
            </p>
            <h2 className='text-2xl'>How to use</h2>
            <p>To use gOOpy, click on the add shape button</p>
            <img src='./tutorial/add_shape.png' className='h-40'></img>
            <p>You can click on a shape to edit.</p>
            <img src='./tutorial/shape_click.png' className='h-40'></img>
            <p>Click on the scene tab to edit your scene settings.</p>
            <img src='./tutorial/scene_tab.png' className='h-40'></img>
            <p>
                Don't forget to save! Don't forget the URL - this is your unique
                scene ID!
            </p>
            <img src='./tutorial/save.png' className='h-40'></img>
            <p>
                And when you're done, you can download an image to keep! Hang it
                on your wall.
            </p>
            <img src='./tutorial/download.png' className='h-40'></img>
        </div>
    );
}
