import React, { useRef } from 'react';
import Button from '../../components/Button.jsx';
import { createUser } from '../../apiCalls/userAPI.js';

export default function CreateUser() {
    const nameRef = useRef('');
    const descriptionRef = useRef('');
    const profilePicRef = useRef('');

    function createNewUser(e) {
        e.preventDefault();

        const user = {
            // TODO: replace with oauth_id - current way to get unique oauth_id values.
            oauth_id: new Date(),
            name: nameRef.current.value,
            description: descriptionRef.current.value,
            profile_pic: profilePicRef.current.value,
            scenes: [],
        };

        createUser(user)
            .then(() => {
                alert('user has been created successfully');
            })
            .catch((e) => {
                alert('error creating user');
            });

        nameRef.current.value = '';
        descriptionRef.current.value = '';
        profilePicRef.current.value = '';
    }

    return (
        <main className=''>
            <div className='flex justify-center items-center pt-10 '>
                <form className='sliders rounded-lg' onSubmit={createNewUser}>
                    <div>
                        <label>Username: </label>
                        <input required name='username' ref={nameRef} />
                    </div>
                    <div className='pt-2'>
                        <label>About: </label>
                        <input required name='text' ref={descriptionRef} />
                    </div>
                    <div className='pt-2'>
                        <label>Image: </label>
                        <input required name='url' ref={profilePicRef} />
                    </div>
                    <div className='flex justify-center pt-2'>
                        <Button type='submit' className='button'>
                            Create
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
}
