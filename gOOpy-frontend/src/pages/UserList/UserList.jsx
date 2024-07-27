import { useEffect, useState } from 'react';
import { getUsers } from '../../apiCalls/userAPI';
import { Link } from 'react-router-dom';

export function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers().then((users) => setUsers(users.data));
    }, []);

    return (
        <div className='p-10 text-center'>
            <h1 className='text-4xl pb-5'>gOOp bOOk</h1>
            {users.map(({ name, _id }) => (
                <div key={_id}>
                    <Link to={`/user/${_id}`} className='hover:underline'>
                        {name}
                    </Link>
                </div>
            ))}
        </div>
    );
}
