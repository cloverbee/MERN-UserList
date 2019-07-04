import React from 'react';
import Form from "antd/lib/form";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {saveToUserList, getDetail, delUser} from '../../redux/actions';
import "antd/dist/antd.css";
//import "./index.css";
import { Input, Button } from "antd";

//======================================================
class Edit extends React.Component {
  state = {
    confirmDirty: false,
    //autoCompleteResult: []
  };
  
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        var newvalue = {
          age: values.Age,
          firstName: values.FirstName,
          lastName: values.LastName,
          password: values.password,
          sex: values.Sex
        }
        //console.log(newvalue);
        this.props.delOldUser(this.props.userDetail.data._id);
        //console.log('values.user_id',this.props.userDetail.data);///
        this.props.saveCreatedUser(newvalue);
        window.location = '/';//////////////////////////////////////////////////////////////////
      }
    });
    }




  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    //const { autoCompleteResult } = this.props.userDetail;
    
    const formItemLayout = {
      labelCol: {
        xs: { span: 6 },
        sm: { span: 33 }
      },
      wrapperCol: {
        xs: { span: 6 },
        sm: { span: 7 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 0,
          offset: 0
        },
        sm: {
          span: 13,
          offset: 0
        }
      }
    };

    return (
      <div>
      <h2>Edit</h2>
      <Form  {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item 
          label={
            <span >
              First Name&nbsp;
            </span>
            
          }
        >
          { getFieldDecorator("FirstName", {
            rules: [
              {
                
                required: true,
                message: "Please input your First Name!",
                //whitespace: true
                
              }
            ],
            initialValue: this.props.userDetail.data.firstName,
            
          })(<Input placeholder = {this.props.userDetail.data.firstName}  />)}
        </Form.Item>

        <Form.Item
          label={
            <span>
              Last Name&nbsp;
            </span>
          }
        >
          {getFieldDecorator("LastName", {
            rules: [
              {
                required: true,
                message: "Please input your Last Name!",
                whitespace: true
              }
            ],
            initialValue: this.props.userDetail.data.lastName,
          })(<Input placeholder = {this.props.userDetail.data.lastName}/>)}
        </Form.Item>

        <Form.Item label={<span>Sex&nbsp;</span>}>
          {getFieldDecorator("Sex", {
            rules: [
              {
                required: true,
                message: "Please input your Sex!",
                whitespace: true
              }
            ],
            initialValue: this.props.userDetail.data.sex,
          })(<Input placeholder = {this.props.userDetail.data.sex}/>)}
        </Form.Item>

        <Form.Item label={<span>Age&nbsp;</span>}>
          {getFieldDecorator("Age", {
            rules: [
              {
                //required: true,
                message: "Please input your Age!",
                //whitespace: true
              }
            ],
            initialValue: String(this.props.userDetail.data.age),
          })(<Input placeholder = {this.props.userDetail.data.age}/>)}
        </Form.Item>

        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Please input your password!"
              },
              {
                validator: this.validateToNextPassword
              }
            ]
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator("confirm", {
            rules: [
              {
                required: true,
                message: "Please confirm your password!"
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>

        <Form.Item {...tailFormItemLayout} style = {{textAlign: 'right'}}>
           
            <Button  type="primary" htmlType="submit">
              submit
            </Button>
            
        </Form.Item>
        
      </Form>
      <Link to="/" style = {{textAlign: 'right'}}>to home</Link>
      </div>
    );
  }
}
//======================================================


const mapStateToProps = state => {
  return {
    saveuser: state.saveUser,
    userDetail: state.userDetail
  };
};

const mapDispatchToProps = dispatch => {
  return {
      saveCreatedUser: (user, history) => {
          dispatch(saveToUserList(user, history));
      },
      getDetail:(user_id) =>{
        dispatch(getDetail(user_id));
      },
      delOldUser:(user_id) =>{
        dispatch(delUser(user_id));
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)( Form.create({ name: "register" })(Edit));