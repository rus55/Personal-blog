import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import commentActionsCreators from '../actions/comment';

class CreateComment extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={'content'}>
                <h3>Добавление комментария</h3>
                {

                        this.props.comment.isCommentCreating ?
                            <p>Комментарий добавляется.....</p>
                            :
                            this.props.comment.commentCreateSuccess ?
                                <p>Комментарий успешно добавлен</p>
                                :
                                this.props.comment.errMsg ?
                                    <p>Произошла ошибка при добавлении комментарий {this.props.comment.errMsg}</p>
                                    :

                    <div className={'form'}>
                        <Form>

                            <Form.Group controlId="formBasicComment">
                                <Form.Label>Ваш комментарий</Form.Label>
                                <Form.Control as={"textarea"} row={3} onChange={event => {
                                    this.props.actions.saveCommentTextValue(event.target.value);
                                }} type="text" placeholder="Ваш комментарий" />
                            </Form.Group>


                            <Button variant="primary" onClick={event =>
                            {this.props.actions.createComment(this.props.postId);}} >
                                Добавить
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
        actions: bindActionCreators(commentActionsCreators, dispatch),
    }
};

const Wrapped = connect(mapStateToProps, mapDispatchToProps)(CreateComment);

export default Wrapped;
