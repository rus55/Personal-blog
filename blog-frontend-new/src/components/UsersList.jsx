import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

export default function UsersList(props) {
    return (
        <div>
            <h3>Список пользователей сайта:</h3>
            {props.isUsersLoading && <span>Загрузка...</span>}
            <ul>
                {console.log('in userlist ',props)}
                {

                    props.user.users.map(user => {
                        return (
                            <li key={user.id}>
                                <Link to={'/users/' + user.id}>{user.name} {user.surname}</Link>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}
