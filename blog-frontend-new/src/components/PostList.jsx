import React from 'react';
import { Link } from 'react-router-dom';
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button"
import {bindActionCreators} from "redux";
import postActionsCreators from "../actions/posts";
import actionsComment from '../actions/comment';
import actionsLikes from '../actions/like';
import {connect} from "react-redux";
import {getPagePath} from "../helpers";

class PostsList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.actions.reset();
        this.props.actionsComment.resetComment();
    }

    componentDidMount() {
        if (this.props.user.isLoggedIn){
            this.props.actionsLikes.fetchLikes();
        }
    }

    render() {
        return (
            <div>

                {this.props.posts.isPostsLoading && <span>Загрузка...</span>}
                {
                        this.props.postArray.map(post => {
                        return (
                            <Card key={post.id} style={{width: '100%'}}>
                                <Card.Body>
                                    <Row>
                                        <Col md={9}>
                                            <Card.Title>
                                                <Link to={'/posts/' + post.id}>
                                                    {post.title}
                                                </Link>
                                            </Card.Title>
                                            <Card.Text>
                                                {post.text.slice(0,200)+'...'}
                                            </Card.Text>
                                            <Row>
                                                <Col md={4}><p>Автор : {post.authorName}</p></Col>
                                                <Col md={4}><p>Комментарии : {this.props.comment.commentsCount[post.id]}</p></Col>
                                                <Col md={4}>
                                                    {
                                                        this.props.user.isLoggedIn && Object.keys(this.props.like.userLikes).length ?
                                                            (
                                                                this.props.like.userLikes[post.id] ?
                                                                    <Button className={'countLikes'}
                                                                            onClick={event => {this.props.actionsLikes.deleteLike(post.id);}}>
                                                                        Не нравится
                                                                    </Button>
                                                                    :
                                                                <Button className={'countLikes'}
                                                                onClick={event => {this.props.actionsLikes.addLike(post.id);}}>
                                                                Нравится
                                                                </Button>
                                                            )
                                                            :
                                                            <span className={'countLikes'}>Нравится :</span>
                                                    }
                                                   <span className={'countLikes'}>{this.props.like.likesCount[post.id]}</span>
                                                </Col>
                                            </Row>

                                        </Col>

                                        <Col md={3}>
                                            {
                                                this.props.user.isLoggedIn ?
                                                <Row>
                                                    <Link className={'btnMyBlue floatRight'}
                                                          to={'/posts/' + post.id + '/addComment'}
                                                    >
                                                        Комментировать
                                                    </Link>
                                                </Row>
                                                : ''
                                            }

                                            {
                                                (post.authorId == this.props.user.userId) || this.props.user.isAdmin ?
                                                <>
                                                    <Row>
                                                        <Link className={'btnMyBlue floatRight'}
                                                              to={'/posts/delete/' + post.id }>Удалить
                                                            статью</Link>
                                                    </Row>
                                                    <Row>
                                                        <Link className={'btnMyBlue floatRight'}
                                                              to={'/posts/edit/' + post.id }>Редактировать
                                                            статью</Link>
                                                    </Row>
                                                </>
                                                : ''
                                            }
                                        </Col>
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
        actions: bindActionCreators(postActionsCreators, dispatch),
        actionsComment: bindActionCreators(actionsComment,dispatch),
        actionsLikes: bindActionCreators(actionsLikes,dispatch),
    }
};

const Wrapped = connect(mapStateToProps, mapDispatchToProps)(PostsList);

export default Wrapped;

