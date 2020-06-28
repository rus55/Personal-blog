import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import userReducer from './user';
import postsReducer from './posts';
import pagesReducer from './routes';
import commentReduser from './comment';
import likeReducer from "./like";

export default function createRootReducer(history) {
    return combineReducers({
        router: connectRouter(history),
        user: userReducer,
        posts: postsReducer,
        pages: pagesReducer,
        comment: commentReduser,
        like: likeReducer
    });
}
