import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import postActionsCreators from '../actions/user';
import {Link} from "react-router-dom";

class CreateUser extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={'content'}>
                <h3>Регистрация пользователя</h3>
                    {
                        this.props.user.isUserCreating ?
                            <p>Регистрация.....</p>
                            :
                            this.props.user.userCreateSuccess ?
                                <p>Пользователь успешно зарегистрирован</p>
                                :
                                this.props.user.errMsg ?
                                    <p>Произошла ошибка при регистрации. Проверьте, правильность ввода данных</p>
                                    :

                    <div className={'form'}>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Ваш email *</Form.Label>
                            <Form.Control onChange={event => {
                                this.props.actions.saveUserLoginValue(event.target.value);
                            }} type="text" placeholder="Ваш email" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Ваш пароль *</Form.Label>
                            <Form.Control onChange={event => {
                                this.props.actions.saveUserPasswordValue(event.target.value);
                            }} type="text" placeholder="Ваш пароль (не менее 6 символов)" />
                        </Form.Group>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Ваше имя *</Form.Label>
                            <Form.Control onChange={event => {
                                this.props.actions.saveUserNameValue(event.target.value);
                            }} type="text" placeholder="Ваше имя" />
                        </Form.Group>
                        <Form.Group controlId="formBasicSurname">
                            <Form.Label>Ваша фамилия</Form.Label>
                            <Form.Control onChange={event => {
                                this.props.actions.saveUserSurnameValue(event.target.value);
                            }} type="text" placeholder="Ваша фамилия" />
                        </Form.Group>
                        <Form.Group controlId="formBasicSurname">
                            <Form.Label>Несколько слов о себе</Form.Label>
                            <Form.Control as={"textarea"} row={3} onChange={event => {
                                this.props.actions.saveUserAboutValue(event.target.value);
                            }} type="text" placeholder="Расскажите о себе" />
                        </Form.Group>


                        <Button variant="primary" onClick={event => {this.props.actions.createUser();}} >
                            Зарегистрироваться
                        </Button>
                    </Form>
                    </div>
                }
            </div>

        );


    }
}
const mapStateToProps = state => {
    return {
        ...state,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(postActionsCreators, dispatch),
    }
};

const Wrapped = connect(mapStateToProps, mapDispatchToProps)(CreateUser);

export default Wrapped;
