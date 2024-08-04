const SECTION_LINK_STYLE = 'hover:text-editor-hover text-xl pt-6 pl-0 lg:pl-2';
const SUBSECTION_LINK_STYLE = 'hover:text-editor-hover pt-0 pl-3 lg:pl-5';

export default function SideNav() {
    return (
        <div className='h-screen w-1/5 shadow-lg sticky z-30 top-0 left-0 bg-editor-box p-5 -mt-20 pt-20 hidden md:flex flex-col align-left'>
            <h1 className='text-2xl underline'>Table of Contents:</h1>
            <a className={SECTION_LINK_STYLE} href='#layout'>
                Editor Layout
            </a>
            <a className={SECTION_LINK_STYLE} href='#shape-management'>
                Manage Shapes
            </a>
            <a className={SECTION_LINK_STYLE} href='#shape'>
                Shape Properties
            </a>
            <a className={SUBSECTION_LINK_STYLE} href='#sphere'>
                Sphere
            </a>
            <a className={SUBSECTION_LINK_STYLE} href='#box'>
                Box
            </a>
            <a className={SUBSECTION_LINK_STYLE} href='#cylinder'>
                Cylinder
            </a>
            <a className={SUBSECTION_LINK_STYLE} href='#torus'>
                Torus
            </a>
            <a className={SUBSECTION_LINK_STYLE} href='#arc-torus'>
                Arc Torus
            </a>
            <a className={SECTION_LINK_STYLE} href='#colour'>
                Scene Colours
            </a>
            <a className={SECTION_LINK_STYLE} href='#details'>
                Scene Details
            </a>
            <a className={SECTION_LINK_STYLE} href='#download'>
                Download
            </a>
            <a className={SECTION_LINK_STYLE} href='#save'>
                Save
            </a>
        </div>
    );
}
