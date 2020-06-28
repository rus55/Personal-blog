import React from 'react';
import Button from 'react-bootstrap/Button'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import userActionsCreators from '../actions/user';

class DeleteUser extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <>
                <h3>Удаление пользователя</h3>
                {
                    this.props.user.isUserDeleting ?
                        <p>Пользователь удаляется.....</p>
                        :
                        this.props.user.userDeleteSuccess ?
                            <p>Пользователь успешно удален</p>
                            :
                            this.props.errMsg ?
                                <p>Произошла ошибка при удалении пользователя {this.props.errMsg}</p>
                                :
                                <>
                                    <p>Вы уверены, что хотите удалить свой аккаунт?</p>
                                    <Button variant="primary" onClick={event => {this.props.actions.deleteUser();}} >
                                    Удалить
                                    </Button>
                                </>
                }

            </>

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

const Wrapped = connect(mapStateToProps, mapDispatchToProps)(DeleteUser);

export default Wrapped;
