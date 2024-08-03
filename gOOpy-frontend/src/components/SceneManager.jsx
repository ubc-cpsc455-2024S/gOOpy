import { ColorPicker, useColor } from 'react-color-palette';
import ToggleView from './ToggleView';
import Slider from './Slider';
import EditorTabCarousel from './EditorTabCarousel';

function SceneManager({
    skyboxColController,
    skyboxColor,
    skyboxLightController,
    skyboxLightColor,
    setAmbientIntensity,
    skyboxAmbient,
    setEditorView,
    metadata,
    setMetadata,
}) {
    return (
        <div className='bg-panel-primary border h-full pt-1 sliders flex flex-col min-w-64'>
            <div className=''>
                <EditorTabCarousel
                    selected={'scene'}
                    setEditorView={setEditorView}
                ></EditorTabCarousel>
            </div>
            <div className='overflow-scroll border-r border-l grow border-b scroll-container no-scrollbar'>
                <ToggleView label={'Properties'} classes={'border-t mt-1'}>
                    <div className='border-b sliders p-2'>
                        <h4 className='text-sm mr-2'>Information</h4>
                        <div className=' justify-between'>
                            <h4 className='text-xs mr-2'>Scene Name:</h4>
                            <input
                                type='text'
                                className='w-full'
                                value={metadata.title}
                                onChange={(e) => {
                                    setMetadata({
                                        ...metadata,
                                        title: e.target.value,
                                    });
                                }}
                            />
                        </div>
                        <div className=' justify-between'>
                            <h4 className='text-xs mr-2'>Scene Description:</h4>
                            <textarea
                                type='textarea'
                                className='w-full'
                                style={{ maxWidth: '100%' }}
                                value={metadata.description}
                                onChange={(e) => {
                                    setMetadata({
                                        ...metadata,
                                        description: e.target.value,
                                    });
                                }}
                            />
                        </div>
                        <h4 className='text-sm mr-2'>Access Control</h4>
                        <div className='flex justify-between'>
                            <h4 className='text-xs mr-2'>Allow Copying</h4>
                            <input
                                type='checkbox'
                                defaultChecked={metadata.copyPermission}
                                onChange={(e) => {
                                    setMetadata({
                                        ...metadata,
                                        copyPermission: e.target.checked,
                                    });
                                }}
                            />
                        </div>
                        <div className=' justify-between'>
                            <h4 className='text-xs mr-2 mt-2'>Last Edited:</h4>
                            <input
                                type='text'
                                style={{ maxWidth: '100%' }}
                                value={metadata.lastEdited}
                                disabled={true}
                            />
                        </div>
                    </div>
                </ToggleView>
                <ToggleView label={'Scene Lighting'} classes={''}>
                    <div className='p-2 scroll-viewport'>
                        <h4 className='text-sm mr-2'>Background Colour</h4>
                        <ColorPicker
                            color={skyboxColor}
                            onChange={(e) => {
                                skyboxColController(e);
                            }}
                            hideAlpha={true}
                            hideInput={true}
                        />
                        <h4 className='text-sm mr-2 pt-2'>Lighting Colour</h4>
                        <ColorPicker
                            color={skyboxLightColor}
                            onChange={(e) => {
                                skyboxLightController(e);
                            }}
                            hideAlpha={true}
                            hideInput={true}
                        />
                        <h4 className='text-sm mr-2  pt-1'>
                            Lighting Intensity
                        </h4>
                        <div className=' pr-1'>
                            <Slider
                                min={0.0}
                                max={1.0}
                                defaultValue={skyboxAmbient}
                                callback={setAmbientIntensity}
                            ></Slider>
                        </div>
                    </div>
                </ToggleView>
            </div>
        </div>
    );
}

export default SceneManager;
