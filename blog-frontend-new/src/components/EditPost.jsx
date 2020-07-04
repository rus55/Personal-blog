import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import postActionsCreators from '../actions/posts';

class EditPost extends React.Component {
    constructor(props) {
        super(props);
    }


   componentWillMount() {
            this.props.actions.savePostTitleInputValue(this.props.postTile);
            this.props.actions.savePostTextInputValue(this.props.postText);
        }

  render() {

      return (
          <>

          <h3>Редактирование статьи</h3>
              {
                    this.props.posts.isPostEditing ?
                    <p>Статья редактируется.....</p>
                    :
                    this.props.posts.postEditSuccess ?
                        <p>Статья успешно отредактирована</p>
                        :
                        this.props.posts.errMsg ?
                            <p>Произошла ошибка при редактировании статьи {this.props.posts.errMsg}</p>
                            :
              <div className={'form'}>
                  <Form>
                      <Form.Group controlId="formBasicEmail">
                          <Form.Label>Заголовок статьи</Form.Label>
                          <Form.Control onChange={event => {
                              this.props.actions.savePostTitleInputValue(event.target.value);
                          }} type="text" placeholder="Введите заголовок статьи" defaultValue={this.props.postTile} />
                      </Form.Group>
                      <Form.Group controlId="formBasicPassword">
                          <Form.Label>Текст статьи</Form.Label>
                          <Form.Control as={"textarea"} row={3} onChange={event => {
                              this.props.actions.savePostTextInputValue(event.target.value);
                          }} type="text" placeholder="Введите текст статьи"  defaultValue={this.props.postText} />
                      </Form.Group>
                      <Button variant="primary" onClick={event => {this.props.actions.editPost(this.props.postId);}} >
                          Сохранить изменения
                      </Button>
                  </Form>
              </div>
          }
      </>

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

const Wrapped = connect(mapStateToProps, mapDispatchToProps)(EditPost);

export default Wrapped;
