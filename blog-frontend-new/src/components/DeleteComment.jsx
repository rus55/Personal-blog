import React from 'react';
import Button from 'react-bootstrap/Button'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import commentActionsCreators from '../actions/comment';

class DeleteComment extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <>
                <h1>Удаление комментария</h1>
                {
                    this.props.comment.isCommentDeleting ?
                        <p>Комментарий удаляется.....</p>
                        :
                        this.props.comment.commentDeleteSuccess ?
                            <p>Комментарий успешно удален</p>
                            :
                            this.props.comment.errMsg ?
                                <p>Произошла ошибка при удалении комментарий {this.props.comment.errMsg}</p>
                                :
                                <>
                                    <p>Вы уверены, что хотите удалить комментарий?</p>
                                    <Button variant="primary"
                                            onClick={event => {this.props.actions.deleteComment(this.props.commentId, this.props.postId);}}
                                    >
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
        actions: bindActionCreators(commentActionsCreators, dispatch),
    }
};

const Wrapped = connect(mapStateToProps, mapDispatchToProps)(DeleteComment);

export default Wrapped;
