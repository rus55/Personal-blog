import React from 'react';
import {  Switch, Route, Redirect } from 'react-router-dom';
import UsersList from './UsersList';
import User from './User';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions/user';
import {getPagePath} from "../helpers"

class UsersContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.fetchUsers();
    }

    render() {
        return (
            <Switch>
                    <Route
                        path={getPagePath(this.props.pages.pages,'users')}
                        exact
                        render={() => {
                            return (
                                <div className={'content'}>
                                    <UsersList {...this.props} />
                                </div>
                            )
                        }}
                    />

                    <Route
                        path={getPagePath(this.props.pages.otherPages,'userPage')}
                        exact
                        render={(props) => {
                            const id = props.match.params.userId;
                            const selectedUser = this.props.user.users.find(user => user.id === id);
                            if (selectedUser) {
                                return (
                                    <div className={'content'}>
                                        <User {...selectedUser} />
                                    </div>
                                    );
                            }  else {
                                return (
                                    <Redirect to={'/'} />
                                    );
                            }
                        }
                        }
                    />

                    <Route path={'*'} render={() => {
                        return <Redirect to={'/'} />;
                    }}/>
                </Switch>
        )
    }
}

const mapStateToProps = state => ({ ...state});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);


