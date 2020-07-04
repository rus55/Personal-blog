import React from 'react';
import { Link } from 'react-router-dom';

export default function User(props) {
    return (
        <div className={'content'}>
            <h3>Информация о пользователе {props.name} {props.surname}</h3>
                <p>Контакты: {props.email}</p>
                <p>О пользователе: {props.aboutMyself}</p>
            <Link to={'/'}>На главную</Link>
        </div>
    )
}
