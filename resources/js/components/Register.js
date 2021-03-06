import React, { Component } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { MailOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import { inject, observer } from "mobx-react";

@inject("authStore")
@observer
class Register extends Component {
    render() {
        const { registerLoading, register, setIsLogin } = this.props.authStore;
        const onFinish = ({ name, email, password, password_confirmation }) => {
            register({ name, email, password, password_confirmation });
        };

        const formItemLayout = {
            labelCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 8
                }
            },
            wrapperCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 16
                }
            }
        };

        return (
            <Form
                {...formItemLayout}
                name="normal_login"
                className="form"
                onFinish={onFinish}
                style={{textAlign:"center"}}
            >
                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Name!"
                        }
                    ]}
                   
                >
                    <Input
                     style={{marginLeft:80}}
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Name"
                    />
                </Form.Item>
                <Form.Item
                
                    name="email"
                    style={{align:"center"}}
                    rules={[
                        {
                            type: "email",
                            message: "The input is not valid E-mail!"
                        },
                        {
                            required: true,
                            message: "Please input your E-mail!"
                        }
                    ]} 
                >
                    <Input
                    style={{marginLeft:80}}
                        prefix={
                            <MailOutlined className="site-form-item-icon" />
                        }
                        placeholder="Email"
                    />
                </Form.Item>

                <Form.Item
                
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!"
                        }
                    ]}
                    hasFeedback
                >
                    <Input.Password
                    style={{marginLeft:80}}
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item
                
                    name="password_confirmation"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Please confirm your password!"
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (
                                    !value ||
                                    getFieldValue("password") === value
                                ) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(
                                    "The two passwords that you entered do not match!"
                                );
                            }
                        })
                    ]}
                >
                    <Input.Password
                    style={{marginLeft:80}}
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        placeholder="Confirm Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button

                     style={{marginLeft:150, paddingRight:5, marginRight:5}}
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        loading={registerLoading}
                    >
                        Register
                    </Button>
                    Or <a onClick={() => setIsLogin(true)}>Login</a>
                </Form.Item>
            </Form>
        );
    }
}

export default Register;
