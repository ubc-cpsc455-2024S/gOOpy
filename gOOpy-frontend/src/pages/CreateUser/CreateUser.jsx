import React, { useRef } from 'react';
import Button from '../../components/Button.jsx';

export default function CreateUser() {
    const nameRef = useRef('');
    const aboutRef = useRef('');
    const profilepicRef = useRef('');

    function createNewUser() {
        // empty scenes
        // oauth_id can be random for now
        // reset fields on click
        // make post API call to db
    }

    return (
        <main className=''>
            <div className='flex justify-center items-center pt-10 '>
                <form className='sliders rounded-lg' onSubmit={createNewUser}>
                    <div>
                        <label>Username: </label>
                        <input name='username' ref={nameRef} />
                    </div>
                    <div>
                        <label>About: </label>
                        <input name='text' ref={aboutRef} />
                    </div>
                    <div>
                        <label>Image: </label>
                        <input name='url' ref={profilepicRef} />
                    </div>
                    <div>
                        <Button type='submit' className='button'>
                            Create
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
}
