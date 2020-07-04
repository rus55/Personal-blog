import React from 'react';
import userActionsCreators from '../actions/user';
import postActionsCreators from '../actions/posts';
import actionsComment from '../actions/comment';
import actionsLikes from '../actions/like'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Link, Redirect, Route, Switch} from 'react-router-dom';
import {getPagePath} from "../helpers"
import PostsContainer from "./PostsContainer";
import PostsList from "./PostList";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

// умный компонент
class Content extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.postActionsCreators.fetchPosts();
        this.props.actionsComment.fetchCommentCount();
        this.props.actionsLikes.fetchLikesCount();
        if (this.props.user.isLoggedIn){
            this.props.actionsLikes.fetchLikes();
        }
    }


    render() {
        return (
            <div className={'content'}>
                <h3>Ваш личный блог</h3>
                {
                    this.props.user.isLoggedIn ?
                        <>
                        <div className={'mainPage'}>
                            <Row>
                                <Col md={8}>
                            <h5>Здрвствуйте, {this.props.user.userName} {this.props.user.userSurname}! Вы успешно вошли на сайт</h5>
                            <p>Ваш логин : {this.props.user.userLogin}</p>
                                    <p>О себе : {this.props.user.userAbout}</p>
                                </Col>
                                <Col md={4}>
                                    <Row>
                                        <Button>
                                        <Link
                                            to={getPagePath(this.props.pages.otherPages,'editUser')}
                                        >
                                            Редактировать аккаунт
                                        </Link>
                                        </Button>
                                    </Row>
                                    <Row>
                                        <Button>
                                            <Link
                                                to={getPagePath(this.props.pages.otherPages,'deleteUser')}
                                            >Удалить аккаунт
                                            </Link>
                                        </Button>
                                    </Row>
                                    <Row>
                                        <Button onClick={() => this.props.actions.onLogout()}>Выйти </Button>
                                    </Row>

                                </Col>
                            </Row>

                            <h4>Ваши статьи</h4>

                        </div>
                        <PostsList  postArray={this.props.posts.posts.length ? this.props.posts.posts.filter((post)=>post.authorId == this.props.user.userId) : []}/>
                        </>
                        :
                        <div className={'mainPage'}>
                            <h5>Добро пожаловать на сайт "MyBlog"!</h5>
                            <p>Для добавления, редактирования статей и комментариев необходимо авторизоваться</p>
                            {this.props.user.errMsg ? 'Неверный логин или пароль. Попробуйте еще раз':''}
                            <div className={'form'}>
                                <h4>Форма авторизации</h4>
                                <input
                                    type="text"
                                    placeholder="Ваш логин"
                                    onChange={event => {
                                        this.props.actions.saveUserLoginValue(event.target.value);
                                    }}
                                />
                                <input
                                    type="text"
                                    placeholder="Ваш пароль"
                                    onChange={event => {
                                        this.props.actions.saveUserPasswordValue(event.target.value);
                                    }}
                                />
                                <button onClick={() => this.props.actions.onLogin()}>Войти</button>
                            </div>
                            <p>Если у вас еще нет аккаунта, то <Link to={getPagePath(this.props.pages.otherPages,'addUser')}>Зарегистрируйтесь</Link></p>

                        </div>
                }
                {this.props.children}
            </div>
        )
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
        postActionsCreators: bindActionCreators(postActionsCreators,dispatch),
        actionsLikes: bindActionCreators(actionsLikes,dispatch),
        actionsComment: bindActionCreators(actionsComment,dispatch)
    }
};

const Wrapped = connect(mapStateToProps, mapDispatchToProps)(Content);

export default Wrapped;
