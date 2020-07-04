import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from "react-redux";
import Card from 'react-bootstrap/Card'
import {getPagePath} from "../helpers";


class Post extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={'content'}>

                <h3>{this.props.title}</h3>

                           <p>{this.props.text}</p>

                        {
                            this.props.user.isLoggedIn ?
                                <Link className={'btnMyBlue floatRight'}
                                      to={'/posts/' + this.props.id + '/addComment'}>
                                    Добавить комментарий
                                </Link>
                                : <a href="/">Чтобы оставить комментарии авторизуйтесь</a>
                        }

            </div>
        )
    }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, null)(Post);
