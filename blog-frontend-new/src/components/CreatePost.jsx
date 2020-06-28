import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import postActionsCreators from '../actions/posts';

class CreatePost extends React.Component {
    constructor(props) {
        super(props);
    }
  render() {
      return (
          <div className={'content'}>
          <h3>Добавление статьи</h3>
              {

                      this.props.posts.isPostCreating ?
                          <p>Пост добавляется.....</p>
                          :
                          this.props.posts.postCreateSuccess ?
                              <p>Пост успешно добавлен</p>
                              :
                              this.props.posts.errMsg ?
                                  <p>Произошла ошибка при создании поста {this.props.posts.errMsg}</p>
                                  :


                  <div className={'form'}>
                  <Form>
                      <Form.Group controlId="formBasicEmail">
                          <Form.Label>Заголовок статьи</Form.Label>
                          <Form.Control onChange={event => {
                              this.props.actions.savePostTitleInputValue(event.target.value);
                          }} type="text" placeholder="Введите заголовок статьи" />
                      </Form.Group>
                      <Form.Group controlId="formBasicPassword">
                          <Form.Label>Текст статьи</Form.Label>
                          <Form.Control as={"textarea"} row={3} onChange={event => {
                              this.props.actions.savePostTextInputValue(event.target.value);
                          }} type="text" placeholder="Введите текст статьи" />
                      </Form.Group>
                      <Button variant="primary" onClick={event => {this.props.actions.createPost();}} >
                          Создать статью
                      </Button>
                  </Form>
                  </div>

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
    }
};

const Wrapped = connect(mapStateToProps, mapDispatchToProps)(CreatePost);

export default Wrapped;
