import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 5, span: 16 },
};



interface Props {
    count?: number;
    onIncrement?: () => void;
    onDecrement?: () => void;
}


const LoginView = ({ count = 0, onIncrement, onDecrement }: Props) => {

    // 输入格式校验成功
    const onFinish = (values: Object) => {
        console.log(values);
    }

    // 输入格式校验失败
    const onFinishFailed = (errorInfo: Object) => { }

    return (
        <Form
            {...layout}
            name="basic"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="账号名称"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="账号密码"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

export default LoginView;