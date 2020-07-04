import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import userActionsCreators from '../actions/user';
import {Link} from "react-router-dom";

class EditUser extends React.Component {
    constructor(props) {
        super(props);
    }


    componentWillMount() {
        this.props.actions.saveUserNameValue(this.props.name);
        this.props.actions.saveUserSurnameValue(this.props.surname);
        this.props.actions.saveUserAboutValue(this.props.aboutMyself);
    }

    render() {

        return (
            <div className={'content'}>
                <h1>Редактирование пользователя</h1>
                {
                    <>
                        {
                            this.props.user.isUserEditing ?
                                <p>Пользователь редактируется.....</p>
                                :
                                this.props.user.userEditSuccess ?
                                    <p>Пользователь успешно отредактирована</p>
                                    :
                                    this.props.user.errMsg ?
                                        <p>Произошла ошибка при редактировании пользователя {this.props.user.errMsg}</p>
                                        :
                                        <div className={'form'}>
                                            <Form>
                                                <Form.Group controlId="formBasicName">
                                                    <Form.Label>Ваше имя </Form.Label>
                                                    <Form.Control onChange={event => {
                                                        this.props.actions.saveUserNameValue(event.target.value);
                                                    }} type="text" placeholder="Ваше имя" defaultValue={this.props.name}/>
                                                </Form.Group>
                                                <Form.Group controlId="formBasicSurname">
                                                    <Form.Label>Ваша фамилия</Form.Label>
                                                    <Form.Control onChange={event => {
                                                        this.props.actions.saveUserSurnameValue(event.target.value);
                                                    }} type="text" placeholder="Ваша фамилия" defaultValue={this.props.surname}/>
                                                </Form.Group>
                                                <Form.Group controlId="formBasicSurname">
                                                    <Form.Label>Несколько слов о себе</Form.Label>
                                                    <Form.Control as={"textarea"} row={3} onChange={event => {
                                                        this.props.actions.saveUserAboutValue(event.target.value);
                                                    }} type="text" placeholder="Расскажите о себе" defaultValue={this.props.aboutMyself}/>
                                                </Form.Group>
                                                <Form.Group controlId="formBasicPassword">
                                                    <Form.Label>Новый пароль </Form.Label>
                                                    <Form.Control onChange={event => {
                                                        this.props.actions.saveUserPasswordValue(event.target.value);
                                                    }} type="text" placeholder="Ваш пароль (не менее 6 символов)" />
                                                </Form.Group>
                                                <Button variant="primary" onClick={event => {this.props.actions.editUser();}} >
                                                    Сохранить изменения
                                                </Button>
                                            </Form>
                                        </div>
                        }

                        <Link to={'/'}>На главную</Link>
                    </>
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
        actions: bindActionCreators(userActionsCreators, dispatch),
    }
};

const Wrapped = connect(mapStateToProps, mapDispatchToProps)(EditUser);

export default Wrapped;
