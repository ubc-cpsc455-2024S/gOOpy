import GoopyButton from './GoopyButton';
import ToggleView from './ToggleView';

function SceneManager({}) {
    return (
        <div className='bg-panel-primary border h-full pt-3'>
            <ToggleView label={'Lighting'} classes={'border-t'}>
                <div className='border-b'>
                    <span>eeeeeeee</span>
                </div>
            </ToggleView>
            <ToggleView label={'Lighting'} classes={''}>
                <div className='border-b'>
                    <span>eeeeeeee</span>
                </div>
            </ToggleView>
            <ToggleView label={'Lighting'} classes={''}>
                <div className='border-b'>
                    <span>eeeeeeee</span>
                </div>
            </ToggleView>
        </div>
    );
}

export default SceneManager;
