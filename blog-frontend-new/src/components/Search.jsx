import React from 'react';
import PostsList from './PostList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions/posts';
import actionsComment from '../actions/comment';

class PostsContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.search();
        this.props.actionsComment.fetchCommentCount();
    }

    render(){
        return (
            <div className={'content'}>
                {
                    this.props.posts.isPostsSearching ?
                        <p>Поиск.....</p>
                        :
                        this.props.posts.errMsg ?
                            <p>Поиск не дал результатов</p>
                            :
                            <PostsList  postArray={this.props.posts.searchPosts}/>
                }



            </div>
        )
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
    actionsComment: bindActionCreators(actionsComment,dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);
