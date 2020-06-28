import React from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import UsersContainer from './UsersContainer';
import PostsContainer from './PostsContainer';
import {getPagePath} from "../helpers"
import About from './About';
import NotFound from './NotFound';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container'
import CreateUser from "./CreateUser";
import DeleteUser from "./DeleteUser";
import EditUser from "./EditUser";
import {bindActionCreators} from "redux";
import postActionsCreators from "../actions/user";

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.resetUser();
    }

    render() {
        return (
            <div className={'page'}>
                    <Header
                        isLoggedIn={this.props.user.isLoggedIn}
                        username={this.props.user.userLogin}
                        pages={this.props.pages.pages}
                    />
                    <Container>
                        <Switch>
                            <Route
                                path={getPagePath(this.props.pages.pages,'main')}
                                exact
                                render={() => {
                                return (
                                    <Content propsFromMain={true}/>
                                );
                            }}/>
                            <Route
                                path={getPagePath(this.props.pages.pages,'posts')}
                                component={PostsContainer}
                            />
                            <Route
                                path={getPagePath(this.props.pages.pages,'users')}
                                component={UsersContainer}
                            />
                            <Route
                                path={getPagePath(this.props.pages.pages,'about')}
                                component={About}
                            />
                            <Route
                                path={getPagePath(this.props.pages.otherPages,'addUser')}
                                render={() => {
                                    return (
                                        <CreateUser propsFromPostContainer={true} />
                                    )
                                }}
                            />
                            <Route
                                path={getPagePath(this.props.pages.otherPages,'deleteUser')}
                                exact
                                render={(props) => {
                                    return(
                                        <DeleteUser propsFromPostContainer={true}/>
                                    );
                                }}
                            />
                            <Route
                                path={getPagePath(this.props.pages.otherPages,'editUser')}
                                exact
                                render={(props) => {
                                    return(
                                        <EditUser propsFromPostContainer={true}
                                                  name={this.props.user.activeUser.name}
                                                  surname={this.props.user.activeUser.surname}
                                                  aboutMyself={this.props.user.activeUser.aboutMyself}/>
                                    );
                                }}
                            />
                            <Route
                                path={'*'}
                                component={NotFound}
                            />
                        </Switch>
                    </Container>
                    <Footer />
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
    }
};

const Wrapped = connect(mapStateToProps, mapDispatchToProps)(Main);

export default Wrapped;
