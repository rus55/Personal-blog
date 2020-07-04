import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import commentActionsCreators from '../actions/comment';

class EditComment extends React.Component {
    constructor(props) {
        super(props);
    }


    componentWillMount() {
        this.props.actions.saveCommentTextValue(this.props.commentText);
    }

    render() {

        return (
            <>

                <h3>Редактирование комментария</h3>
                {
                    <div className={'form'}>
                        {
                            this.props.comment.isCommentEditing ?
                                <p>Комментарий редактируется.....</p>
                                :
                                this.props.comment.commentEditSuccess ?
                                    <p>Комментарий успешно отредактирован</p>
                                    :
                                    this.props.comment.errMsg ?
                                        <p>Произошла ошибка при редактировании комментария {this.props.comment.errMsg}</p>
                                        :
                                        <Form>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Текст комментария</Form.Label>
                                                <Form.Control onChange={event => {
                                                    this.props.actions.saveCommentTextValue(event.target.value);
                                                }}
                                                              type="text"
                                                              placeholder="Введите заголовок комментария"
                                                              defaultValue={this.props.comment.commentText}
                                                />
                                            </Form.Group>

                                            <Button variant="primary"
                                                    onClick={event => {this.props.actions.editComment(this.props.commentId);}} >
                                                Сохранить изменения
                                            </Button>
                                        </Form>

                        }

                    </div>
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
        actions: bindActionCreators(commentActionsCreators, dispatch),
    }
};

const Wrapped = connect(mapStateToProps, mapDispatchToProps)(EditComment);

export default Wrapped;
