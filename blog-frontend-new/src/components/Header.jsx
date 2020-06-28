import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import {connect} from "react-redux";
import {getPagePath} from "../helpers";
import postActionsCreators from '../actions/posts';
import {bindActionCreators} from "redux";


class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const style = {
            cursor: 'pointer',
            textDecoration: 'underline'
        };
        return (
            <Container>
                <Navbar bg="dark" expand="lg">
                    <Navbar.Brand href="/" >MyBlog</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            {

                                this.props.pages.pages.map((page, i) => {
                                    return (
                                        <Link key={i} to={page.path}>{page.name}</Link>
                                    );
                                })
                            }
                        </Nav>
                        <div className={'searchForm'}>
                            <Button variant="outline-success">
                                <Link to={getPagePath(this.props.pages.otherPages,'search')} >Искать</Link>
                            </Button>
                            <Form.Control type="text" placeholder="Поиск по статьям" onChange={event => {
                            this.props.actions.saveSearchInputValue(event.target.value);
                        }} className="mr-sm-2"/>

                        </div>

                    </Navbar.Collapse>
                </Navbar>
            </Container>

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
        actions: bindActionCreators(postActionsCreators, dispatch),
    }
};

const Wrapped = connect(mapStateToProps, mapDispatchToProps)(Header);

export default Wrapped;

