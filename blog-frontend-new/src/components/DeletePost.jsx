import React from 'react';
import Button from 'react-bootstrap/Button'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import postActionsCreators from '../actions/posts';

class DeletePost extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <>
                <h1>Удаление поста</h1>
                {
                    this.props.posts.isPostDeleting ?
                        <p>Пост удаляется.....</p>
                        :
                        this.props.posts.postDeleteSuccess ?
                            <p>Пост успешно удален</p>
                            :
                            this.props.posts.errMsg ?
                                <p>Произошла ошибка при удалении поста {this.props.posts.errMsg}</p>
                                :
                                <>
                                    <p>Вы уверены, что хотите удалить пост?</p>
                                    <Button variant="primary" onClick={event => {this.props.actions.deletePost(this.props.postId);}} >
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
        actions: bindActionCreators(postActionsCreators, dispatch),
    }
};

const Wrapped = connect(mapStateToProps, mapDispatchToProps)(DeletePost);

export default Wrapped;
