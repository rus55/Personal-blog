import React from 'react';
import {Switch, Route, Redirect, Link} from 'react-router-dom';
import PostsList from './PostList';
import CommentList from './CommentList';
import Post from './Post';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions/posts';
import actionsComment from '../actions/comment';
import actionsLike from '../actions/like';
import CreatePost from './CreatePost';
import CreateComment from './CreateComment';
import DeletePost from './DeletePost';
import DeleteComment from './DeleteComment';
import EditPost from './EditPost';
import EditComment from './EditComment';
import {getPagePath} from "../helpers"
import Search from "./Search";

class PostsContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.fetchPosts();
        this.props.actionsComment.fetchCommentCount();
        this.props.actionsLike.fetchLikesCount();
        if (this.props.user.isLoggedIn){
            this.props.actionsLike.fetchLikes();
        }

    }

    render() {
        return (

            <Switch> {console.log('in container',this.props)}
                    <Route
                        path={getPagePath(this.props.pages.pages,'posts')}
                        exact
                        render={() => {
                            return (
                                <div className={'content'}>
                                    <h3>Последние публикации</h3>
                                    {this.props.user.isLoggedIn ?
                                        <Link className={'btnMyBlue floatRight'}
                                              to={getPagePath(this.props.pages.otherPages, 'addPost')}>Добавить новый
                                            пост</Link>
                                        : ''
                                    }
                                    <PostsList postArray={this.props.posts.posts} />
                                </div>
                            )
                        }}
                    />
                <Route
                    path={getPagePath(this.props.pages.otherPages,'search')}
                    exact
                    render={() => {
                        return (
                            <>
                            <div className={'content'}>
                                <h3>Результаты поиска</h3>
                                <Search />
                            </div>
                            </>
                        )
                        }
                    }
                />
                <Route
                    path={getPagePath(this.props.pages.otherPages,'addPost')}
                    exact
                    render={() => {
                        return (
                            <div className={'content'}>
                                <CreatePost  />
                                <Link to={'/'}>На главную</Link>
                            </div>
                        )
                    }}
                />

                <Route
                    path={getPagePath(this.props.pages.otherPages,'postPage')}
                    exact
                    render={(props) => {
                        const id = props.match.params.postId;
                        const selectedPost = this.props.posts.posts.find(post => post.id === id);
                        if (selectedPost) {
                            return (
                                <div className={'content'}>
                                    <Post {...selectedPost} />
                                    <CommentList postId={id}/>
                                </div>
                            );

                        } else {
                            return <Redirect to={'/'}/>;
                        }
                    }
                    }
                />

                <Route
                    path={getPagePath(this.props.pages.otherPages,'deletePost')}
                    exact
                    render={(props) => {
                        const id = props.match.params.postId;

                        return(
                            <div className={'content'}>
                                <DeletePost propsFromPostContainer={true}
                                            postId={id}/>
                                <Link to={'/'}>На главную</Link>
                            </div>
                        );

                    }}
                />

                <Route
                    path={getPagePath(this.props.pages.otherPages,'editPost')}
                    exact
                    render={(props) => {
                        const id = props.match.params.postId;
                        return(
                            <div className={'content'}>
                                <EditPost propsFromPostContainer={true}
                                          postId = {id}
                                          postTile = {this.props.posts.posts.find(post => post.id === id).title}
                                          postText= {this.props.posts.posts.find(post => post.id === id).text}
                                />

                                <Link to={'/'}>На главную</Link>
                             </div>
                        );

                    }}
                />

                <Route
                    path={getPagePath(this.props.pages.otherPages,'addComment')}
                    exact
                    render={(props) => {
                        const id = props.match.params.postId;
                        return(
                            <div className={'content'}>
                                <CreateComment propsFromPostContainer={true}
                                               postId={id}/>

                                <Link to={'/'}>На главную</Link>
                            </div>
                        );

                    }}
                />

                <Route
                    path={getPagePath(this.props.pages.otherPages,'deleteComment')}
                    exact
                    render={(props) => {
                        const id = props.match.params.commentId;
                        const idPost = props.match.params.postId;
                        return(
                            <div className={'content'}>
                                <DeleteComment propsFromPostContainer={true}
                                               commentId={id}
                                               postId={idPost}/>
                                <Link to={'/'}>На главную</Link>
                            </div>
                        );

                    }}
                />
                <Route
                    path={getPagePath(this.props.pages.otherPages,'editComment')}
                    exact
                    render={(props) => {
                        const id = props.match.params.commentId;
                        return(
                            <div className={'content'}>
                                <EditComment propsFromPostContainer={true}
                                             commentId={id}/>

                                <Link to={'/'}>На главную</Link>
                            </div>
                        );

                    }}
                />

                    <Route path={'*'} render={() => {
                        return <Redirect to={'/'} />;
                    }}/>
                </Switch>
        )
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
    actionsComment: bindActionCreators(actionsComment,dispatch),
    actionsLike: bindActionCreators(actionsLike,dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);
