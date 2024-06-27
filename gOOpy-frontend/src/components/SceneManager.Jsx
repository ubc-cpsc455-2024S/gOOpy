import { ColorPicker, useColor } from 'react-color-palette';
import GoopyButton from './GoopyButton';
import ToggleView from './ToggleView';

function SceneManager({
    skyboxColController,
    skyboxColor,
    skyboxLightController,
    skyboxLightColor,
}) {
    return (
        <div className='bg-panel-primary border h-full pt-1'>
            <ToggleView label={'Properties'} classes={'border-t'}>
                <div className='border-b'></div>
            </ToggleView>
            <ToggleView label={'Environment'} classes={''}>
                <div className='border-b sliders'></div>
            </ToggleView>
            <ToggleView label={'Lighting'} classes={''}>
                <div
                    className='border-b sliders overflow-y-auto'
                    style={{ maxHeight: '65vh' }}
                >
                    <h4 className='text-1xl mr-2'>Skybox Colour</h4>
                    <ColorPicker
                        color={skyboxColor}
                        onChange={(e) => {
                            skyboxColController(e);
                        }}
                        hideAlpha={true}
                        hideInput={true}
                    />
                    <h4 className='text-1xl mr-2 pt-2'>Skybox Light Colour</h4>
                    <ColorPicker
                        color={skyboxLightColor}
                        onChange={(e) => {
                            skyboxLightController(e);
                        }}
                        hideAlpha={true}
                        hideInput={true}
                    />
                    <h4 className='text-1xl mr-2  pt-1'>Ambient Intensity</h4>
                </div>
            </ToggleView>
        </div>
    );
}

export default SceneManager;
