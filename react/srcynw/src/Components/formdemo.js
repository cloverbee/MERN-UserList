import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
//import "./index.css";
import { Form, Input, Tooltip, Icon, Button } from "antd";

export default class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

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
    //const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 6 },
        sm: { span: 3 }
      },
      wrapperCol: {
        xs: { span: 6 },
        sm: { span: 7 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 2,
          offset: 0
        },
        sm: {
          span: 2,
          offset: 9
        }
      }
    };

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item
          label={
            <span>
              First Name&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("First Name", {
            rules: [
              {
                required: true,
                message: "Please input your First Name!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>

        <Form.Item
          label={
            <span>
              Last Name&nbsp;
              <Tooltip title="What is your last name?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("Last Name", {
            rules: [
              {
                required: true,
                message: "Please input your Last Name!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>

        <Form.Item label={<span>Sex&nbsp;</span>}>
          {getFieldDecorator("Sex", {
            rules: [
              {
                required: true,
                message: "Please input your Sex!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>

        <Form.Item label={<span>Age&nbsp;</span>}>
          {getFieldDecorator("Age", {
            rules: [
              {
                required: true,
                message: "Please input your Age!",
                whitespace: true
              }
            ]
          })(<Input />)}
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

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
/*
const WrappedRegistrationForm = Form.create({ name: "register" })(
  RegistrationForm
);

ReactDOM.render(
  <WrappedRegistrationForm />,
  document.getElementById("container")
);*/
