import ExpandableImage from './ExpandableImage';
import ExpandableVideo from './ExpandableVideo';
import SideNav from './SideNav';

const HEADING_STYLE = 'text-3xl pt-12';
const SUBHEADING_STYLE = 'text-2xl pt-12';
const CONTENT_STYLE = 'pb-8 pt-4';
export function Tutorial() {
    return (
        <div className='flex'>
            <SideNav />
            <div className='px-8 sm:pl-16 sm:pr-20 md:pl-24 md:pr-32 pt-20 pb-20 sm:pb-32 md:pb-48'>
                <h1 className='underline text-5xl'>
                    Welcome to the gOOpy tutorial!
                </h1>
                <p className={CONTENT_STYLE}>
                    This tutorial will help you get familiar with the basics and
                    layout of the gOOpy editor. <br />
                    You can hover over pictures to zoom in, some of them
                    animate!
                </p>
                <h1 id='layout' className={HEADING_STYLE}>
                    Editor Layout
                </h1>
                <p className={CONTENT_STYLE}>
                    This is the default editor layout. On the right side you
                    will find the rendered canvas of your scene while on the
                    left side you'll find the scene management tools.
                    <br />
                    <br />
                    You can add, remove, and edit different shapes to your
                    heart's content! Each shape has their own properties you can
                    play with to create something gOOpy.
                </p>
                <ExpandableImage
                    image={
                        './tutorial/goopy_tutorial_images/default_scene_2.png'
                    }
                />

                <h1 id='shape-management' className={HEADING_STYLE}>
                    Manage Shapes
                </h1>
                <p className={CONTENT_STYLE}>
                    Clicking on "Add Shape" will add a new shape to your list.
                    Deselect a shape by clicking on it again, which will allow
                    you to delete it using the "X" button.
                </p>

                <ExpandableVideo
                    source={'./tutorial/goopy_tutorial_webm/Add_Remove.webm'}
                />

                <p className={CONTENT_STYLE}>
                    Remove all the shapes in a scene by pressing the "Reset
                    Scene" button.
                </p>
                <ExpandableVideo
                    source={'./tutorial/goopy_tutorial_webm/Reset_Scene.webm'}
                />

                <h1 id='shape' className={HEADING_STYLE}>
                    Shape Properties
                </h1>
                <p className={CONTENT_STYLE}>
                    All shapes are able to be moved along the X, Y, Z axis in
                    the editor.
                </p>
                <ExpandableVideo
                    source={'./tutorial/goopy_tutorial_webm/Translation.webm'}
                />

                <h1 id='sphere' className={SUBHEADING_STYLE}>
                    Sphere
                </h1>
                <p className={CONTENT_STYLE}>
                    A sphere is able to be larger or smaller using the radius
                    property. <br />
                    This is the only shape without rotation or dimensions since
                    these properties don't change how a sphere looks!
                </p>
                <ExpandableVideo
                    source={
                        './tutorial/goopy_tutorial_webm/Sphere_Properties.webm'
                    }
                />

                <h1 id='box' className={SUBHEADING_STYLE}>
                    Box
                </h1>
                <p className={CONTENT_STYLE}>
                    Boxes can be expanded, shrunk, and rotated along the 3 axes.
                    <br />
                    For a gOOpier look, round the edges!
                </p>
                <ExpandableVideo
                    source={
                        './tutorial/goopy_tutorial_webm/Box_Properties.webm'
                    }
                />

                <h1 id='cylinder' className={SUBHEADING_STYLE}>
                    Cylinder
                </h1>
                <p className={CONTENT_STYLE}>
                    Cylinders can be lengthened using "h" and widened using "w".
                    <br />
                    Rounding edges is available for a gOOpier look!
                </p>
                <ExpandableVideo
                    source={
                        './tutorial/goopy_tutorial_webm/Cylinder_Properties.webm'
                    }
                />

                <h1 id='torus' className={SUBHEADING_STYLE}>
                    Torus
                </h1>
                <p className={CONTENT_STYLE}>
                    A torus' radius can be expanded with "r" and thickened using
                    "w".
                    <br />
                    The torus is referred to affectionately as a doughnut.
                </p>
                <ExpandableVideo
                    source={
                        './tutorial/goopy_tutorial_webm/Torus_Properties.webm'
                    }
                />

                <h1 id='arc-torus' className={SUBHEADING_STYLE}>
                    Arc Torus
                </h1>
                <p className={CONTENT_STYLE}>
                    Like the torus, and arc torus radius can be expanded with
                    "r" and thickened using "w". The length of the arc is made
                    larger using the "l".
                    <br />
                    An arc torus is a half-eaten doughnut.
                </p>
                <ExpandableVideo
                    source={
                        './tutorial/goopy_tutorial_webm/Arc_Torus_Properties.webm'
                    }
                />

                <h1 id='colour' className={HEADING_STYLE}>
                    Scene Colours
                </h1>
                <p className={CONTENT_STYLE}>
                    A scene's background and shape colours can be changed by
                    pressing the "Scene" tab at the top of the control panel
                    then selecting the "Scene Lighting" option. <br />
                    <br />
                    "Background Colour" will change the colour of the scene's
                    background.
                    <br />
                    "Lighting Colour" will change the colour of all the shapes
                    in the scene.
                    <br /> <br />
                    The colour picker has two sliders, the top slider is to
                    select for brightness and saturation while the bottom slider
                    for selecting the hue.
                    <br />
                    "Lighting Intensity" is to adjust the colour intensity of
                    all shapes in the scene.
                </p>
                <ExpandableVideo
                    source={'./tutorial/goopy_tutorial_webm/Scene_Colour.webm'}
                />

                <h1 id='details' className={HEADING_STYLE}>
                    Scene Details
                </h1>
                <p className={CONTENT_STYLE}>
                    The name and description of a scene can be changed by
                    pressing the "Scene" tab at the top of the control panel
                    then selecting the "Properties" option.
                    <br />
                    Once you input your desired scene name and description don't
                    forget to press save! Each time you press save, the last
                    edit date automatically updates.
                    <br />
                    <br />
                    The copy permissions can be saved, but are currently a work
                    in progress and do not prevent others from copying your
                    work.
                </p>
                <ExpandableVideo
                    source={'./tutorial/goopy_tutorial_webm/Scene_Details.webm'}
                />

                <h1 id='download' className={HEADING_STYLE}>
                    Download
                </h1>
                <p className={CONTENT_STYLE}>
                    You can download an image of your scene by pressing the
                    download button at the bottom of the control panel.
                </p>
                <ExpandableVideo
                    source={
                        './tutorial/goopy_tutorial_webm/Download_Scene.webm'
                    }
                />

                <h1 id='save' className={HEADING_STYLE}>
                    Save Scene
                </h1>
                <p className={CONTENT_STYLE}>
                    To save your scene to your account, press the save button on
                    the bottom of the control panel. <br />
                    If you're not logged in, you will be prompted to login, but
                    don't worry, your beautiful scene is saved until you return!
                    <br />
                    <br />
                    Once you're logged in, the scene is saved to your account
                    and you can access it anytime through your user page.
                </p>
                <ExpandableImage
                    image={'./tutorial/goopy_tutorial_images/goopy_scenes.png'}
                />
            </div>
        </div>
    );
}
