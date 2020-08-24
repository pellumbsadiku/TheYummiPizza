import React, { Component } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { inject, observer } from "mobx-react";
import 'bootstrap/dist/css/bootstrap.min.css';


@inject("authStore")
@observer
class Login extends Component {
    render() {
        const { loginLoading, login, setIsLogin } = this.props.authStore;
        const onFinish = ({ email, password }) => {
            login({ email, password });
         
        };
     
        return (
            <Form
                name="normal_login"
                className="login-form"
                onFinish={onFinish}
                style={{textAlign:"center", margin:0, color:"#6a6f8c", 
            font:"600 16px/18px 'Open Sans',sans-serif"}}

                
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Email!"
                        }
                    ]}
                >
                    <Input
                        prefix={
                            <MailOutlined className="site-form-item-icon" />
                        }
                        style={{width:"80%"}}
                        placeholder="Email"
                        type="email"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Password!"
                        }
                    ]}
                >
                    <Input
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        style={{width:"80%"}}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="button"
                        htmlType="submit"
                        className="btn btn-danger btn-rounded mt-0 mb-1 " 
                        loading={loginLoading}
                        style={{marginRight:5}} 
                    >
                        Log in
                    </Button>
                    Or <a onClick={() => setIsLogin(false)}> Register now!</a>
                </Form.Item>
            </Form>
        );
    }
}

export default Login;
