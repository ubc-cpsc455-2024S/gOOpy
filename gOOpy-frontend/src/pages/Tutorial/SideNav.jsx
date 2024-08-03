const LINK_STYLE = 'hover:text-editor-hover pt-3 pb-3 pl-2';

export default function SideNav() {
    return (
        <div className='h-screen w-1/5 sticky z-30 top-0 left-0 bg-editor-box p-5 -mt-20 pt-20 hidden md:flex flex-col align-left'>
            <h1 className='text-2xl pb-3 underline'>Topics:</h1>
            <a className={LINK_STYLE} href='#section'>
                Editor Layout
            </a>
            <a className={LINK_STYLE} href='#section'>
                Shape Management
            </a>
            <a className={LINK_STYLE} href='#section'>
                Object Properties
            </a>
            <a className={LINK_STYLE} href='#section'>
                Change Scene Colours
            </a>
            <a className={LINK_STYLE} href='#section'>
                Change Title
            </a>
            <a className={LINK_STYLE} href='#section'>
                Download Scene
            </a>
            <a className={LINK_STYLE} href='#section'>
                Save Scene
            </a>
        </div>
    );
}
