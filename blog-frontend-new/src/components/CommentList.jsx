import React from 'react';
import { Link } from 'react-router-dom';
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {bindActionCreators} from "redux";
import commentActionsCreators from "../actions/comment";
import {connect} from "react-redux";
import {getPagePath} from "../helpers";

class CommentList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.actions.fetchComments(this.props.postId);
    }

    render() {
        return (
            <div>
                {
                    this.props.comment.comments.length ?
                    <h3>Комментарии к статье</h3>
                    :
                    <h3>Пока нет комментариев к статье</h3>
                }
                {this.props.comment.isCommentsLoading && <span>Загрузка...</span>}
                {
                        this.props.comment.comments.map(comment => {
                            return (
                                <Card key={comment.id} style={{width: '100%'}}>
                                    <Card.Body>
                                        <Row>
                                            <Col md={3}><p>Автор : {comment.authorName}</p></Col>
                                            <Col md={9}>
                                                <Card.Text>
                                                    {comment.text}
                                                </Card.Text>
                                            </Col>
                                        </Row>
                                        <Row>
                                            {
                                                (comment.authorId == this.props.user.userId) || this.props.user.isAdmin ?
                                                    <>
                                                        <Col md={6}>&nbsp;</Col>
                                                        <Col md={3}>
                                                            <Link to={'/posts/' + this.props.postId + '/deleteComment/' + comment.id}>Удалить
                                                                комментарий</Link>
                                                        </Col>
                                                        <Col md={3}>
                                                            <Link to={'/posts/' + this.props.postId + '/editComment/' + comment.id}>Редактировать
                                                                комментарий</Link>
                                                        </Col>
                                                    </>
                                                    : ''
                                            }
                                        </Row>

                                    </Card.Body>
                                </Card>

                            );
                        })
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

const Wrapped = connect(mapStateToProps, mapDispatchToProps)(CommentList);

export default Wrapped;

